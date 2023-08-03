import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import type { INFTForSaleCardProps } from "../../types";
import { ellipseAddress } from "../../utils";

{
  /** NFT listed on marketplace for sale, wheter on auction or not */
}

const NFTForSaleCard = ({
  collectionAddress,
  price,
  tokenId,
  creatorAddress,
  listing,
  marketItemId,
  metaData,
  sellerAddress,
  nbLikes,
}: INFTForSaleCardProps): JSX.Element => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center shadow-xl rounded-lg cursor-pointer transition ease-in-out hover:scale-105 duration-300 m-2 p-2">
      <img
        src={metaData.image}
        alt="nft"
        className="rounded-t-lg h-96 w-96 object-cover"
      />
      <div className="flex flex-col items-start w-full">
        <div className="flex self-center font-semibold">
          <span className="text-xl text-zinc-900">
            {metaData.name}{" "}
            <span className="text-xl text-gray-600"> #{tokenId}</span>
          </span>
        </div>
        <div className="flex items-center font-semibold my-2">
          <span className="mr-2"> Type de vente:</span>
          <span className="font-normal">
            {listing === "Auction" ? "Enchère" : "Achat immédiat"}
          </span>
        </div>

        <div className="flex justify-between w-full my-2">
          <span>Vendeur : {ellipseAddress(sellerAddress, 5)}</span>

          <div className="flex text-lg items-center font-semibold my-1">
            <span className="mr-2">{price}</span>
            <img src="/avax.png" alt="avax" width={20} height={20} />
          </div>
        </div>
      </div>
      {/** INFO FOOTER */}
      <div className="flex items-center justify-end w-full mx-2">
        <span>{nbLikes ?? 0}</span>
        <AiOutlineHeart className="mx-1 hover:text-red-400" size={20} />
      </div>
      <div className="w-11/12 border-t border-gray-300 my-2" />{" "}
      {/** ----------------------- AUCTION --------------------- */}
      <div className="flex justify-center">
        {/** ----------------------- DIRECT BUY --------------------- */}

        <button
          onClick={() =>
            router.push({
              pathname: `/nft/${collectionAddress}/${creatorAddress}/${tokenId}`,
              query: {
                price: price,
                bigNumberPrice: price,
                itemId: marketItemId,
                tokenId: tokenId,
              },
              path: `/nft/${collectionAddress}/${creatorAddress}/${tokenId}`,
            })
          }
          className="btn-primary my-2"
        >
          Acheter
        </button>
      </div>
    </div>
  );
};
export default NFTForSaleCard;
