//  COLLECTION TYPES
export interface ICollectionSC {
  0: string;
  1: string;
  2: string;
  contractAddress: string;
  metaDataHash: string;
  creator: string;
}

export enum CollectionCategory {
  POP = "pop",
  STREET = "street",
  CONTEMPORAINE = "contemporaine",
  ABSTRAIT = "abstrait",
}
export interface ICollection {
  contractAddress: string;
  creatorAddress: string;
  description: string;
  image: string;
  name: string;
  royalties: number;
  blockchain: TypeBlockchain;
  symbol: string;
  category?: CollectionCategory;
  nbNfts: number;
}

//  NFT TYPES
export interface INFTData {
  ownerAddress: string;
  collectionAddress: string;
  tokenId: number;
  metaData: IMetaData;
  creatorAddress: string;
  listing?: TypeListing; // undefined --> not listed Auction --> auction Sale --> sale
  price?: number; // need price to display on front nft card
  nbLikes?: number;
  isApproved?: boolean;
}

export interface INFTListed {
  // marketItemId?: number;
  creatorAddress: string;
  sellerAddress: string;
  listing: TypeListing;
  collectionContract: string;
  price: number;
  tokenId: number;
  metaData: IMetaData;
  nbLikes?: number;
}

//  MARKET TYPES
export interface IMarketItem {
  nft: INFTListed;
  auction: IBidInfo;
}

export interface IMetaData {
  description?: string;
  name?: string;
  image: string;
}

export interface IBidInfo {
  bid: number;
  bidder: string;
  nftId: string;
  date: Date;
}

export interface ITopCollection {
  image: string;
  minimumPrice: number;
  name: string;
}

export interface IUserInfo {
  email: string;
  id: string;
  blockchainAddress?: string;
}

export interface IUserPurchaseInfo {
  date: Date;
  nftId: string;
  isAuction: boolean;
}

export interface IUserSaleInfo {
  price: number;
  isFinished: boolean;
  nftId: string;
  sellerId: string;
  finalBuyerId?: string;
}

export type TypeBlockchain = "Avalanche" | "Tezos";

export type TypeListing = "Auction" | "Sale";

export * from "./props";
