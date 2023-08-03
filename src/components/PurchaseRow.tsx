import React from "react";
import { RiShoppingCartFill, RiAuctionFill } from "react-icons/ri";

interface IPurchaseRowProps {
  nftId: string;
  isAuction: boolean;
  date: Date;
}

const PurchaseRow = ({
  nftId,
  isAuction,
  date,
}: IPurchaseRowProps): JSX.Element => {
  return (
    <div className="flex justify-around rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
      {isAuction ? (
        <RiAuctionFill size={20} />
      ) : (
        <RiShoppingCartFill size={20} />
      )}
      <span>{nftId}</span>
      <span>{isAuction ? "Enchère remportée" : "Achat direct"}</span>
      <span>{date}</span>
    </div>
  );
};

export default PurchaseRow;
