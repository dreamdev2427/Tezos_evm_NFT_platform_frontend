import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { checkItemListed, tokenURI } from "../../../../utils";
// import { fetchIPFSData } from "../../../../utils/network";
import { useSelector } from "react-redux";
import { INFTData } from "../../../../types";
import axios from "../../../../config/axios";
import NFTHistoric from "../../../../components/nft/NFTHistoric";
import NFTSameCollection from "../../../../components/nft/NFTSameCollection";
import { LastActivities } from "../../../../components/statistics";
import NFTImageDetail from "../../../../components/nft/nftDetail/NFTImageDetail";
import NFTInfoDetail from "../../../../components/nft/nftDetail/NFTInfoDetail";
import NFTListed from "../../../../components/nft/nftDetail/NFTListed";
import NFTNotListed from "../../../../components/nft/nftDetail/NFTNotListed";
import Loading from "../../../../components/Loading";
import { selectAccount } from "../../../../config/redux/userAccount";

const NFT = (): JSX.Element => {
  const router = useRouter();

  const userAccount = useSelector(selectAccount);

  const { collectionAddress, tokenId } = router.query;
  const [nft, setNft] = useState<INFTData>();
  const [loading, setLoading] = useState(true);
  const [nbLikes, setNbLikes] = useState(0);

  const fetchNft = async (): Promise<void> => {
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/nft`, {
        params: {
          collectionAddress,
          tokenId: tokenId.toString(),
        },
      })
      .then((response) => {
        setNft(response.data.data);
        setNbLikes(response.data.data.likes?.length);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (tokenId !== undefined && collectionAddress !== undefined) fetchNft();
  }, [tokenId, collectionAddress]);

  return (
    <div className="flex flex-col">
      {loading ? (
        <Loading />
      ) : (
        <>
          {nft ? (
            <>
              <div className="flex flex-col-reverse lg:flex-row justify-center w-full p-3 lg:p-20">
                {/**  NFT IMAGE & META INFO */}
                <NFTImageDetail
                  image={nft.image}
                  collectionAddress={collectionAddress as string}
                  tokenId={tokenId as string}
                  nbLikes={nbLikes ?? 0}
                  setNbLikes={setNbLikes}
                />

                <div className="flex flex-col lg:justify-between lg:w-2/4 md:mx-5 md:p-10">
                  {/**  NFT GENERAL INFO */}
                  <NFTInfoDetail nft={nft as INFTData} />

                  <div className="divider" />

                  <span>
                    {userAccount?.id === nft.owner._id
                      ? "Vous êtes le détenteur de cet NFT"
                      : "Vous n'êtes pas le détenteur de cet NFT"}
                  </span>

                  {/**  LISTED */}
                  {nft.isSale > 0 && nft.price && (
                    <NFTListed
                      nft={nft}
                      collectionAddress={collectionAddress as string}
                      bigNumberPrice={nft.price?.toString()}
                    />
                  )}

                  <br />
                  {/**  NOT LISTED */}

                  {!(nft.isSale > 0) && nft.owner?._id === userAccount?.id && (
                    <NFTNotListed nft={nft} setNft={setNft} />
                  )}
                </div>
              </div>
              <LastActivities />

              <NFTHistoric />

              <NFTSameCollection nfts={[nft]} />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default NFT;
