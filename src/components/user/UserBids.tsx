import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import type { IBidInfo } from "../../types";
import BidRow from "../BidRow";
import TitleRow from "../layout/TitleRow";
import Loading from "../Loading";

interface IUserBidsProps {
  userId: string;
}

const UserBids = ({ userId }: IUserBidsProps): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [userBids, setUserBids] = useState<IBidInfo[]>([]);

  const getUserBids = async (): Promise<void> => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/market/listOfBidsByUser`,
        {
          params: {
            userId,
          },
        }
      )
      .then((response) => setUserBids(response.data))
      .catch((error) => alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserBids();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <TitleRow
        title=" Mes offres d'enchère en cours"
        subTitle={`${userBids.length} offre(s)`}
        infoItem={<button className="btn-secondary">Toutes les offres</button>}
      />
      <div className="flex justify-around font-bold rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
        <span>NFT ID</span>
        <span>Enchérisseur</span>
        <span>Prix</span>
        <span>Date</span>
      </div>
      {userBids.map(({ bid, bidder, nftId, date }) => (
        <BidRow
          bid={bid}
          bidder={bidder}
          nftId={nftId}
          date={date}
          key={`${nftId} ${bidder}`}
        />
      ))}
    </>
  );
};

export default UserBids;
