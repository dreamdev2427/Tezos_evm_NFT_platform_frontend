import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Compressor from "compressorjs";
import { useSelector, useDispatch } from "react-redux";
import { ImUpload2 } from "react-icons/im";
import { selectWallet, selectAccount } from "../config/redux/userAccount";
import { mint, ZERO } from "../utils";
import { ICollection } from "../types";
import TxProcessing from "../components/TxProcessing";
import Loading from "../components/Loading";
import axios from "../config/axios";
import CreateCollectionModal from "../components/collection/CreateCollectionModal";
import NFTPreview from "../components/nft/NFTPreview";
import NotLogged from "../components/NotLogged";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pinatasdk";
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
  ColorMode,
} from "@airgap/beacon-sdk";
import {
  setBlockchainDapp,
  selectBlockchainDapp,
} from "../config/redux/blockchainDapp";
import {  
  selectTezosWallet,
} from "../config/redux/tezos_reducer.js";
import {  
  mintTezosNFT,
  fetchData,
  _walletConfig 
} from "../config/redux/tezos_actions.js";
import config from "../config/redux/tezos_config";

const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZmZjc1OWVjMDk5YUM1YTVEQTkxOGUzQjVDNzg0N0EwZUEyNjYyQ0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Nzg5OTI5MDM2NiwibmFtZSI6IkRldlBvcnRhbCJ9.-MRWyPn63qxGaYfZtU1P8Rzt74Q8t5VqMy0BiWh1vy4";
const client = new NFTStorage({ token: apiKey });

