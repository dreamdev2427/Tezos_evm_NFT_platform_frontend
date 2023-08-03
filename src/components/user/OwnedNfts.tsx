import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import Loading from "../Loading";
import { INFTData } from "../../types";
import NFTCard from "../nft/NFTCard";

interface ILikedNftsProps {
  userId: string;
}

const OwnedNfts = ({ userId }: ILikedNftsProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [likedNfts, setLikedNfts] = useState<INFTData[]>([]);

  const getLikedNfts = async (): Promise<void> => {
    setLoading(true);
    axios
      .get("/evm/nft/userNfts", {
        params: {
          userId,
        },
      })
      .then((response) => {
        setLikedNfts(response.data);
      })
      .catch((error) => error.response.data.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getLikedNfts();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
      {likedNfts?.map((likedNft: INFTData) => (
        <NFTCard
          collectionAddress={likedNft.collectionAddress}
          creatorAddress={likedNft.creatorAddress}
          isListed={!!likedNft.listing}
          metadata={likedNft.metaData}
          tokenId={likedNft.tokenId.toString()}
        />
      ))}
    </div>
  );
};

export default OwnedNfts;
