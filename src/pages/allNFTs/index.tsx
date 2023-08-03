import { useEffect, useState } from "react";
import axios from "../../config/axios";
import NFTForSaleCard from "../../components/nft/NFTForSaleCard";
import type { INFTListed } from "../../types";
import Loading from "../../components/Loading";
import ActionsHeader from "./ActionsHeader";
import ActionsSider from "./ActionsSider";

const allNFTs = (): JSX.Element => {
  const [listedNFTs, setListedNFTs] = useState<INFTListed[]>([]);
  const [nftLoading, setNftLoading] = useState(true);
  const [searchToken, setSearchToken] = useState("");

  const getAllMarketItems = async (): Promise<void> => {
    setNftLoading(true);

    axios
      .get("/evm/market/marketItems")
      .then((response) => setListedNFTs(response.data))
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setNftLoading(false));
  };

  useEffect(() => {
    getAllMarketItems();
  }, []);

  return (
    <>
      {/** TITLE ALL NFTS */}
      <h1 className="text-4xl lg:text-5xl my-10">
        Découvrez l'ensemble des NFTs
      </h1>
      {/** ACTIONS SIDER - FILTERS */}
      <div className="flex w-full">
        <div className="w-1/3 flex flex-col outline outline-1 p-3 m-2 outline-zinc-200 rounded-md">
          <ActionsSider />
        </div>

        {/** ACTIONS HEADER - SORT */}
        <div className="flex flex-col ml-4">
          <ActionsHeader
            searchToken={searchToken}
            setSearchToken={setSearchToken}
          />
          {nftLoading ? (
            <Loading />
          ) : (
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3 place-items-center">
              {listedNFTs.map((nftData) => {
                return (
                  <NFTForSaleCard
                    collectionAddress={nftData.collectionContract}
                    creatorAddress={nftData.creatorAddress}
                    metaData={nftData.metaData}
                    price={nftData.price}
                    tokenId={nftData.tokenId}
                    sellerAddress={nftData.sellerAddress}
                    listing={nftData.listing}
                    nbLikes={nftData.nbLikes}
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

export default allNFTs;
