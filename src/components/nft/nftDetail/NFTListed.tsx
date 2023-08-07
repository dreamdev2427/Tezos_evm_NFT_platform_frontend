import React, { useEffect, useState } from "react";
import { INFTData } from "../../../types";
import {
  BLOCK_EXPLORER_LINK,
  TEZOS_EXPLORER_LINK,
  ellipseAddress,
} from "../../../utils";
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
  const [blockExplorer, setBlockExplorer] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");

  useEffect(() => {
    if (nft) {
      if (nft?.collection_id?.blockchain === "Avalanche") {
        setOwnerAddress(nft?.owner?.evmaddress);
        setBlockExplorer(BLOCK_EXPLORER_LINK);
      } else {
        setOwnerAddress(nft?.owner?.tezosaddress);
        setBlockExplorer(TEZOS_EXPLORER_LINK);
      }
    }
  }, [nft]);

  return (
    <>
      <div className="flex justify-between items-center  w-full">
        <div className="flex flex-col">
          <span className="text-gray-500 self-start">Vendeur</span>
          <a
            className="underline text-lg text-zinc-600"
            href={`${blockExplorer}${ownerAddress}`}
          >
            {ownerAddress && ellipseAddress(ownerAddress, 10)}
          </a>
        </div>
        <div className="flex flex-col ml-5">
          <span className="text-gray-500 self-end">Type de vente</span>
          <span className="text-sm lg:text-xl">
            {nft.listing === "Auction" ? "Enchère" : "Vente directe"}
          </span>
        </div>
      </div>

      {nft.isSale === 2 ? (
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
