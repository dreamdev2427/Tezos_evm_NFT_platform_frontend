import React from "react";
import { RiLayoutGridFill } from "react-icons/ri";
import { INFTData } from "../../types";
import HeadingWithIcon from "../layout/HeadingWithIcon";
import NFTCard from "./NFTCard";

interface INFTSameCollectionProps {
  nfts: INFTData[];
}

const NFTSameCollection = ({ nfts }: INFTSameCollectionProps): JSX.Element => {
  return (
    <div className="my-4 w-full">
      <HeadingWithIcon
        className="my-3"
        headingText="NFTs de la même collection"
        Icon={<RiLayoutGridFill size={28} />}
      />
      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3 place-items-center">
        {nfts.map((nft) => (
          <NFTCard
            collectionAddress="Adresse random"
            isListed={false}
            tokenId={nft.tokenId.toString()}
            key={`${nft.name} ${nft.tokenId}`}
            creatorAddress={
              nft.collection_id.blockchain === "Avalanche"
                ? nft.userId.evmaddress
                : nft.userId.tezosaddress
            }
            metadata={{
              name: nft.name,
              image: nft.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTSameCollection;
