import React from "react";
import { useRouter } from "next/router";
import { FaInstagram, FaTwitter, FaShareAlt } from "react-icons/fa";
import type { ICollection } from "../../types";
import { BLOCK_EXPLORER_LINK } from "../../utils";

interface ICollectionInfoRowwProps {
  collectionInfo: ICollection;
}
const CollectionInfoRow = ({
  collectionInfo,
}: ICollectionInfoRowwProps): JSX.Element => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start mt-10 lg:mt-16 p-3">
      {/**  COLLECTION INFOS */}
      <div className="flex flex-col">
        <h2
          className="mb-2 text-indigo-800"
          onClick={async () =>
            navigate.push(
              `${BLOCK_EXPLORER_LINK}/${collectionInfo.collectionAddress}`
            )
          }
          aria-hidden={true}
        >
          {collectionInfo?.name.toUpperCase() || "Nom collection"}
        </h2>

        <span className="text-xl text-zinc-800 my-2">
          Créée par{" "}
          <span className="font-semibold">
            <a
              href={`${BLOCK_EXPLORER_LINK}${
                collectionInfo.blockchain === "Avalanche"
                  ? collectionInfo?.userId?.evmaddress
                  : collectionInfo?.userId?.tezosaddress
              }`}
            >
              {collectionInfo?.userId?.name}
            </a>
          </span>
        </span>
        <span className="text-lg text-zinc-700">
          <span className="font-semibold">{collectionInfo.description}</span>
        </span>

        <span className="text-zinc-600 text-3xl">
          {collectionInfo.royalties} %{" "}
          <span className="text-sm">royalties</span>
        </span>
      </div>

      {/**  SOCIAL BUTTONS */}
      <div className="flex items-center justify-around my-2 lg:m-0">
        <FaShareAlt className="mx-3 text-zinc-700 cursor-pointer" size={22} />
        <FaInstagram className="mx-3 text-zinc-700 cursor-pointer" size={24} />
        <FaTwitter className="mx-3 text-zinc-700 cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default CollectionInfoRow;
