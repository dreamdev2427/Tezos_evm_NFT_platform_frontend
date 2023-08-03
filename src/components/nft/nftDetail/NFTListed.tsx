import React from "react";
import { INFTData } from "../../../types";
import { BLOCK_EXPLORER_LINK, ellipseAddress } from "../../../utils";
import NFTListedAuction from "./NFTListedAuction";
import NFTListedSale from "./NFTListedSale";

interface INFTListedProps {
  nft: INFTData;
  collectionAddress: string;
  bigNumberPrice: string;
}

const NFTListed = ({
  nft,
  collectionAddress,
  bigNumberPrice,
}: INFTListedProps): JSX.Element => {
  return (
    <>
      <div className="flex justify-between items-center  w-full">
        <div className="flex flex-col">
          <span className="text-gray-500 self-start">Vendeur</span>
          <a
            className="underline text-lg text-zinc-600"
            href={`${BLOCK_EXPLORER_LINK}${nft.ownerAddress}`}
          >
            {nft.ownerAddress && ellipseAddress(nft.ownerAddress, 10)}
          </a>
        </div>
        <div className="flex flex-col ml-5">
          <span className="text-gray-500 self-end">Type de vente</span>
          <span className="text-sm lg:text-xl">
            {nft.listing === "Auction" ? "Enchère" : "Vente directe"}
          </span>
        </div>
      </div>

      {nft.listing === "Auction" ? (
        <NFTListedAuction
          collectionAddress={nft.collectionAddress}
          tokenId={nft.tokenId}
          floorPrice={nft.price ?? 0}
          nft={nft}
          owner={nft.ownerAddress}
        />
      ) : (
        <NFTListedSale
          bigNumberPrice={bigNumberPrice}
          collectionAddress={collectionAddress}
          nft={nft}
        />
      )}
    </>
  );
};

export default NFTListed;
