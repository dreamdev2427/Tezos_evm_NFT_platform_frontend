import { IMetaData, TypeListing } from ".";

export interface INFTCardProps {
  tokenId: string;
  className?: string;
  collectionAddress: string;
  creatorAddress: string;
  isListed: boolean;
  metadata: IMetaData;
}

export interface INFTForSaleCardProps {
  metaData: IMetaData;
  tokenId: number;
  price: number;
  collectionAddress: string;
  creatorAddress: string;
  sellerAddress: string;
  listing: TypeListing;
  marketItemId?: number;
  nbLikes?: number;
}

export interface ICollectionProps {
  imageSrc: string;
  name: string;
  address: string;
  description: string;
  creator: string;
}

export interface INewCollectionProps {
  image: string;
  description?: string;
  name: string;
  nbNFTs: number;
  collectionAddress: string;
  creatorAddress: string;
}

export interface ITopCollectionProps {
  image: string;
  minimumPrice: number;
  name: string;
  index: number;
}
