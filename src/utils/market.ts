import { BigNumberish, Signer, utils } from "ethers";
import { marketAddress } from "../../cache/deploy";
import { Market__factory, NFT__factory } from "../../typechain";
// import type { IBidInfo, INFTListed } from "../types";
import { displayErrorMessage } from "./nft";
import { getSigner, isEmpty } from ".";

/**
 * Buy a NFT
 * @param NFTContractAddress {string}
 * @param itemId {string}
 * @param nftPrice {BigNumerish}
 * @returns
 */
export const buyNFT = async (
  NFTContractAddress: string,
  itemId: BigNumberish,
  nftPrice: BigNumberish
): Promise<void> => {
  const signer = (await getSigner()) as Signer;

  const marketContract = Market__factory.connect(marketAddress, signer);

  console.log("CREATE MARKET SALE :", nftPrice);
  await marketContract
    .createMarketSale(NFTContractAddress, itemId, { value: nftPrice })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};

/**
 * Set or unsets approval for a given operator
 * @param bool {boolean}
 * @param contractAddress {string}
 */

export const setApprovalForAll = async (
  bool: boolean,
  contractAddress: string
): Promise<void> => {
  const signer = (await getSigner()) as Signer;
  const nftContract = NFT__factory.connect(contractAddress, signer);

  await nftContract
    .setApprovalForAll(marketAddress, bool)
    .then(() => {})
    .catch((error) => {
      displayErrorMessage(error);
    });
};

//CREATE

/**
 * Create market item and list to marketplace
 * @param NFTContractAddress {string}
 * @param tokenID {BigNumerish}
 * @param price {BigNumerish}
 */
export const createMarketItem = async (
  NFTContractAddress: string,
  tokenID: string,
  price: string
): Promise<void> => {
  const signer = (await getSigner()) as Signer;

  const etherPrice = utils.parseEther(price).toString();
  console.log("CREATE MARKET ITEM : ", etherPrice);
  const marketContract = Market__factory.connect(marketAddress, signer);

  const transaction = await marketContract.createMarketItem(
    NFTContractAddress,
    tokenID,
    etherPrice
  );
  await transaction.wait();
};

/**
 * Create market item for auction on marketplace
 * @param NFTContractAddress {string}
 * @param tokenId {BigNumerish}
 * @param floorPrice {BigNumerish}
 * @param auctionDays {BigNumerish}
 */
export const createMarketAuction = async (
  NFTContractAddress: string,
  tokenId: string,
  floorPrice: string,
  auctionDays: number
): Promise<void> => {
  const etherPrice = utils.parseEther(floorPrice).toString();

  const signer = (await getSigner()) as Signer;

  const marketContract = Market__factory.connect(marketAddress, signer);
  const transaction = await marketContract.createMarketAuction(
    NFTContractAddress,
    tokenId,
    etherPrice,
    auctionDays
  );
  await transaction.wait();
};

//SALES FOR AUCTION

/**
 * Send a bid to an auction listed on marketplace
 * @param itemId {BigNumerish}
 * @param bidAmount {BigNumber}
 */
export const createAuctionBid = async (
  itemId: string,
  bidAmount: string
): Promise<void> => {
  const signer = (await getSigner()) as Signer;
  const etherPrice = utils.parseEther(bidAmount).toString();

  const marketContract = Market__factory.connect(marketAddress, signer);
  const transaction = await marketContract.createAuctionBid(itemId, {
    value: etherPrice,
  });
  await transaction.wait();
};

/**
 * Auction finished after auction time elapsed
 * @param NFTContractAddress (string)
 * @param itemId {BigNumerish}
 */
export const createAuctionSale = async (
  NFTContractAddress: string,
  itemId: string
): Promise<void> => {
  const signer = (await getSigner()) as Signer;

  const marketContract = Market__factory.connect(marketAddress, signer);
  const transaction = await marketContract.createAuctionSale(
    NFTContractAddress,
    itemId
  );
  await transaction.wait();
};

//FETCH

/**
 * Fetch all listed and unsold NFT on marketplace
 */
// export const fetchMarketItems = async (): Promise<
//   [
//     ([
//       BigNumber,
//       string,
//       BigNumber,
//       string,
//       string,
//       string,
//       BigNumber,
//       BigNumber,
//       boolean,
//       boolean
//     ] & {
//       itemId: BigNumber;
//       nftContract: string;
//       tokenId: BigNumber;
//       creator: string;
//       seller: string;
//       owner: string;
//       price: BigNumber;
//       royalty: BigNumber;
//       isAuction: boolean;
//       sold: boolean;
//     })[],
//     ([BigNumber, string, BigNumber] & {
//       highestBid: BigNumber;
//       highestBidder: string;
//       timeEnding: BigNumber;
//     })[]
//   ]
// > => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);
//   const result = await marketContract.fetchMarketItems();

