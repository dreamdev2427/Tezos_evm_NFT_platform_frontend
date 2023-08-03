import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import { SwiperSlide } from "swiper/react";
import Carousel from "../components/layout/Carousel";
import NewCollection from "../components/collection/NewCollection";
import type { ICollection } from "../types";
import MarketBanner from "../components/market/MarketBanner";
import TitleRow from "../components/layout/TitleRow";
import TopCollectionsTable from "../components/collection/TopCollectionsTable";
import axios from "../config/axios";
import Loading from "../components/Loading";

const allCollections = (): JSX.Element => {
  const navigate = useRouter();

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
    <div className="flex flex-col">
      <MarketBanner />
      {/** NEW COLLECTIONS */}
      <h1 className="text-4xl lg:text-5xl my-10">Nouvelles collections</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-100 p-4 my-10">
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Toutes les collections
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Pop
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Street
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Contemporain
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Abstrait
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {" "}
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
          </Tab.Panel>
          <Tab.Panel>Collections Pop</Tab.Panel>
          <Tab.Panel>Collections Street</Tab.Panel>
          <Tab.Panel>Collections Contemporain</Tab.Panel>
          <Tab.Panel>Collections Abstrait</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <br />

      {/** TOP COLLECTIONS */}
      <TitleRow
        title="Top collections"
        infoItem={
          <span className="text-2xl text-indigo-800 font-bold">
            Dernières 24h
          </span>
        }
      />

      <div className="divier" />

      <TopCollectionsTable />

      {/** BUTTON ALL COLLECTIONS RANKING*/}
      <button
        className="btn-secondary my-6 text-xl"
        onClick={async () => navigate.push("/allCollectionsPage")}
      >
        Plus de collections
      </button>
    </div>
  );
};

export default allCollections;