const Mint = (): JSX.Element => {
  const dispatch  = useDispatch();
  const userWallet = useSelector(selectWallet);
  const userAccount = useSelector(selectAccount);
  const blockchainDapp = useSelector(selectBlockchainDapp);
  const tezosAccount = useSelector(selectTezosWallet);

  const [wallet, setWallet] = useState(null);

  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://ghostnet.smartpy.io/")
  );

  //  NFT
  const [nftFile, setNftFile] = useState<File>();
  const [nftPreview, setNftPreview] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nbSeries, setNbSeries] = useState(1);

  const [collection, setCollection] = useState("");
  const [royalties, setRoyalties] = useState(0.0);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txProcessing, setTxProcessing] = useState(false);

  //  IPFS
  const [ipfsFile, setIpfsFile] = useState("");

  const [userCollections, setUserCollections] = useState<ICollection[]>([]);

  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: [".png", ".jpg", ".jpeg"],
    multiple: false,
    readAs: "ArrayBuffer",
});

  const tezos_collection  = {
    _id: "64d12954f1a8a860b4d00524",
    bloakchain: "Tezos",
    collectionAddress: config.contractAddress,
    name: "Univeral Tezos Collection",
    description: "This is the test of Maksym5",
  }

  useEffect(() => {
    (async () => {
      const wallet_instance = new BeaconWallet({
        name: "NFT Marketplace",
        preferredNetwork: NetworkType.GHOSTNET,
        colorMode: ColorMode.LIGHT,
        disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => {
              return data.publicKey;
            },
          },
        },
      });
      Tezos.setWalletProvider(wallet_instance);
      const activeAccount = await wallet_instance.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet_instance.getPKH();
        const balance = await Tezos.tz.getBalance(userAddress);
       dispatch(
          _walletConfig({
            userAddress: userAddress,
            balance: balance.toNumber(),
          }))
      }
      setWallet(wallet_instance);
    })();
  }, [Tezos, dispatch]);

  useEffect(() => {
    fetchData({ Tezos })(dispatch);
  }, [Tezos, dispatch]);

  function openCreateCollectionModal(): void {
    setModalIsOpen(true);
  }

  function closeCreateCollectionModal(): void {
    setModalIsOpen(false);
  }
  /**
   * Promise for awaiting the compression
   * @param file {FILE | blob} - File to compress
   * @returns resolve(File | Blob)
   */
  const awaitCompression = async (file: File | Blob): Promise<File | Blob> =>
    new Promise(function (resolve) {
      let result: File | Blob;

      new Compressor(file, {
        quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          result = compressedResult;
          resolve(result);
        },
      });
    });

  /**
   * Compress a file
   * @param file {File} - File to compress
   * @returns {Promise<File | Blob>}
   */
  const compressFile = async (file: File): Promise<File | Blob> => {
    const { type, name } = file;

    const result = await awaitCompression(file);

    const returnedFile = new File([result], name, {
      type,
    });

    return returnedFile;
  };

  /**
   * Handle NFT file onChange
   * @param e
   */
  const handleNftFile = async (e): Promise<void> => {
    try {
      const file = e.target.files[0];

      setNftPreview(URL.createObjectURL(file));
      setNftFile(file);
    } catch (error) {
      window.alert(`Error uploading file : ${error}`);
    }
  };

  /**
   * Store the new NFT to the database
   * @param formData {FormData}
   */
  const mintToBdd = async (data: any): Promise<void> => {
    //STORE TO THE DB
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/nft/`, { ...data })
      .then(() => {
        window.alert("NFT minté !");
        setNftFile(undefined);
        setDescription("");
        setName("");
        setNftPreview("");

        loadUserCollections(); //nbNfts incremented and in case user mint twice in a row
      })
      .catch((error) => window.alert(error.response?.data?.error))
      .finally(() => setTxProcessing(false));
  };

  /**
   * Create an new NFT
   */
  const mintNFT = async (): Promise<void> => {
    if (!nftFile || !collection) {
      window.alert(
        `Un des champs est manquant ! >>> ` + ipfsFile + ", " + collection
      );
      return;
    }

    if (!userAccount || !userWallet) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    try {
      setTxProcessing(true);

      const returnedFile = await compressFile(nftFile);

      const imageadded = await pinFileToIPFS(returnedFile);

      const imgaeurl = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${imageadded}`;
      setIpfsFile(imgaeurl);

      const ipfsData = {
        name,
        description,
        image: imgaeurl,
      };
      const added = await pinJSONToIPFS(ipfsData);
      const url = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${added}`;

      //  Find selected collection and increment its token id
      const tokenId =
        userCollections.find((col) => col.contractAddress === collection)
          ?.nbNfts ?? 0;

      const royaltiesCollection =
        userCollections.find((col) => col.contractAddress === collection)
          ?.royalties ?? 0;
      if(blockchainDapp === "Avalanche")
      {
      //  STORE TO THE BLOCKCHAIN
      await mint(url, Math.ceil(royaltiesCollection), collection)
        .then(async () => {
          const data = {
            image: imgaeurl,
            tokenId: Number(tokenId) + Number(1),
            collectionAddress: collection,
            userId: userAccount.id,
            owner: userAccount.id,
            metadataURI: url,
            collectionId: userCollections.find(
              (item) =>
                item.collectionAddress.toLowerCase() ===
                collection.toLowerCase()
            )._id,
            description,
            name,
          };

          await mintToBdd(data);
        })
        .finally(() => setTxProcessing(false));
      }
      else {        
          
      const ipfsData = {
        name,
        description,
        decimals: 0,
              symbol: name,
        image: imgaeurl,
      };
      const added = await pinJSONToIPFS(ipfsData);
      const url = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${added}`;
      const data = {
        image: imgaeurl,
        tokenId: Number(tokenId) + Number(1),
        collectionAddress: collection,
        userId: userAccount.id,
        owner: userAccount.id,
        metadataURI: url,
        collectionId: userCollections.find(
          (item) =>
            item.collectionAddress.toLowerCase() ===
            collection.toLowerCase()
        )._id,
        description,
        name,
      };
          dispatch(mintTezosNFT({ Tezos, amount: nbSeries, metadata: url, data }));
          
          setNftFile(undefined);
          setDescription("");
          setName("");
          setNftPreview("");
  
          setTxProcessing(false);
      }
    } catch (error) {
      window.alert(`Error creating NFT : ${error}`);
    }
  };

  /**
   * Fetch all collections created by the user
   */
  const loadUserCollections = async (): Promise<void> => {
    if (!userAccount) {
      alert("Pas d'utilisateur connecté");

      return;
    }

    setLoading(true);
    if(blockchainDapp === "Avalanche")
    {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/collection/user`, {
        userId: userAccount.id,
      })
      .then((response) => {
        const collections = response.data.data;
        setUserCollections(collections);
        setCollection(collections[0]?.collectionAddress);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
    }else {
      setUserCollections([tezos_collection]);
      setCollection(tezos_collection.collectionAddress);
      
    setLoading(false);
    }
  };

  useEffect(() => {
    if (userWallet && userAccount) {
      loadUserCollections();
    }
  }, [userWallet, userAccount]);

  if (loading) return <Loading />;

  if (!userAccount || !userWallet) return <NotLogged />;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center my-10 py-2 h-full">
      <div className="flex flex-col md:w-1/2 lg:items-end">
        {userCollections.length > ZERO ? (
          <div className="flex flex-col m-1 lg:w-4/5">
            <h1 className="text-5xl text-center my-10 ">Create your NFT</h1>
            {txProcessing ? (
              <TxProcessing />
            ) : (
              <>
                <div className="flex flex-col my-5">
                  <label htmlFor="nftFile">
                    Image, video, audio, modèle 3D:{" "}
                    <span className="font-semibold">{nftFile?.name}</span>
                  </label>
                  <label className="input-file w-fit my-2 flex justify-between items-center">
                    <span>Choose file</span>
                    <ImUpload2 className="mx-2" />
                    <input
                      type="file"
                      name="nftFIle"
                      onChange={async (e) => handleNftFile(e)}
                    />
                  </label>
                </div>
                <div className="flex flex-col my-5">
                  <label className="font-semibold" htmlFor="name">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input-form"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col my-5">
                  <label className="font-semibold" htmlFor="description">
                    Description:{" "}
                  </label>
                  <textarea
                    name="descrition"
                    className="input-form"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col my-5">
                  <label className="font-semibold" htmlFor="collection">
                    Collections available:{" "}
                  </label>
                  {userCollections.length > ZERO && (
                    <>
                      <select
                        className="select-form"
                        id="collection"
                        name="collection"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                      >
                        {userCollections.map((col) => (
                          <option
                            value={col.contractAddress}
                            key={col.contractAddress}
                          >
                            {col.name || col.description}
                          </option>
                        ))}
                      </select>
                      <span className="my-2">Avalanche</span>
                    </>
                  )}

                  <div className="flex flex-col my-5">
                    <label className="font-semibold" htmlFor="description">
                      Number of copies (series):{" "}
                    </label>
                    <input
                      className="input-form"
                      type="number"
                      min="1"
                      max="20"
                      value={nbSeries}
                      onChange={(e) =>
                        setNbSeries(Number.parseInt(e.target.value))
                      }
                    />
                    <span className="text-zinc-400 text-sm italic my-2">
                      Note: This number corresponds to the number of copies that
                      will be created for the same NFT. The number of copies can
                      go from 1 to 20
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-secondary my-4 self-start"
                    onClick={openCreateCollectionModal}
                  >
                    Create a new collection
                  </button>
                  <span className="text-zinc-400 text-sm italic">
                    Note: When creating your new collection, you will be able to
                    choose its name, its description, its logo and on which
                    blockchain it will be available there
                  </span>
                </div>

                <button
                  className="btn-primary self-center px-6 py-4 my-2 lg:my-10 w-full"
                  onClick={() => mintNFT()}
                >
                  Minter
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <span className="self-start my-10">
              No collection created, to create NFTs you must first create a
              collection
            </span>
            <button
              type="button"
              className="btn-secondary my-4 self-start"
              onClick={openCreateCollectionModal}
            >
              Create a new collection
            </button>
            <span className="text-zinc-400 text-sm italic">
              Note: When creating your new collection, you will be able to
              choose its name, its description, its logo and on which blockchain
              it is there will be available
            </span>
          </>
        )}
      </div>

      {/** PREVIEW */}
      <div className="flex flex-col justify-center items-center w-4/5 lg:w-2/5 my-28 h-4/5 mx-10 p-10 bg-gray-100 rounded-lg shadow-md">
        <NFTPreview nftPreview={nftPreview} />
      </div>

      {/** COLLECTION CREATION */}
      <CreateCollectionModal
        isOpen={modalIsOpen}
        closeModal={closeCreateCollectionModal}
        royalties={royalties}
        setRoyalties={setRoyalties}
        loadUserCollections={loadUserCollections}
      />
    </div>
  );
};

export default Mint;
