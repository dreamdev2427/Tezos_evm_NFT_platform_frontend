import React, { useState } from "react";
import Modal from "react-modal";
import Slider from "rc-slider";
import { ImUpload2 } from "react-icons/im";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useSelector } from "react-redux";
import { selectAccount } from "../../config/redux/userAccount";
import { createCollection, MAX_ROYALTIES } from "../../utils";
import axios from "../../config/axios";
import TxProcessing from "../TxProcessing";
import BlockchainBox from "../BlockchainBox";
import { TypeBlockchain } from "../../types";
import { pinFileToIPFS, pinJSONToIPFS } from "../../utils/pinatasdk";

const client = ipfsHttpClient({
  protocol: "https",
  host: "ipfs.infura.io",
  port: 5001,
  apiPath: "/api/v0",
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
};

interface ICreateCollectionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  royalties: number;
  setRoyalties: (value: number) => void;
  loadUserCollections: () => Promise<void>;
}

const CreateCollectionModal = ({
  isOpen,
  closeModal,
  royalties,
  setRoyalties,
  loadUserCollections,
}: ICreateCollectionModalProps): JSX.Element => {
  const userAccount = useSelector(selectAccount);

  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [ipfsFileCollection, setIpfsFileCollection] = useState("");
  const [collectionFile, setCollectionFile] = useState("");

  const [blockchain, setBlockchain] = useState<TypeBlockchain>("Avalanche");

  // PROCESSING STEP
  const [txProcessing, setTxProcessing] = useState(false);

  /**
   * Handle collection file onChange
   * @param e
   */
  const handleCollectionFile = async (e): Promise<void> => {
    const file = e.target.files[0];
    setCollectionFile(file.name);

    try {
      const added = await pinFileToIPFS(file);
      const url = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${added}`;
      console.log(" collection image url >>> ", url);
      setIpfsFileCollection(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  /**
   * Create a new collection in the database
   * @param collectionAddress {string}
   */
  const createCollectionToBdd = async (
    collectionAddress: string
  ): Promise<void> => {
    if (!userAccount) return;
    //  STORE TO THE DB
    console.log("save new collection to db");
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/collection/`, {
        name: collectionName,
        description: collectionDescription,
        image: ipfsFileCollection,
        blockchain,
        royalties,
        collectionAddress,
        userId: userAccount.id,
        symbol: collectionSymbol,
      })
      .then(async () => {
        window.alert("Collection créée !");
        await loadUserCollections();
        closeModal();
      })
      .catch((error) => {
        window.alert(error.response.data.error);
      });
  };

  /**
   * Create a new collection
   * @param e
   */
  const createNewCollection = async (e): Promise<void> => {
    e.preventDefault();

    if (!userAccount) {
      window.alert("Pour créer une collection veuillez vous connecter d'abord");
      return;
    }

    if (
      !collectionDescription ||
      ipfsFileCollection === null ||
      !collectionName
    ) {
      window.alert("Un des champs est manquant !");
      return;
    }

    const data = {
      description: collectionDescription,
      image: ipfsFileCollection,
      name: collectionName,
    };

    try {
      const added = await pinJSONToIPFS(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(" json url >>> ", url);
      setTxProcessing(true);
      //  STORE TO THE BLOCKCHAIN
      console.log(" before create a collection ");
      await createCollection(collectionName, collectionSymbol, url)
        .then(async (collectionAddress) => {
          console.log(" new collection address >>> ", collectionAddress);
          await createCollectionToBdd(collectionAddress);
        })
        .finally(() => setTxProcessing(false));
    } catch (error) {
      console.error("Error creating collection: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
      className={`z-1001`}
    >
      <div className="flex flex-col p-5 ">
        <h3 className="font-semibold self-start my-4">
          Create your collection
        </h3>
        {txProcessing ? (
          <TxProcessing />
        ) : (
          <>
            <form className="flex flex-col">
              <label className="input-file w-fit my-2 flex justify-between items-center">
                <span>Choose file </span>
                <ImUpload2 className="mx-2" />
                <input
                  type="file"
                  name="collectionImg"
                  onChange={(e) => handleCollectionFile(e)}
                />
              </label>

              <span>{collectionFile}</span>

              <div className="flex flex-col my-2">
                <label className="font-semibold" htmlFor="collectionName">
                  Name :
                </label>
                <input
                  className="input-form"
                  type="text"
                  name="collectionName"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>

              <div className="flex flex-col my-2">
                <label className="font-semibold" htmlFor="collectionSymbol">
                  Symbol :
                </label>
                <input
                  className="input-form"
                  type="text"
                  name="collectionSymbol"
                  value={collectionSymbol}
                  onChange={(e) => setCollectionSymbol(e.target.value)}
                />
              </div>

              <div className="flex flex-col my-2">
                <label
                  className="font-semibold"
                  htmlFor="collectionDescription"
                >
                  Description :
                </label>
                <textarea
                  className="input-form"
                  name="collectionDescription"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="font-semibold" htmlFor="royalties">
                  Royalties (%):{" "}
                </label>

                {/**  @ts-ignore */}
                <Slider
                  value={royalties}
                  onChange={(value) => setRoyalties(value)}
                  max={MAX_ROYALTIES}
                  step={1}
                />
                <span>{royalties} % </span>
              </div>

              {/**  CHOOSE BLOCKCHAIN  */}
              <div className="flex flex-col my-5">
                <label className="font-semibold" htmlFor="blockchain">
                  Blockchain:{" "}
                </label>
                <div className="flex flex-start">
                  <BlockchainBox
                    className="lg:mr-6"
                    blockchain="Avalanche"
                    chosen={blockchain === "Avalanche" ? true : false}
                    setBlockchain={setBlockchain}
                  />
                  <BlockchainBox
                    blockchain="Tezos"
                    chosen={blockchain === "Tezos" ? true : false}
                    setBlockchain={setBlockchain}
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-between my-4">
              <button className="btn-primary-outlined" onClick={closeModal}>
                Fermer
              </button>
              <button className="btn-primary" onClick={createNewCollection}>
                Créer
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreateCollectionModal;
