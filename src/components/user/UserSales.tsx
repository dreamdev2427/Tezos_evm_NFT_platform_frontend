import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { IUserSaleInfo } from "../../types";
import Loading from "../Loading";
import SaleRow from "../SaleRow";

interface IUserSalesProps {
  userId: string;
}

const UserSales = ({ userId }: IUserSalesProps): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [userSales, setUserSales] = useState<IUserSaleInfo[]>([]);

  const getUserSales = async (): Promise<void> => {
    setLoading(true);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/market/listOfSalesByUser`,
        {
          params: {
            userId,
          },
        }
      )
      .then((response) => setUserSales(response.data))
      .catch((error) => alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserSales();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex justify-around font-bold rounded-md outline outline-[0.5px] outline-zinc-300 py-4 px-2 text-zinc-700">
        <span>ID NFT</span>
        <span>Prix</span>
        <span>ID Vendeur</span>
        <span>ID Acheteur</span>
        <span>Statut</span>
      </div>
      {userSales.map(({ isFinished, nftId, price, sellerId, finalBuyerId }) => (
        <SaleRow
          isFinished={isFinished}
          nftId={nftId}
          price={price}
          sellerId={sellerId}
          finalBuyerId={finalBuyerId}
          key={`${nftId} ${price} ${sellerId}`}
        />
      ))}
    </>
  );
};

export default UserSales;
