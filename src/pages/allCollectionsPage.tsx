import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Carousel from "../components/layout/Carousel";
import Loading from "../components/Loading";
import NewCollection from "../components/collection/NewCollection";
import axios from "../config/axios";
import type { ICollection } from "../types";

const allCollectionsPage = (): JSX.Element => {
  const [newCollections, setNewCollections] = useState<ICollection[]>([]);
  const [newCollectionsloading, setNewCollectionsLoading] = useState(false);

  //  TODO: fetch only new collections
  const getCollections = async (): Promise<void> => {
    setNewCollectionsLoading(true);
    axios
      .get("/evm/collection/list")
      .then((response) => {
        setNewCollections(response.data);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setNewCollectionsLoading(false));
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div>
      <h1 className="text-4xl lg:text-5xl my-10">Toutes les collections</h1>
      {newCollectionsloading ? (
        <Loading />
      ) : (
        <Carousel itemsLength={newCollections.length}>
          {newCollections.map(
            ({
              description,
              image,
              name,
              nbNfts,
              contractAddress,
              creatorAddress,
            }) => {
              return (
                <SwiperSlide>
                  <NewCollection
                    key={image}
                    description={description}
                    image={image}
                    name={name}
                    nbNFTs={nbNfts ?? 0}
                    collectionAddress={contractAddress}
                    creatorAddress={creatorAddress}
                  />
                </SwiperSlide>
              );
            }
          )}
        </Carousel>
      )}
    </div>
  );
};

export default allCollectionsPage;
