import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import type { INFTCardProps } from "../../types";

const NFTCard = ({
  tokenId,
  className,
  isListed,
  collectionAddress,
  creatorAddress,
  metadata,
  price,
}: INFTCardProps): JSX.Element => {
  const router = useRouter();

  return (
    <div
      aria-hidden={true}
      className={`flex flex-col shadow-xl rounded-lg mx-1 my-2 cursor-pointer transition ease-in-out hover:scale-105 duration-300 ${className?.toString()}`}
      onClick={async () =>
        router.push({
          pathname: `/nft/${collectionAddress}/${creatorAddress}/${tokenId}`,
        })
      }
    >
      <img
        className="h-96 w-96 object-cover rounded-t-lg"
        src={metadata.image}
        alt={metadata.name}
      />

      {/** INFO HEADER */}

      <span className="font-semibold text-xl my-4 px-3">
        <span className="text-zinc-700">{metadata.name?.toUpperCase()}</span> #
        {tokenId}
      </span>

      {/** INFO BODY */}
      <div className="px-3">
        <div className="flex justify-between">
          <div className="flex items-center font-semibold">
            <img src="/avax.png" alt="avax" width={20} height={20} />
          </div>
        </div>
      </div>

      <hr className="text-gray-200 my-3 mx-4" />

      {/** INFO FOOTER */}
      <div className="flex justify-between items-center px-3 my-2">
        <span className="font-semibold text-xl m-1">
          {isListed ? "Listé" : "Non listé"}
        </span>
        <div className="flex items-center">
          <span>{price}</span>
          <AiOutlineHeart className="mx-1 hover:text-red-400" size={20} />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
