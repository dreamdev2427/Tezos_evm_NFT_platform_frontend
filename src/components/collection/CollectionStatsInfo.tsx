import React from "react";
import BlockchainIcon from "../BlockchainIcon";

const CollectionStatsInfo = (): JSX.Element => {
  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold text-zinc-900">10K</span>
        <span className="text-lg text-zinc-500">NFTs</span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold text-zinc-900">5.2K</span>
        <span className="text-lg text-zinc-500">Détenteurs</span>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-zinc-900">13</span>
          <BlockchainIcon />
        </div>
        <span className="text-lg text-zinc-500">Prix plancher</span>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-zinc-900">140K</span>
          <BlockchainIcon />
        </div>
        <span className="text-lg text-zinc-500">Volume total</span>
      </div>
    </div>
  );
};

export default CollectionStatsInfo;
