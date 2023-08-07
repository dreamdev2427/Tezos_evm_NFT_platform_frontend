import React, { useEffect, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { INFTData } from "../../../types";
import { BLOCK_EXPLORER_LINK, ellipseAddress } from "../../../utils";

interface INFTInfoDetailProps {
  nft: INFTData;
}

const NFTInfoDetail = ({ nft }: INFTInfoDetailProps): JSX.Element => {
  const [ownerAddress, setOwnerAddress] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");

  useEffect(() => {
    setOwnerAddress(
      nft.collection_id.blockchain === "Avalanche"
        ? nft.owner.evmaddress
        : nft.owner.tezosaddress
    );
    setCreatorAddress(
      nft.collection_id.blockchain === "Avalanche"
        ? nft.userId.evmaddress
        : nft.userId.tezosaddress
    );
  }, [nft]);

  return (
    <div>
      <h2 className="text-3xl font-bold font-serif mb-5">
        {nft.name} <span className="text-gray-600">#{nft.tokenId}</span>
      </h2>

      <div className="flex flex-col">
        <div className="flex items-center">
          <BsTextLeft size={20} className="mr-2 text-gray-500" />
          <span className="text-gray-500">Description</span>
        </div>
        <span className="text-sm lg:text-xl">{nft.description}</span>
      </div>

      <br />

      <div className="flex flex-col">
        <div className="flex items-center">
          <AiTwotoneCalendar size={20} className="mr-2 text-gray-500" />
          <span className="text-gray-500">Listé le</span>
        </div>
        <span className="text-sm lg:text-xl">07/07/2022</span>

        <br />

        {ownerAddress && (
          <>
            {" "}
            <span className="text-gray-500">Détenteur</span>
            <a
              className="underline text-lg text-zinc-600"
              href={`${BLOCK_EXPLORER_LINK}${ownerAddress}`}
            >
              {ownerAddress && ellipseAddress(ownerAddress, 10)}
            </a>
          </>
        )}

        {creatorAddress && (
          <>
            {" "}
            <span className="text-gray-500">Créateur</span>
            <a
              className="underline text-lg text-zinc-600"
              href={`${BLOCK_EXPLORER_LINK}${creatorAddress}`}
            >
              {creatorAddress && ellipseAddress(creatorAddress, 10)}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NFTInfoDetail;
