import React from "react";
import { useRouter } from "next/router";
import type { ICollectionProps } from "../../types";

const CollectionCard = ({
  imageSrc,
  name,
  description,
  address,
  creator,
}: ICollectionProps): JSX.Element => {
  const router = useRouter();

  return (
    <div
      aria-hidden="true"
      className="flex flex-col bg-zinc-800 text-white rounded-md shadow-lg cursor-pointer transition ease-in-out hover:scale-105 duration-300"
      onClick={async () => router.push(`/nft/${address}/${creator}`)}
    >
      <img className="w-80 h-80 p-4" src={imageSrc} alt={name} />
      <div className="flex flex-col items-center p-3">
        <span className="font-semibold text-center text-xl m-2">
          {name.toUpperCase()}
        </span>
        <div className="p-3">
          <p className="text-ellipsis whitespace-nowrap	">{description}</p>
        </div>
        <button className="p-2 my-5 outline outline-1 outline-white rounded-md w-fit">
          Découvrir
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