//   return result;
// };

// /**
//  * Fetch the NFTs purchased by the user
//  */
// export const fetchMyNFTs = async (): Promise<
//   ([
//     BigNumber,
//     string,
//     BigNumber,
//     string,
//     string,
//     string,
//     BigNumber,
//     BigNumber,
//     boolean,
//     boolean
//   ] & {
//     itemId: BigNumber;
//     nftContract: string;
//     tokenId: BigNumber;
//     creator: string;
//     seller: string;
//     owner: string;
//     price: BigNumber;
//     royalty: BigNumber;
//     isAuction: boolean;
//     sold: boolean;
//   })[]
// > => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);
//   const result = await marketContract.fetchMyNFTs();
//   return result;
// };

// /**
//  * Fetch NFT that the user has created and listed on the marketplace
//  */
// export const fetchItemsCreated = async (): Promise<
//   ([
//     BigNumber,
//     string,
//     BigNumber,
//     string,
//     string,
//     string,
//     BigNumber,
//     BigNumber,
//     boolean,
//     boolean
//   ] & {
//     itemId: BigNumber;
//     nftContract: string;
//     tokenId: BigNumber;
//     creator: string;
//     seller: string;
//     owner: string;
//     price: BigNumber;
//     royalty: BigNumber;
//     isAuction: boolean;
//     sold: boolean;
//   })[]
// > => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);
//   const result = await marketContract.fetchItemsCreated();
//   return result;
// };

// /**
//  * Fetch listed NFT of one collection
//  * @param contractAddress (string)
//  */
// export const fetchCollectionItems = async (
//   contractAddress: string
// ): Promise<
//   [
//     ([
//       BigNumber,
//       string,
//       BigNumber,
//       string,
//       string,
//       string,
//       BigNumber,
//       BigNumber,
//       boolean,
//       boolean
//     ] & {
//       itemId: BigNumber;
//       nftContract: string;
//       tokenId: BigNumber;
//       creator: string;
//       seller: string;
//       owner: string;
//       price: BigNumber;
//       royalty: BigNumber;
//       isAuction: boolean;
//       sold: boolean;
//     })[],
//     ([BigNumber, string, BigNumber] & {
//       highestBid: BigNumber;
//       highestBidder: string;
//       timeEnding: BigNumber;
//     })[]
//   ]
// > => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);
//   const result = await marketContract.fetchCollectionItems(contractAddress);
//   return result;
// };

/**
 * Fetch all connected user's bids
 */
// export const fetchUserBids = async (): Promise<IBidInfo[]> => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);
//   const result = await marketContract.fetchUserBids();

//   const bids = [];
//   for (const bid of result[1]) {
//     const bidInfo: IBidInfo = {
//       highestBid: parseFloat(utils.formatEther(bid.highestBid)) * 10 ** 18,
//       timeEnding: parseFloat(utils.formatEther(bid.timeEnding)) * 10 ** 18,
//       highestBidder: bid.highestBidder,
//     };
//     bids.push(bidInfo);
//   }

//   return bids;
// };

// UNLIST

/**
 * Unlist item on marketplace
 * @param itemId {BigNumerish}
 */
export const unlistItem = async (itemId: string): Promise<void> => {
  const signer = (await getSigner()) as Signer;

  const marketContract = Market__factory.connect(marketAddress, signer);

  const tx = await (marketContract as any).unlistItem(itemId);
  await tx.wait();
  alert("Item unlisté !");
};

/**
 * Check if a NFT is listed on marketplace
 */
export const checkItemListed = async (tokenId: string): Promise<boolean> => {
  const signer = (await getSigner()) as Signer;

  const marketContract = Market__factory.connect(marketAddress, signer);

  const isListed = await (marketContract as any).checkItemListed(tokenId);

  return isListed;
};

/**
 * Fetch data for one market item
 */
// export const fetchOneMarketItem = async (
//   tokenId: string
// ): Promise<INFTListed> => {
//   const signer = (await getSigner()) as Signer;

//   const marketContract = Market__factory.connect(marketAddress, signer);

//   const marketItem = await marketContract.fetchOneMarketItem(tokenId);

//   const formattedItem = {
//     itemId: parseFloat(utils.formatEther(marketItem.itemId)) * 10 ** 18,
//     creator: marketItem.creator,
//     owner: marketItem.owner,
//     isAuction: marketItem.isAuction,
//     nftContract: marketItem.nftContract,
//     price: parseFloat(utils.formatEther(marketItem.price)),
//     royalty: parseFloat(utils.formatEther(marketItem.royalty)),
//     seller: marketItem.seller,
//     tokenId: parseFloat(utils.formatEther(marketItem.tokenId)) * 10 ** 18,
//     isSold: marketItem.sold,
//   };

//   return formattedItem;
// };
