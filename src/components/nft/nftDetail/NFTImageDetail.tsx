import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../config/redux/userAccount";
import axios from "../../../config/axios";
import BlockchainIcon from "../../BlockchainIcon";
import LoadingText from "../../LoadingText";
import Loading from "../../Loading";

interface INFTImageDetailProps {
  image: string;
  nbLikes: number;
  collectionAddress: string;
  tokenId: string;
  setNbLikes: (value: number) => void;
}

const NFTImageDetail = ({
  image,
  nbLikes,
  collectionAddress,
  tokenId,
  setNbLikes,
}: INFTImageDetailProps): JSX.Element => {
  const userAccount = useSelector(selectAccount);
  const [checkLikedLoading, setCheckLikedLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  /**
   * Check if the NFT is liked by the connected user
   */
  const checkIfLiked = async (): Promise<void> => {
    if (!userAccount) return;
    setCheckLikedLoading(true);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/nft/checkIfLiked`,
        {
          params: {
            userId: userAccount.id,
            tokenId,
            collectionAddress,
          },
        }
      )
      .then((response) => setIsLiked(response.data))
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setCheckLikedLoading(false));
  };

  const handleLikeNft = async (event): Promise<void> => {
    if (!userAccount) return;

    event.preventDefault();

    setLikeLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/nft/${
          isLiked ? "dislike" : "like"
        }`,
        {
          userId: userAccount.id,
          tokenId,
          collectionAddress,
        }
      )
      .then(async () => {
        await checkIfLiked();
        const newNbLikes = isLiked ? -1 : 1;
        setNbLikes(nbLikes + newNbLikes);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLikeLoading(false));
  };

  useEffect(() => {
    checkIfLiked();
  }, []);

  if (checkLikedLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={`${image}`} alt="nft" className="shadow-2xl w-[25rem] h-auto" />
      <div className="divider" />
      <div className="w-full flex justify-between">
        <BlockchainIcon />
        {likeLoading ? (
          <LoadingText />
        ) : (
          <div className="flex items-center">
            <span>{nbLikes}</span>
            {isLiked ? (
              <AiFillHeart
                className={`mx-1 text-red-400 hover:text-red-400 cursor-pointer`}
                size={20}
                onClick={handleLikeNft}
              />
            ) : (
              <AiOutlineHeart
                className={`mx-1 hover:text-red-400 cursor-pointer`}
                size={20}
                onClick={handleLikeNft}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTImageDetail;
