import { useEffect, useState } from "react";
import { RiLayoutGridFill } from "react-icons/ri";
import axios from "../../config/axios";
import NFTCard from "../../components/nft/NFTCard";
import type { INFTData } from "../../types";
import Loading from "../../components/Loading";
import ActionsHeader from "../../pages/allNFTs/ActionsHeader";
import ActionsSider from "../../pages/allNFTs//ActionsSider";
import HeadingWithIcon from "../layout/HeadingWithIcon";

interface INFTsOfCollectionProps {
  collectionAddress: string;
}

const NFTsOfCollection = ({
  collectionAddress,
}: INFTsOfCollectionProps): JSX.Element => {
  const [NFTsOfCollection, setNFTsOfCollection] = useState<INFTData[]>([]);
  const [searchToken, setSearchToken] = useState("");
  const [loading, setLoading] = useState(true);

  const getNFTsOfCollection = async (): Promise<void> => {
    setLoading(true);

    axios
      .get("/evm/nft/collection", {
        params: {
          collectionAddress,
        },
      })
      .then((response) => setNFTsOfCollection(response.data))
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getNFTsOfCollection();
  }, []);

  return (
    <>
      {/** TITLE ALL NFTS */}
      <HeadingWithIcon
        className="my-6"
        headingText="NFTs de la collection"
        Icon={<RiLayoutGridFill size={28} />}
        size={4}
      />
      {/** ACTIONS SIDER - FILTERS */}
      <div className="flex w-full items-start">
        <div className="w-1/3 flex flex-col outline outline-1 p-3 outline-zinc-200 rounded-md">
          <ActionsSider />
        </div>

        {/** ACTIONS HEADER - SORT */}
        <div className="flex flex-col ml-4">
          <ActionsHeader
            searchToken={searchToken}
            setSearchToken={setSearchToken}
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3 place-items-center">
              {NFTsOfCollection.filter((item) => {
                if (searchToken === "") {
                  return item;
                } else if (
                  item.tokenId
                    .toString()
                    .toLowerCase()
                    .includes(searchToken.toLowerCase())
                ) {
                  return item;
                }
              }).map((nftData) => {
                return (
                  <NFTCard
                    collectionAddress={nftData.collectionAddress}
                    creatorAddress={nftData.creatorAddress}
                    metadata={nftData.metaData}
                    tokenId={nftData.tokenId.toString()}
                    isListed={!!nftData.listing}
                    key={`${nftData.collectionAddress} ${nftData.tokenId}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTsOfCollection;
