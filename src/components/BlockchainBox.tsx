import React from "react";
import { TypeBlockchain } from "../types";

interface IBlockchainBoxProps {
  chosen: boolean;
  blockchain: TypeBlockchain;
  setBlockchain: (blockchain: TypeBlockchain) => void;
  className?: string;
}

const BlockchainBox = ({
  chosen,
  blockchain,
  setBlockchain,
  className,
}: IBlockchainBoxProps): JSX.Element => {
  return (
    <div
      className={`flex justify-around items-center rounded-lg w-36 px-2 py-3 my-1 outline outline-1 outline-zinc-500 cursor-pointer ${
        chosen ? "outline-4 bg-zinc-100" : "outline-1"
      } ${className && className}`}
      onClick={() => setBlockchain(blockchain)}
      aria-hidden={true}
    >
      <img
        className="mx-1"
        src={blockchain === "Avalanche" ? "/avax.png" : "/tezos.png"}
        alt="avax"
        width={20}
        height={20}
      />

      <span className={`${chosen ? "font-bold" : "font-semibold"}`}>
        {blockchain}
      </span>
    </div>
  );
};

export default BlockchainBox;
