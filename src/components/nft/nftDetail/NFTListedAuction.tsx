import React, { useEffect, useState } from "react";
import { MdLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAccount, selectWallet } from "../../../config/redux/userAccount";
import AuctionTimeEnding from "../AuctionTimeEnding";
import Loading from "../../Loading";
import socket from "../../../config/sockets";
import axios from "../../../config/axios";
import TxProcessing from "../../TxProcessing";
import { createAuctionBid, ZERO } from "../../../utils";
import type { INFTData } from "../../../types";
import BidsHistory from "./BidsHistory";
import { selectTezosWallet } from "../../../config/redux/tezos_reducer";

interface IAuctionRealTimeInfo {
  highestBid: number;
  highestBidder?: string;
  endingTime?: string;
  isFinished?: boolean;
}

interface INFTListedAuctionProps {
  floorPrice: number;
  collectionAddress: string;
  tokenId: number;
  owner: string;
  nft: INFTData;
}

const NFTListedAuction = ({
  floorPrice,
  collectionAddress,
  tokenId,
  owner,
  nft,
}: INFTListedAuctionProps): JSX.Element => {
  const tezosWallet = useSelector(selectTezosWallet);
  const userAccount = useSelector(selectAccount);
  const userWallet = useSelector(selectWallet);

  const [auctionRealTimeInfo, setAuctionRealTimeInfo] =
    useState<IAuctionRealTimeInfo>();
  const [bid, setBid] = useState("0.0");
  const [txProcessing, setTxProcessing] = useState(false);

  const router = useRouter();

  /**
   * Fetch initial auction info when arriving on page
   */
  const fetchAuctionInfo = async (): Promise<void> => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/item/auction`, {
        params: {
          collectionAddress,
          tokenId,
        },
      })
      .then((response) => {
        const info: IAuctionRealTimeInfo = response.data.data;
        if (info !== null) {
          setAuctionRealTimeInfo({
            highestBid: info.highestBid,
            endingTime: info.endingTime,
            highestBidder: info.highestBidder,
            isFinished: info.isFinished,
          });
        }
      })
      .catch((error) => window.alert(error.response.data.error));
  };

  /**
   * Make a new bid
   */
  const createBidBdd = async (floatBid: number): Promise<void> => {
    if (!userAccount) {
      alert("Pas de compte connecté");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/item/bid`, {
        bidder: userAccount.id,
        bid: floatBid,
        itemId: nft?._id,
      })
      .then(() => {})
      .catch((error) => alert(error.response.data.error))
      .finally(() => setTxProcessing(false));
  };

  const createBid = async (event): Promise<void> => {
    event.preventDefault();

    if (!userWallet || !userAccount || !auctionRealTimeInfo) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    if (owner === userAccount.id) {
      alert("Vous êtes le détenteur de cet NFT");
      return;
    }

    //<= including gas fess
    if (
      nft?.collection_id?.blockchain === "Avalanche" &&
      Number.parseFloat(userWallet.balanceTemporary) <
        auctionRealTimeInfo.highestBid
    ) {
      alert("Pas assez de fonds");
      return;
    }

    if (
      nft?.collection_id?.blockchain === "Tezos" &&
      Number.parseFloat(tezosWallet?.balance) < auctionRealTimeInfo.highestBid
    ) {
      alert("Pas assez de fonds");
      return;
    }

    const floatBid = Number.parseFloat(bid) * 0.01;

    if (isNaN(floatBid) || floatBid <= ZERO) {
      alert("Le prix saisi doit être correct et ne peut être inférieur à 0");
      return;
    }

    setTxProcessing(true);
    try {
      await createAuctionBid(nft?._id?.toString(), floatBid)
        .then(async () => {
          await createBidBdd(floatBid);
        })
        .finally(() => setTxProcessing(false));
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect((): any => {
    fetchAuctionInfo();
    //  Listen to newest bids
    socket.on("newBid", (data: IAuctionRealTimeInfo) => {
      console.log("new bid", data);
      setAuctionRealTimeInfo(data);
    });

    //  Listen to auction end
    socket.on("auctionFinished", (data: IAuctionRealTimeInfo) => {
      console.log(data);
      setAuctionRealTimeInfo(data);
      router.reload();
    });

    return () => socket.disconnect(); //Clear socket
  });

  return (
    <>
      {txProcessing ? (
        <TxProcessing />
      ) : (
        <>
          {auctionRealTimeInfo?.endingTime && (
            <AuctionTimeEnding endTime={auctionRealTimeInfo.endingTime} />
          )}

          <span className="font-bold">Historique des offres</span>
          <BidsHistory
            collectionAddress={collectionAddress}
            tokenId={tokenId}
          />
          <span className="mt-4">Plus haute offre actuelle</span>
          {auctionRealTimeInfo?.isFinished ? (
            <span>Cet NFT n'est plus en vente actuellement</span>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="flex">
                  <span className="text-7xl font-bold text-zinc-900">
                    {auctionRealTimeInfo?.highestBid ?? floorPrice}
                  </span>
                  <div className="flex flex-col justify-end">
                    <span className="text-zinc-600 text-xl ml-1">AVAX</span>
                  </div>
                </div>

                <div className="flex items-end ml-2">
                  <span className="mr-1 text-lg text-zinc-600">par </span>
                  <span className="text-xl text-zinc-800">
                    {auctionRealTimeInfo?.highestBidder ??
                      "Aucun enchérisseur pour l'instant"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 lg:mt-10">
                <label
                  htmlFor="bid"
                  className="text-2xl lg:text-3xl flex items-center"
                >
                  <MdLocalOffer className="mr-2" />
                  Faire une offre :{" "}
                </label>{" "}
                <input
                  className="input-form mx-2"
                  type="text"
                  name="bid"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                />
              </div>

              <button
                className="btn-primary self-center my-14 w-full"
                onClick={createBid}
              >
                Enchérir
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default NFTListedAuction;
