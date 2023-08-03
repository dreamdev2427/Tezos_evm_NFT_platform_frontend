import { Signer } from "ethers";
// import axios from "axios";
import { collectionAddress } from "../../cache/deploy";
import { Collection, Collection__factory } from "../../typechain";
// import type { ICollection, ICollectionSC } from "../types";
import { getSigner } from "./wallet";

/**
 * Promise to wait until the collection created event is received
 * @param collectionContract {string} - Collection contract address
 */
export const newCollectionEvent = async (
  collectionContract: Collection
): Promise<string> =>
  new Promise(function (resolve) {
    collectionContract.on("CollectionCreatedEvent", (_, to) => {
      resolve(to);
    });
  });

/**
 * Create a new collection on the user's account
 */
export const createCollection = async (
  name: string,
  symbol: string,
  metadata: string
): Promise<string> => {
  const signer = (await getSigner()) as Signer;

  // For using typechain as Contract generates method during runtime
  const collectionContract = Collection__factory.connect(
    collectionAddress,
    signer
  );

  const response = await collectionContract
    .createCollection(name, symbol, metadata)
    .then(async () => {
      const createdContractAddress = await newCollectionEvent(
        collectionContract
      );

      return createdContractAddress;
    })
    .catch((error) => {
      throw error;
    });

  return response as string;
};

//COLLECTION

/**
 * Get all collections created on marketplace
 */
// export const getCollections = async (
//   startIndex: number
// ): Promise<ICollection[]> => {
//   const signer = (await getSigner()) as Signer;

//   const collectionContract = Collection__factory.connect(
//     collectionAddress,
//     signer
//   );

//   const result = await collectionContract.getCollectionsPaginated(startIndex);

//   if (result.length > 0) {
//     const collections = await Promise.all(
//       result[0].map(async (collection: ICollectionSC) => {
//         const meta = await axios.get(collection.metaDataHash);

//         const data: ICollection = {
//           image: meta.data.image,
//           description: meta.data.description,
//           name: meta.data.name,
//           contractAddress: collection.contractAddress,
//           creatorAddress: collection.creator,
//         };
//         return data;
//       })
//     );
//     return collections;
//   }
//   return [];
// };

// /**
//  * Get connected user's all collections
//  */
// export const getUserCollections = async (): Promise<ICollection[]> => {
//   const signer = (await getSigner()) as Signer;

//   const collectionContract = Collection__factory.connect(
//     collectionAddress,
//     signer
//   );

//   const result = await collectionContract.getUserCollections();
//   const collections = await Promise.all(
//     result.map(async (collection: ICollectionSC) => {
//       const meta = await axios.get(collection.metaDataHash);
//       const data: ICollection = {
//         image: meta.data.image,
//         description: meta.data.description,
//         contractAddress: collection.contractAddress,
//         creatorAddress: collection.creator,
//         name: meta.data.name,
//       };
//       return data;
//     })
//   );
//   return collections;
// };

// /**
//  * Get data info for one collection
//  * @param contractAddress
//  * @returns
//  */
// export const getOneCollectionInfo = async (
//   contractAddress: string
// ): Promise<ICollection | undefined> => {
//   const signer = (await getSigner()) as Signer;

//   const collectionContract = Collection__factory.connect(
//     collectionAddress,
//     signer
//   );
//   const collection: ICollectionSC =
//     await collectionContract.getOneCollectionInfo(contractAddress);

//   let col;
//   if (collection[0] === contractAddress) {
//     const meta = await axios.get(collection.metaDataHash);
//     const data: ICollection = {
//       image: meta.data.image,
//       description: meta.data.description,
//       contractAddress: collection.contractAddress,
//       creatorAddress: collection.creator,
//       name: meta.data.name,
//     };
//     col = data;
//   }

//   return col;
// };
