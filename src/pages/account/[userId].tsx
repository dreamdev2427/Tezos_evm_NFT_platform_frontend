import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SwiperSlide } from "swiper/react";
import { Tab } from "@headlessui/react";
import { GrTransaction } from "react-icons/gr";
import { useSelector } from "react-redux";
import { selectWallet, selectAccount } from "../../config/redux/userAccount";
import Loading from "../../components/Loading";
import { ZERO } from "../../utils";
import CollectionCard from "../../components/collection/CollectionCard";
import type { ICollection } from "../../types";
import NotLogged from "../../components/NotLogged";
import axios from "../../config/axios";
import Carousel from "../../components/layout/Carousel";
import TitleRow from "../../components/layout/TitleRow";
import UserInfoBox from "../../components/user/UserInfoBox";
import LikedNfts from "../../components/user/LikedNfts";
import HeadingWithIcon from "../../components/layout/HeadingWithIcon";
import UserPurchases from "../../components/user/UserPurchases";
import UserBids from "../../components/user/UserBids";
import UserSales from "../../components/user/UserSales";
import OwnedNfts from "../../components/user/OwnedNfts";

const Account = (): JSX.Element => {
  const router = useRouter();
  const { userId } = router.query;

  const userWallet = useSelector(selectWallet);
  const userAccount = useSelector(selectAccount);

  const [loading, setLoading] = useState<boolean>(false);

  const [userCollections, setuserCollections] = useState<ICollection[]>([]);

  /**
   * Get all collections created by the user
   */
  const getUserCollections = async (): Promise<void> => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/collection/user`,
        {
          params: {
            userId,
          },
        }
      )
      .then((response) => {
        setuserCollections(response.data);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userWallet && userAccount) getUserCollections();
  }, [userWallet, userAccount]);

  if (loading) return <Loading />;

  if (!userWallet || !userAccount) return <NotLogged />;

  return (
    <div className="p-3">
      {/** ACCOUNT INFO */}
      <UserInfoBox />

      <div className="divider"></div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-100 p-4 my-10">
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes collections
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes NFTs acquis
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes ventes
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes achats
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes offres d'enchères en cours
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Mes NFTs favoris
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {/**  EXPLORE COLLECTIONS */}
            <TitleRow
              title="Explorer vos collections"
              subTitle={`${userCollections.length} collection(s)`}
              infoItem={
                <button className="btn-secondary">
                  Toutes les collections
                </button>
              }
            />

            <div className="flex flex-wrap justify-center  p-5">
              <Carousel itemsLength={userCollections.length}>
                {userCollections.map((collection) => {
                  return (
                    <SwiperSlide key={collection.contractAddress}>
                      <CollectionCard
                        imageSrc={collection.image}
                        name={collection.name}
                        description={collection.description}
                        address={collection.contractAddress}
                        creator={collection.creatorAddress}
                      />
                    </SwiperSlide>
                  );
                })}
              </Carousel>

              {userCollections.length === ZERO && (
                <span>Vous n'avez encore aucune collection</span>
              )}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            {/**  USER NFTs */}
            <HeadingWithIcon
              headingText="Mes NFTs"
              Icon={<GrTransaction size={28} />}
            />
            <OwnedNfts userId={userAccount.id} />
          </Tab.Panel>

          <Tab.Panel>
            {/**  USER SALES */}
            <HeadingWithIcon
              headingText="Mes ventes récentes"
              Icon={<GrTransaction size={28} />}
            />
            <UserSales userId={userAccount.id} />
          </Tab.Panel>

          <Tab.Panel>
            <HeadingWithIcon
              headingText="Mes achats récents"
              Icon={<GrTransaction size={28} />}
            />

            <UserPurchases userId={userAccount.id} />
          </Tab.Panel>

          <Tab.Panel>
            {/**  USER BIDS */}
            <UserBids userId={userAccount.id} />
          </Tab.Panel>

          <Tab.Panel>
            {/**  FAVORITED NFTs */}

            <LikedNfts userId={userAccount.id} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Account;
