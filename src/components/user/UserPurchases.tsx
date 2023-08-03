import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { IUserPurchaseInfo } from "../../types";
import Loading from "../Loading";
import PurchaseRow from "../PurchaseRow";

interface IUserPurchasesProps {
  userId: string;
}

const UserPurchases = ({ userId }: IUserPurchasesProps): JSX.Element => {
  const [purchases, setPurchases] = useState<IUserPurchaseInfo[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);

  const getUserPurchases = async (): Promise<void> => {
    setPurchasesLoading(true);

    axios
      .get("/evm/market/listOfPurchasesByUser", {
        params: {
          userId,
        },
      })
      .then((response) => setPurchases(response.data))
      .catch((error) => alert(error.response.data.error))
      .finally(() => setPurchasesLoading(false));
  };
  useEffect(() => {
    getUserPurchases();
  }, []);

  if (purchasesLoading) return <Loading />;
  return (
    <>
      <div className="flex justify-around font-bold rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
        <span>Type</span>
        <span>ID NFT</span>
        <span>Type d'achat</span>
        <span>Date</span>
      </div>
      {purchases.map((purchase) => (
        <PurchaseRow
          date={purchase.date}
          isAuction={purchase.isAuction}
          nftId={purchase.nftId}
          key={`${purchase.date} ${purchase.nftId}`}
        />
      ))}
    </>
  );
};

export default UserPurchases;
