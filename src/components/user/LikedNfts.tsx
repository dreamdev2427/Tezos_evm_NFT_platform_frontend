import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import Loading from "../Loading";
import { INFTData } from "../../types";
import NFTCard from "../nft/NFTCard";
import TitleRow from "../layout/TitleRow";

interface ILikedNftsProps {
  userId: string;
}

const LikedNfts = ({ userId }: ILikedNftsProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [likedNfts, setLikedNfts] = useState<INFTData[]>([]);

  const getLikedNfts = async (): Promise<void> => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/nft/likedNfts`, {
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
    <>
      <TitleRow
        title="Mes NFTs favoris"
        subTitle={`${likedNfts?.length.toString() ?? "0"} NFTs`}
        infoItem={<button className="btn-secondary">Tous les favoris</button>}
      />

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
    </>
  );
};

export default LikedNfts;
