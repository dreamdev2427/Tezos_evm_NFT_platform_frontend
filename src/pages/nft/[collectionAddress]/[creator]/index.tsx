import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import { ICollection } from "../../../../types";
import { selectWallet } from "../../../../config/redux/userAccount";
import axios from "../../../../config/axios";
import CollectionBanner from "../../../../components/collection/CollectionBanner";
import CollectionInfoRow from "../../../../components/collection/CollectionInfoRow";
import CollectionStatsInfo from "../../../../components/collection/CollectionStatsInfo";
import NFTs from "../../../../components/collection/NFTsOfCollection";

const Collection = (): JSX.Element => {
  const router = useRouter();

  const userWallet = useSelector(selectWallet);

  const { collectionAddress, creator } = router.query;

  const [collectionInfo, setCollectionInfo] = useState<ICollection>();
  const [loading, setLoading] = useState(false);

  /**
   * Fetch one collection info by providing its address
   */
  const fetchCollectionInfo = async (): Promise<void> => {
    setLoading(true);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/collection/info`,
        {
          params: {
            collectionAddress,
          },
        }
      )
      .then((response) => {
        setCollectionInfo(response.data);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (
      collectionAddress !== undefined &&
      creator !== undefined &&
      userWallet !== undefined
    ) {
      // const checkApproval = async (): Promise<void> => {
      //   setIsApproved(
      //     await isApprovedForAll(creator as string, collectionAddress as string)
      //   );
      // };
      // checkApproval();
    }
  }, [collectionAddress, creator, userWallet]);

  useEffect(() => {
    fetchCollectionInfo();
  }, []);

  if (loading) return <Loading />;

  if (collectionInfo === undefined) return <Loading />;

  return (
    <div className="flex flex-col w-full">
      {/** COLLECTION BANNER */}
      <CollectionBanner collectionImage={collectionInfo.image} />

      {/**  COLLECTION INFO */}
      <CollectionInfoRow collectionInfo={collectionInfo} />

      <div className="divider" />

      {/**  COLLECTION STATS */}

      <CollectionStatsInfo />

      {/** COLLECTION CONTENT */}

      <NFTs collectionAddress={collectionAddress as string} />
    </div>
  );
};

export default Collection;
