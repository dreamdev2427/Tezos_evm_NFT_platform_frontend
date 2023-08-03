// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.4;

//Un moyen simple d'incrémenter ou de décrémenter ; permet également d'éviter les overflow
import "@openzeppelin/contracts/utils/Counters.sol";

// aide à la gestion des URI des NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Un contrat de contrôle d'accès ; détermine qui a accès à une fonction (admin)
import "@openzeppelin/contracts/access/Ownable.sol";

//Un modifier pour empêcher la réentrance dans les fonctions
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// une des trois interfaces de l'ERC721 ; ajoute la possibilité d'énumérer tous les identifiants des NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// standard pour  récupérer les informations relatives au paiement des royalties pour les NFT
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// import "./IRRoyalty.sol";

contract NFT is Ownable, ReentrancyGuard, ERC721Enumerable, ERC721URIStorage {
  address creator; //createur du NFT

  constructor(
    string memory name_, //exemple :  NFT
    string memory symbol_, // exemple : NO
    address creator_ // 0x....
  ) ERC721(name_, symbol_) {
    creator = creator_;
  }

  using Counters for Counters.Counter;
  Counters.Counter private tokenId_;

  //  Mapping tokenId --> royalty in price
  mapping(uint256 => uint256) royaltyId;

  mapping(uint256 => address) tokenIdToCollection;

  //  Veirify if is creator
  modifier onlyCreator() {
    require(msg.sender == creator, "ONLY CREATOR HAS ACCESS TO THIS FUNCTION");
    _;
  }

  //  Mint a NFT royalty de la collection
  function mint(
    string calldata metaHash,
    uint256 royalty_,
    address collectionAddress
  ) external onlyCreator {
    tokenId_.increment();
    uint256 newtokenId = tokenId_.current();
    _mint(msg.sender, newtokenId);

    // configurer l'URI du jeton, c'est l'endroit où notre image est hebergee (id, uri)
    _setTokenURI(newtokenId, metaHash);
    royaltyId[newtokenId] = royalty_; //
    tokenIdToCollection[newtokenId] = collectionAddress;
  }

  //  Get token royalty by providing Id
  function getTokenRoyalty(uint256 _tokenId) external view returns (uint256) {
    return royaltyId[_tokenId];
  }

  function getCollectionAddress(uint256 _tokenId)
    external
    view
    returns (address)
  {
    return tokenIdToCollection[_tokenId];
  }

  //  Get royalty info
  function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
    external
    view
    returns (address receiver, uint256 royaltyAmount)
  {
    receiver = creator;
    royaltyAmount = (_salePrice * royaltyId[_tokenId]) / 100; //Percentage
  }

  receive() external payable {}

  //  User can withdraw his balance
  function withdraw() external onlyCreator {
    payable(creator).transfer(address(this).balance);
  }

  //  Getter pour obtenir l'addresse du createur de ce NFT
  function getCreator() external view returns (address) {
    return creator;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
    // do stuff before every transfer
    /* Hooks allow you lots of flexibility in modifying the behaviour of a token by allowing you to execute functionality, in the case of the _beforeTokenTransfer hook, 
    you can execute functionality before the token is transferred. */
    // https://docs.openzeppelin.com/contracts/3.x/extending-contracts
  }

  // afin de detruire un nft
  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  // https://eips.ethereum.org/EIPS/eip-165
  // https://ethereum.stackexchange.com/questions/71560/erc721-interface-id-registration
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return
      interfaceId == type(IERC721).interfaceId ||
      interfaceId == type(IERC721Enumerable).interfaceId ||
      interfaceId == type(IERC2981).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
