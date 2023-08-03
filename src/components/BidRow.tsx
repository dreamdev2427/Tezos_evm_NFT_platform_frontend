import React from "react";
import { ellipseAddress } from "../utils";

interface IBidRowProps {
  bid: number;
  bidder: string;
  nftId: string;
  date: Date;
}

const BidRow = ({ bid, bidder, nftId, date }: IBidRowProps): JSX.Element => {
  return (
    <div className="flex justify-around rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
      <span>{ellipseAddress(nftId, 10)}</span>
      <span>{ellipseAddress(bidder, 10)}</span>
      <span>{bid} AVAX</span>
      <span>{date}</span>
    </div>
  );
};

export default BidRow;
