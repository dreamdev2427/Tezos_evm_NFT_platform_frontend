import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";
import CollectionCard from "../components/collection/CollectionCard";
import Loading from "../components/Loading";
import NFTForSaleCard from "../components/nft/NFTForSaleCard";
import type { ICollection, INFTListed } from "../types";
import axios from "../config/axios";
import Carousel from "../components/layout/Carousel";
import MarketBanner from "../components/market/MarketBanner";
import TitleRow from "../components/layout/TitleRow";
import LoadingText from "../components/LoadingText";

const Market = (): JSX.Element => {
  const navigate = useRouter();

  const [allCollections, setAllCollections] = useState<ICollection[]>([]);
  const [listedNFTs, setListedNFTs] = useState<INFTListed[]>([]);
  const [nftLoading, setNftLoading] = useState(true);
  const [collectionsLoading, setCollectionsLoading] = useState(true);

  /**
   * Get all collections stored on the blockchain
   */
  const getAllCollections = async (): Promise<void> => {
    setCollectionsLoading(true);
    axios
      .get("/evm/collection/list", {
        params: {
          startIndex: 1,
        },
      })
      .then((response) => {
        setAllCollections(response.data);
        setCollectionsLoading(false);
      })
      .catch((error) => window.alert(error.response.data.error));
  };

  /**
   * Get all items listed on market
   */
  const getAllMarketItems = async (): Promise<void> => {
    setNftLoading(true);

    axios
      .get("/evm/market/marketItems")
      .then((response) => setListedNFTs(response.data))
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setNftLoading(false));
  };

  useEffect(() => {
    getAllCollections();
    getAllMarketItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MarketBanner />

      {collectionsLoading ? (
        <LoadingText />
      ) : (
        <TitleRow
          title="Explorer des collections"
          subTitle={`${allCollections.length} collection(s)`}
          infoItem={
            <button
              className="btn-secondary"
              onClick={async () => navigate.push("/allCollections")}
            >
              Toutes les collections
            </button>
          }
        />
      )}

      <div className="divider"></div>

      {/** COLLECTIONS ON MARKETPLACE */}
      <div className="flex flex-wrap justify-center m-5 p-5 w-full">
        {!collectionsLoading ? (
          <Carousel itemsLength={allCollections.length}>
            {allCollections.slice(0, 10).map((collection) => {
              return (
                <SwiperSlide key={collection.contractAddress}>
                  <CollectionCard
                    key={collection.contractAddress}
                    imageSrc={collection.image}
                    name={collection.name ?? "Nom collection"}
                    description={collection.description}
                    address={collection.contractAddress}
                    creator={collection.creatorAddress}
                  />
                </SwiperSlide>
              );
            })}
          </Carousel>
        ) : (
          <Loading />
        )}
      </div>

      {/** NFTs ON MARKETPLACE */}
      <TitleRow
        title="Listings en vente"
        subTitle={`${listedNFTs.length} NFT(s)`}
        infoItem={
          <button
            className="btn-secondary"
            onClick={() => navigate.push("./allNFTs")}
          >
            Tous les NFTs
          </button>
        }
      />

      <div className="divider"></div>

      {/*NFTs for sale*/}
      {!nftLoading ? (
        <Carousel itemsLength={listedNFTs.length}>
          {listedNFTs.slice(0, 5).map((nftData) => {
            return (
              <SwiperSlide
                key={`${nftData.collectionContract} ${nftData.tokenId}`}
              >
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
              </SwiperSlide>
            );
          })}
        </Carousel>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Market;
