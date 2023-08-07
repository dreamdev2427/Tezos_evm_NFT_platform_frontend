import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../config/axios";
import ListTypeBox from "../../layout/ListTypeBox";
import { isApprovedForAll, setApprovalForAll } from "../../../utils";
import TxProcessing from "../../TxProcessing";
import type { INFTData, TypeListing } from "../../../types";
import NotLogged from "../../NotLogged";
import { selectAccount } from "../../../config/redux/userAccount";
import CreateAuctionModal from "./modals/CreateAuctionModal";
import CreateSaleModal from "./modals/CreateSaleModal";

interface INFTNotListedProps {
  nft: INFTData;
  setNft: (nft: INFTData) => void;
}

const NFTNotListed = ({ nft, setNft }: INFTNotListedProps): JSX.Element => {
  const userAccount = useSelector(selectAccount);

  const [saleType, setSaleType] = useState<TypeListing>("Sale");

  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  const [isApproved, setIsApproved] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  //--------  Handle close/open modals --------//
  const closeAuctionModal = (): void => {
    setIsAuctionModalOpen(false);
  };

  const openAuctionModal = (): void => {
    setIsAuctionModalOpen(true);
    setIsSaleModalOpen(false);
  };

  const closeSaleModal = (): void => {
    setIsSaleModalOpen(false);
  };

  const openSaleModal = (): void => {
    setIsSaleModalOpen(true);
    setIsAuctionModalOpen(false);
  };

  useEffect(() => {
    const readApproval = async () => {
      if (
        !nft.collectionAddress ||
        nft.collectionAddress === undefined ||
        nft.collectionAddress === null
      ) {
        alert("invalid collection address!");
        return;
      }

      if (nft.collection_id.blockchain === "Avalanche") {
        if (
          !nft.owner.evmaddress ||
          nft.owner.evmaddress === undefined ||
          nft.owner.evmaddress === null
        ) {
          alert("invalid evm address!");
          return;
        }

        //read approvement at here
        const isApprovedAll = await isApprovedForAll(
          nft.owner.evmaddress,
          nft.collectionAddress
        );
        console.log("isApprovedAll >>> ", isApprovedAll);
        setIsApproved(isApprovedAll);
      }
    };
    readApproval();
  }, [nft]);

  /**
   * Approve the market to manipulate the NFT on blockchain
   */
  const approve = async (): Promise<void> => {
    if (
      !nft.collectionAddress ||
      nft.collectionAddress === undefined ||
      nft.collectionAddress === null
    ) {
      alert("invalid collection address!");
      return;
    }

    if (nft.collection_id.blockchain === "Avalanche") {
      if (
        !nft.owner.evmaddress ||
        nft.owner.evmaddress === undefined ||
        nft.owner.evmaddress === null
      ) {
        alert("invalid evm address!");
        return;
      }

      if (isApproved === true) {
        setIsApproved(true);
      } else {
        setApproveLoading(true);

        setApprovalForAll(true, nft.collectionAddress)
          .then(async () => {
            alert("Approuvé");
            setIsApproved(true);
          })
          .catch(() => {
            setIsApproved(false);
          })
          .finally(() => setApproveLoading(false));
      }
    }
  };

  if (!userAccount) return <NotLogged />;

  if (approveLoading) return <TxProcessing />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col my-5">
        <label className="font-semibold mb-2" htmlFor="blockchain">
          Type de vente:
        </label>
        <div className="flex flex-start">
          <ListTypeBox
            className="lg:mr-6"
            listing="Sale"
            chosen={saleType === "Sale" ? true : false}
            setTypeListing={setSaleType}
          />
          <ListTypeBox
            listing="Auction"
            chosen={saleType === "Auction" ? true : false}
            setTypeListing={setSaleType}
          />
        </div>
      </div>

      {!isApproved && (
        <button
          className="btn-primary font-bold text-2xl my-14 w-full"
          onClick={approve}
        >
          Approuver
        </button>
      )}

      {isApproved ? (
        <>
          {" "}
          {saleType === "Sale" ? (
            <>
              {/**  SALE */}
              <button className="btn-primary my-6" onClick={openSaleModal}>
                Créer une vente
              </button>
            </>
          ) : (
            <>
              {/**  AUCTION */}
              <button className="btn-primary my-6" onClick={openAuctionModal}>
                Créer une enchère
              </button>
            </>
          )}
        </>
      ) : (
        <span>Veuillez approuver d'abord</span>
      )}

      {isAuctionModalOpen && (
        <CreateAuctionModal
          closeModal={closeAuctionModal}
          collectionAddress={nft.collectionAddress}
          tokenId={nft.tokenId.toString()}
          userId={userAccount.id}
        />
      )}

      {isSaleModalOpen && (
        <CreateSaleModal
          closeModal={closeSaleModal}
          collectionAddress={nft.collectionAddress}
          tokenId={nft.tokenId.toString()}
          userId={userAccount.id}
        />
      )}
    </div>
  );
};

export default NFTNotListed;
