import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import type { TypeListing } from "../../types";

interface IListingTypeBoxProps {
  chosen: boolean;
  listing: TypeListing;
  setTypeListing: (listing: TypeListing) => void;
  className?: string;
}

const ListTypeBox = ({
  chosen,
  listing,
  setTypeListing,
  className,
}: IListingTypeBoxProps): JSX.Element => {
  return (
    <div
      className={`flex justify-around items-center rounded-lg w-48 px-2 py-6 my-1 outline outline-1 outline-zinc-500 cursor-pointer ${
        chosen ? "outline-4 bg-zinc-100" : "outline-1"
      } ${className && className}`}
      onClick={() => setTypeListing(listing)}
      aria-hidden={true}
    >
      {listing === "Auction" ? (
        <RiAuctionFill size={24} />
      ) : (
        <MdSell size={24} />
      )}

      <span className={`${chosen ? "font-bold" : "font-semibold"}`}>
        {listing === "Auction" ? "Enchère" : "Vente directe"}
      </span>
    </div>
  );
};

export default ListTypeBox;
