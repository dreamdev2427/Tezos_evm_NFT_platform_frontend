import { useRouter } from "next/router";
import { INewCollectionProps } from "../../types";

const NewCollection = ({
  image,
  name,
  description,
  nbNFTs,
  collectionAddress,
  creatorAddress,
}: INewCollectionProps): JSX.Element => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center self-center w-96 h-auto whitespace-nowrap	text-ellipsis	 rounded-md p-2 shadow-sm relative z-0 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0,0,0, 0.1)),url('${image}')`,
      }}
      aria-hidden={true}
      onClick={async () =>
        router.push(`/nft/${collectionAddress}/${creatorAddress}`)
      }
    >
      <div className="absolute h-full w-full bg-black bg-opacity-60 blur-xl z-40"></div>
      <span className="text-3xl font-bold text-white z-50 mx-4 text-center">
        {name}
      </span>
      <img
        src={image}
        alt={`${name} ${image}`}
        className="rounded-xl p-6 z-50 w-64 h-80 2xl:w-72 2xl:h-96 object-fit"
      />
      <span className="z-50">{description ?? description}</span>

      <span className="text-white m-4 z-50 outline outline-1 rounded-full px-3 py-1 self-end">
        {nbNFTs} NFTs
      </span>
    </div>
  );
};

export default NewCollection;
