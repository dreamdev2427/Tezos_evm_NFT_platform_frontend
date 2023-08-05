import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Compressor from "compressorjs";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useSelector } from "react-redux";
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

const client = ipfsHttpClient({
  protocol: "https",
  host: "ipfs.infura.io",
  port: 5001,
  apiPath: "/api/v0",
});

const Mint = (): JSX.Element => {
  const userWallet = useSelector(selectWallet);
  const userAccount = useSelector(selectAccount);

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
    const file = e.target.files[0];

    setNftPreview(URL.createObjectURL(file));
    setNftFile(file);

    const returnedFile = await compressFile(file);

    try {
      const added = await client.add(returnedFile, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `${process.env.NEXT_PUBLIC_IPFS_INFURA_ENDPOINT}${added.path}`;
      setIpfsFile(url);
    } catch (error) {
      window.alert(`Error uploading file : ${error}`);
    }
  };

  /**
   * Store the new NFT to the database
   * @param formData {FormData}
   */
  const mintToBdd = async (formData: FormData): Promise<void> => {
    //STORE TO THE DB
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/nft/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => {
        window.alert("NFT minté !");
        setNftFile(undefined);
        setDescription("");
        setName("");
        setNftPreview("");

        loadUserCollections(); //nbNfts incremented and in case user mint twice in a row
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setTxProcessing(false));
  };

  /**
   * Create an new NFT
   */
  const mintNFT = async (e): Promise<void> => {
    e.preventDefault();

    if (!nftFile || !collection) {
      window.alert("Un des champs est manquant !");
      return;
    }

    if (!userAccount || !userWallet) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    try {
      const ipfsData = JSON.stringify({
        name,
        description,
        image: ipfsFile,
      });
      const added = await client.add(ipfsData);
      const url = `${process.env.NEXT_PUBLIC_IPFS_INFURA_ENDPOINT}${added.path}`;

      setTxProcessing(true);

      //  Find selected collection and increment its token id
      const tokenId =
        userCollections.find((col) => col.contractAddress === collection)
          ?.nbNfts ?? 0;

      const royaltiesCollection =
        userCollections.find((col) => col.contractAddress === collection)
          ?.royalties ?? 0;

      //  STORE TO THE BLOCKCHAIN
      await mint(url, Math.ceil(royaltiesCollection), collection)
        .then(async () => {
          const formData = new FormData();

          const data = {
            image: ipfsFile,
            tokenId: tokenId + 1,
            collectionAddress: collection,
            userId: userAccount.id,
            description,
            name,
          };

          formData.append("file", nftFile);
          formData.append("data", JSON.stringify(data));

          await mintToBdd(formData);
        })
        .finally(() => setTxProcessing(false));
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
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/evm/collection/user`,
        {
          params: {
            userId: userAccount.id,
          },
        }
      )
      .then((response) => {
        setUserCollections(response.data);
      })
      .catch((error) => window.alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userWallet && userAccount) {
      loadUserCollections();
    }
  }, [userWallet, userAccount]);

  useEffect(() => {
    if (userCollections?.length > ZERO) {
      setCollection(userCollections[0].contractAddress);
    }
  }, [userCollections, txProcessing]);

  if (loading) return <Loading />;

  if (!userAccount || !userWallet) return <NotLogged />;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center my-10 py-2 h-full">
      <div className="flex flex-col md:w-1/2 lg:items-end">
        {userCollections.length > ZERO ? (
          <form className="flex flex-col m-1 lg:w-4/5" onSubmit={mintNFT}>
            {/**  FORM CREATE NFT */}
            <h1 className="text-5xl text-center my-10 ">Créez votre NFT</h1>
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
                    <span>Choisir un fichier</span>
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
                    Nom:{" "}
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
                    Collections disponibles:{" "}
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
                      Nombre d'exemplaire (séries):{" "}
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
                      Note: Ce nombre correspond au nombre d'exemplaires qui
                      sera crée pour un même NFT. Le nombre d'exemplaires peut
                      aller de 1 à 20
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-secondary my-4 self-start"
                    onClick={openCreateCollectionModal}
                  >
                    Créer une nouvelle collection
                  </button>
                  <span className="text-zinc-400 text-sm italic">
                    Note: En créant votre nouvelle collection, vous pourrez
                    choisir son nom, sa description, son logo et sur quelle
                    blockchain elle y sera disponible
                  </span>
                </div>

                <button
                  className="btn-primary self-center px-6 py-4 my-2 lg:my-10 w-full"
                  type="submit"
                >
                  Minter
                </button>
              </>
            )}
          </form>
        ) : (
          <>
            <span className="self-start my-10">
              Aucune collection créée, pour créer des NFTs il faut au préalable
              créer une collection
            </span>
            <button
              type="button"
              className="btn-secondary my-4 self-start"
              onClick={openCreateCollectionModal}
            >
              Créer une nouvelle collection
            </button>
            <span className="text-zinc-400 text-sm italic">
              Note: En créant votre nouvelle collection, vous pourrez choisir
              son nom, sa description, son logo et sur quelle blockchain elle y
              sera disponible
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
