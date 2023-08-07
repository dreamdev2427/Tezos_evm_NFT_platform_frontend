// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // https://medium.com/coinmonks/protect-your-solidity-smart-contracts-from-reentrancy-attacks-9972c3af7c21
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "hardhat/console.sol";

contract Market is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  // Ceci permet d'obtenir les propriétés disponibles pour un type de contrat, par exemple (IERC721).
  bytes4 public constant ERC721INTERFACE = type(IERC721).interfaceId;

  // pour verifier si conforme a la norme EIP-2981( NFTs royalty )
  bytes4 public constant ERC2981INTERFACE = type(IERC2981).interfaceId;

  // structures pour les item dans le marketplace
  struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable creator;
    address payable seller;
    address payable owner;
    uint256 price;
    uint256 royalty;
    bool isAuction;
    bool sold;
  }

  // structure pour enchere
  struct AuctionInfo {
    uint256 highestBid;
    address highestBidder;
    uint256 timeEnding;
  }

  // mapping des struct
  /* Enfin, pour que chaque MarketItem soit associé à un id, il faut créer un mapping
    qui associera la structure MarketItem a un entier (uint 256 = entier positif 256 bits) */
  // le meme raisonnement pour les encheres (Auction)
  mapping(uint256 => MarketItem) private idToMarketItem;
  mapping(uint256 => AuctionInfo) private auctionData;

  // address[] public allSellers;
  // address[] public allCreators;
  // uint256 public totalEarnings;

  // Les paramètres "indexed" pour les event permettent de rechercher
  // ces événements en utilisant les paramètres indexés comme filtres.

  event MarketItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price
  );

  event MarketAuctionItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price
  );

  event MarketItemSold(
    uint256 itemId,
    address indexed nftContract,
    address indexed seller,
    address indexed newOwner
  );

  event MarketItemUnlisted(uint256 itemId);

  event MarketItemBid(
    uint256 indexed itemId,
    address indexed bidder,
    uint256 amount
  );

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(
      ERC165Checker.supportsInterface(nftContract, ERC721INTERFACE),
      "ERC721 CONTRACT IS REQUIRED"
    );
    require(
      IERC721(nftContract).ownerOf(tokenId) == msg.sender,
      "MSG.SENDER MUST BE THE OWNER OF ITEM"
    );
    require(price > 0, "PRICE CANNOT BE ZERO");

    require(
      IERC721(nftContract).isApprovedForAll(
        IERC721(nftContract).ownerOf(tokenId),
        address(this)
      ),
      "ERC721: approve caller is not token owner nor approved for all"
    );

    // Increase item count
    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    //  If royalty
    if (ERC165Checker.supportsInterface(nftContract, ERC2981INTERFACE)) {
      (address creator, uint256 royaltyAmount) = IERC2981(nftContract)
        .royaltyInfo(tokenId, price); //From NFT Contract

      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(creator),
        payable(msg.sender),
        payable(address(0)),
        price,
        royaltyAmount,
        false,
        false
      );
    } else {
      //  Classic item market no royalty
      address creator = msg.sender;
      uint256 royaltyAmount = 0;
      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(creator),
        payable(msg.sender),
        payable(address(0)),
        price,
        royaltyAmount,
        false,
        false
      );
    }

    // IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    // allCreators.push(msg.sender);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price
    );
  }

  // lancer une enchères au lieu d'un article à prix fixe.
  // Creer une enchère, vérifier les royalties, transférer l'article, entrer les données de l'enchère.
  function createMarketAuction(
    address nftContract,
    uint256 tokenId,
    uint256 floorPrice,
    uint256 auctionTime
  ) external payable nonReentrant {
    require(floorPrice > 0, "PRICE CANNOT BE ZERO");

    require(auctionTime > 0, "INVALID AUCTION TIME");

    require(
      ERC165Checker.supportsInterface(nftContract, ERC721INTERFACE),
      "CONTRACT NEED TO BE ERC721"
    );

    require(
      IERC721(nftContract).ownerOf(tokenId) == msg.sender,
      "NOT THE OWNER"
    );

    require(
      IERC721(nftContract).isApprovedForAll(
        IERC721(nftContract).ownerOf(tokenId),
        address(this)
      ),
      "ERC721: approve caller is not token owner nor approved for all"
    );

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    if (ERC165Checker.supportsInterface(nftContract, ERC2981INTERFACE)) {
      (address creator, uint256 royaltyAmount) = IERC2981(nftContract)
        .royaltyInfo(tokenId, floorPrice);
      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(creator),
        payable(msg.sender),
        payable(address(0)),
        floorPrice,
        royaltyAmount,
        true,
        false
      );
    } else {
      address creator = msg.sender;
      uint256 royaltyAmount = 0;
      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(creator),
        payable(msg.sender),
        payable(address(0)),
        floorPrice,
        royaltyAmount,
        true,
        false
      );
    }

    // IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    auctionData[itemId] = AuctionInfo(
      0,
      address(0),
      // (block.timestamp + auctionTime * 1 hours) block.timestamp unix epoch since 1970
      auctionTime
    );

    // allCreators.push(msg.sender);

    emit MarketAuctionItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      floorPrice
    );
  }

  function createAuctionBid(uint256 itemId) external payable nonReentrant {
    MarketItem storage currentItem = idToMarketItem[itemId];
    AuctionInfo storage currentInfo = auctionData[itemId];

    require(!currentItem.sold, "ITEM HAS ALREADY BEEN SOLD");

    require(currentItem.isAuction, "NOT FOR AUCTION!");

    require(currentInfo.timeEnding > block.timestamp, "AUCTION HAS ENDED!");

    require(msg.value > currentItem.price, "BELOW THE MINIMUM PRICE");

    require(msg.value > currentInfo.highestBid, "LOWER THAN THE HIGHEST BID");

    payable(currentInfo.highestBidder).transfer(currentInfo.highestBid);

    currentInfo.highestBidder = msg.sender;
    currentInfo.highestBid = msg.value;

    emit MarketItemBid(itemId, msg.sender, msg.value);
  }

  function createAuctionSale(
    address nftContract,
    uint256 itemId
  ) external payable nonReentrant {
    MarketItem storage currentItem = idToMarketItem[itemId];
    AuctionInfo storage currentInfo = auctionData[itemId];

    require(!currentItem.sold, "ITEM HAS ALREADY BEEN SOLD");

    require(currentItem.isAuction, "ITEM IS NOT FOR AUCTION");

    require(
      currentInfo.timeEnding < block.timestamp,
      "AUCTION HAS NOT YET ENDED"
    );

    //Royalties
    if (currentItem.creator == currentItem.seller) {
      payable(currentItem.nftContract).transfer(currentInfo.highestBid);
    } else {
      payable(currentItem.seller).transfer(currentItem.royalty);
      currentItem.seller.transfer(
        (currentInfo.highestBid * (currentItem.royalty)) / 100
      );
    }

    // TODO: NOT WORKING TRANSFER
    //If has bid
    if (currentInfo.highestBid != 0) {
      //Transfer NFT
      IERC721(nftContract).transferFrom(
        payable(currentItem.seller),
        payable(currentInfo.highestBidder),
        currentItem.tokenId
      );

      //Transfer Amount
      payable(address(currentItem.owner)).transfer(currentInfo.highestBid);

      currentItem.owner = payable(currentInfo.highestBidder);
    }

    currentItem.sold = true;
  }

  function createMarketSale(
    address nftContract,
    uint256 itemId
  ) public payable nonReentrant {
    MarketItem storage currentItem = idToMarketItem[itemId];
    // msg.value = currentItem.price;

    require(!currentItem.isAuction, "THIS ITEM IS ON AUCTION");

    require(msg.value == currentItem.price, "NOT SAME PRICE WITH LISTED");

    require(!currentItem.sold, "ITEM ALREADY SOLD");

    if (currentItem.creator == currentItem.seller) {
      payable(currentItem.seller).transfer(msg.value);
    } else {
      payable(currentItem.seller).transfer(currentItem.royalty);
      currentItem.seller.transfer((msg.value * (currentItem.royalty)) / 100);
    }

    IERC721(nftContract).transferFrom(
      payable(currentItem.seller),
      msg.sender,
      currentItem.tokenId
    );

    currentItem.owner = payable(msg.sender);
    currentItem.sold = true;
    _itemsSold.increment();
  }

  function getMarketItem() public view returns (MarketItem memory) {
    return idToMarketItem[0];
  }
}
