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
  const [creatorAddress, setCreatorAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");

  const [txProcessing, setTxProcessing] = useState(false);

  useEffect(() => {
    if (nft) {
      if (nft?.collection_id?.blockchain === "Avalanche") {
        setOwnerAddress(nft?.owner?.evmaddress);
        setCreatorAddress(nft?.userId?.evmaddress);
      } else {
        setOwnerAddress(nft?.owner?.tezosaddress);
        setCreatorAddress(nft?.userId?.tezosaddress);
      }
    }
  }, [nft]);

  /**
   * Create a purchase to the database
   */
  const createPurchaseBdd = async (): Promise<void> => {
    if (!userAccount) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/market/buy`, {
        userId: userAccount.id,
        collectionAddress,
        tokenId: nft.tokenId,
      })
      .then((response) => {
        window.alert(response.data.success);
        router.reload();
        router.push(
          `/nft/${collectionAddress}/${creatorAddress}/${nft.tokenId}`
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

    if (ownerAddress === userAccount?.id) {
      alert("Vous êtes le détenteur de cet NFT, vous ne pouvez pas l'acheter");
      return;
    }

    setTxProcessing(true);

    try {
      await buyNFT(
        collectionAddress as string,
        nft?._id,
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

  return (
    <div className="flex justify-center">
      {txProcessing === true ? (
        <TxProcessing />
      ) : (
        <div className="flex flex-col w-full">
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
        </div>
      )}
    </div>
  );
};

export default NFTListedSale;
