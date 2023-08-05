import React, { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createMarketItem, ZERO } from "../../../../utils";
import TxProcessing from "../../../TxProcessing";
import axios from "../../../../config/axios";

dayjs.extend(utc);

interface ICreateAuctionModalProps {
  closeModal: () => void;
  tokenId: string;
  collectionAddress: string;
  userId: string;
}

const CreateSaleModal = ({
  closeModal,
  tokenId,
  collectionAddress,
  userId,
}: ICreateAuctionModalProps): JSX.Element => {
  const router = useRouter();

  const [sellPrice, setSellPrice] = useState("0.0");
  const [txProcessing, setTxProcessing] = useState(false);

  /**
   * Create a sale in database
   * @param price {number}
   */
  const createSaleBdd = async (price: number): Promise<void> => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/market/sale`, {
        price,
        collectionAddress,
        tokenId,
        userId: userId,
      })
      .then((response) => {
        window.alert(response.data.success);
        closeModal();
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setTxProcessing(false));
  };

  /**
   * List a sale on market
   */
  const createSale = async (): Promise<void> => {
    if (!userId) {
      window.alert("Pas d'utilisateur connecté");
      return;
    }

    const floatSellPrice = Number.parseFloat(sellPrice);

    if (isNaN(floatSellPrice) || floatSellPrice <= ZERO) {
      alert("Le prix saisi doit être correct et ne peut être inférieur à 0");
      return;
    }

    try {
      setTxProcessing(true);

      await createMarketItem(
        collectionAddress as string,
        tokenId as string,
        sellPrice
      )
        .then(async () => {
          await createSaleBdd(floatSellPrice);
        })
        .finally(() => {
          setTxProcessing(false);
          router.reload();
        });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-opacity-75 bg-gray-800 z-40"
        onClick={closeModal}
        aria-hidden={true}
      />

      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 xl:w-1/2 z-50 transition ease-in-out">
        <div className="relative p-4 w-full  h-full px-10 md:h-auto">
          <div className="relative bg-white rounded-lg px-32 shadow">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="my-6 text-xlfont-bold text-center text-zinc-900">
                Mise en vente d'un NFT
              </h3>
              {txProcessing ? (
                <TxProcessing />
              ) : (
                <form className="space-y-6" action="#">
                  <label htmlFor="price" className="my-2">
                    Prix de vente :
                  </label>
                  <input
                    name="price"
                    className="input-form mx-2"
                    type="text"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                  />

                  <div className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="btn-secondary"
                      onClick={createSale}
                    >
                      Lister
                    </button>
                  </div>

                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Pour plus d'informations concernant les enchères:
                    <button className="text-blue-700 hover:underline dark:text-blue-500">
                      Les enchères
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSaleModal;
