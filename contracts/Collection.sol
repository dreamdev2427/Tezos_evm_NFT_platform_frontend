// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// A simple way to incremented or decremented; Also helps prevent overflow
import "@openzeppelin/contracts/utils/Counters.sol";
// An access control contract; determines who has access to a function (admin)
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract Collection is Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private collectionId_;

  struct CollectionInfo {
    address contractAddress;
    string metaDataHash;
    address creator;
  }

  //  User Address --> collection id[]
  mapping(address => uint256[]) userAddrToContractIds;
  //  NFT Address --> collection id
  mapping(address => uint256) contractToIndex;
  //  Index --> Collection Info
  mapping(uint256 => CollectionInfo) collectionByIndex;

  event CollectionCreatedEvent(
    address indexed creator,
    address indexed contractAddress,
    string indexed metaData
  );

  //  Create a new collection
  function createCollection(
    string calldata name_,
    string calldata symbol_,
    string calldata metaData
  ) external payable {
    collectionId_.increment();

    NFT NFTContract = new NFT(name_, symbol_, msg.sender);

    CollectionInfo memory Info = CollectionInfo(
      address(NFTContract),
      metaData,
      msg.sender
    );

    userAddrToContractIds[msg.sender].push(collectionId_.current());
    collectionByIndex[collectionId_.current()] = Info;
    contractToIndex[address(NFTContract)] = collectionId_.current();

    emit CollectionCreatedEvent(msg.sender, address(NFTContract), metaData);
  }

  //  Edit metadata for one collection of NFTs
  //   function editMetaData(address contractAddress, string calldata newHash)
  //     external
  //   {
  //     require(contractToIndex[contractAddress] != 0, "CONTRACT DOESN'T EXIST");
  //     CollectionInfo storage Info = collectionByIndex[
  //       contractToIndex[contractAddress]
  //     ];
  //     require(Info.creator == msg.sender, "ONLY CREATOR CAN EDIT METADATA");
  //     Info.metaDataHash = newHash;
  //   }

  //   //  Get user's all collection info
  //   function getUserCollections()
  //     external
  //     view
  //     returns (CollectionInfo[] memory)
  //   {
  //     uint256 length = userAddrToContractIds[msg.sender].length;

  //     CollectionInfo[] memory Info = new CollectionInfo[](length);
  //     for (uint256 i = 0; i < length; i++) {
  //       Info[i] = collectionByIndex[userAddrToContractIds[msg.sender][i]];
  //     }
  //     return Info;
  //   }

  //   /**
  // Get collection info by providing its address
  //  */
  //   function getOneCollectionInfo(address _contractAddress)
  //     external
  //     view
  //     returns (CollectionInfo memory)
  //   {
  //     uint256 length = collectionId_.current();

  //     for (uint256 index = 0; index < length; index++) {
  //       if (collectionByIndex[index + 1].contractAddress == _contractAddress) {
  //         return collectionByIndex[index + 1];
  //       }
  //     }
  //   }

  //   //  Get total number of collection on the marketplace
  //   function totalCollections() external view returns (uint256) {
  //     return collectionId_.current();
  //   }

  //   function getCollectionsPaginated(uint256 startIndex)
  //     external
  //     view
  //     returns (CollectionInfo[] memory, bool)
  //   {
  //     uint256 length = collectionId_.current();

  //     CollectionInfo[] memory Info = new CollectionInfo[](length);

  //     uint256 j = 0;

  //     for (uint256 i = startIndex; i <= length; i++) {
  //       Info[j] = collectionByIndex[i];
  //       j++;
  //     }

  //     return (Info, false);
  //   }
}
