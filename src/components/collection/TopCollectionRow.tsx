import { ITopCollectionProps } from "../../types";
import BlockchainIcon from "../BlockchainIcon";

const TopCollectionRow = ({
  image,
  index,
  minimumPrice,
  name,
}: ITopCollectionProps): JSX.Element => {
  return (
    <div className="flex flex-col hover:ease-in-out hover:scale-105 duration-300 cursor-pointer hover:shadow-lg">
      <div className="flex items-center m-2">
        <span className=" text-xl font-bold mx-2">{index}</span>

        <div className="flex">
          <img
            src={image}
            alt={`${image} ${name}`}
            className="object-cover w-24 h-24 rounded-lg mx-2"
          />
          <div className="flex flex-col h-full">
            <span className="text-xl font-bold">{name.substring(0, 15)}</span>
            <div className="flex ">
              <span className="text-zinc-500">Prix plancher : </span>
              <span className="text-zinc-800 font-bold"> {minimumPrice}</span>
              <BlockchainIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default TopCollectionRow;
