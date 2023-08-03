import React from "react";

interface ISaleRowProps {
  price: number;
  isFinished: boolean;
  nftId: string;
  sellerId: string;
  finalBuyerId?: string;
}

const SaleRow = ({
  price,
  isFinished,
  nftId,
  sellerId,
  finalBuyerId,
}: ISaleRowProps): JSX.Element => {
  return (
    <div className="flex justify-around rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
      <span>{nftId}</span>
      <span>{price}</span>
      <span>{sellerId}</span>
      {finalBuyerId && <span>{finalBuyerId}</span>}
      <span>{isFinished ? "Fini" : "En cours"}</span>
    </div>
  );
};

export default SaleRow;
