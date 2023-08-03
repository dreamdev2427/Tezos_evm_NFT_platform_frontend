import React, { useEffect, useState } from "react";
import { utils } from "ethers";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "../../../config/axios";
import { INFTData } from "../../../types";
import { buyNFT } from "../../../utils";
import TxProcessing from "../../TxProcessing";
import { selectAccount, selectWallet } from "../../../config/redux/userAccount";
import Loading from "../../Loading";

interface INFTListedSaleProps {
  collectionAddress: string;
  bigNumberPrice: string;
  nft: INFTData;
}

const NFTListedSale = ({
  collectionAddress,
  bigNumberPrice,
  nft,
}: INFTListedSaleProps): JSX.Element => {
  const router = useRouter();

  const userAccount = useSelector(selectAccount);
  const userWallet = useSelector(selectWallet);

  const [txProcessing, setTxProcessing] = useState(false);
  const [saleLoading, setSaleLoading] = useState(false);
  const [marketItemId, setMarketItemId] = useState(0);

  /**
   * Create a purchase to the database
   */
  const createPurchaseBdd = async (): Promise<void> => {
    if (!userAccount) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    axios
      .post("/evm/market/buy", {
        userId: userAccount.id,
        collectionAddress,
        tokenId: nft.tokenId,
      })
      .then((response) => {
        window.alert(response.data.success);
        router.reload();
        router.push(
          `/nft/${collectionAddress}/${nft.creatorAddress}/${nft.tokenId}`
        );
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setTxProcessing(false));
  };

  const onClickBuyNFT = async (event): Promise<void> => {
    event.preventDefault();
    if (!userWallet) {
      alert("Pas de wallet connecté");
      return;
    }

    if (!userAccount) {
      alert("Pas de compte connecté");
      return;
    }

    //<= including gas fess
    if (
      Number.parseFloat(userWallet.balanceTemporary) <
      Number.parseFloat(bigNumberPrice)
    ) {
      alert("Pas assez de fonds");
      return;
    }

    if (nft.ownerAddress === userAccount?.id) {
      alert("Vous êtes le détenteur de cet NFT, vous ne pouvez pas l'acheter");
      return;
    }

    setTxProcessing(true);

    try {
      await buyNFT(
        collectionAddress as string,
        marketItemId,
        utils.parseEther(bigNumberPrice).toString()
      )
        .then(async () => {
          createPurchaseBdd();
        })
        .finally(() => setTxProcessing(false));
    } catch (error) {
      window.alert(JSON.stringify(error));
    }
  };

  console.log(bigNumberPrice);
  console.log(utils.parseEther(bigNumberPrice));
  console.log(utils.parseEther(bigNumberPrice).toString());
  console.log(utils.parseUnits(bigNumberPrice.toString(), "ether"));

  //CONSOLE LOG CREATE AND BUY TO COMPARE
  const getSaleMarketItem = async (): Promise<void> => {
    setSaleLoading(true);

    axios
      .get("/evm/market/saleMarketItem", {
        params: {
          collectionAddress,
          tokenId: nft.tokenId,
        },
      })
      .then((response) => {
        console.log(response);
        setMarketItemId(response.data);
      })
      .catch((error) => {
        if (error.response !== undefined) alert(error.response.data.error);

        alert(JSON.stringify(error));
      })
      .finally(() => setSaleLoading(false));
  };

  useEffect(() => {
    getSaleMarketItem();
  }, []);

  return (
    <div className="flex justify-center">
      {txProcessing === true ? (
        <TxProcessing />
      ) : (
        <div className="flex flex-col w-full">
          {saleLoading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <span className="mt-4">Prix</span>
              <div className="flex">
                <span className="text-6xl font-bold text-zinc-900">
                  {nft.price}
                </span>
                <div className="flex flex-col justify-end">
                  <span className="text-zinc-600 text-xl">AVAX</span>
                </div>
              </div>
              <button
                className="btn-primary font-bold text-2xl my-14 w-full"
                onClick={(e) => onClickBuyNFT(e)}
              >
                Acheter
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTListedSale;
