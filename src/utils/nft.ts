import { Contract, Transaction } from "ethers";
import { marketAddress } from "../../cache/deploy";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { getSigner } from "./wallet";

/**
 * Display error message depending on error type
 * @param error
 */
export const displayErrorMessage = (error: any): void => {
  window.alert(error.message);
};

/**
 * Mint NFT in the user's account
 * @param metadata {string} - Metadata
 * @param royaltyPercentage {number} - Royalty percentage
 * @param contractAddress {string} - Collection address
 */
export const mint = async (
  metadata: string,
  royaltyPercentage: number,
  contractAddress: string
): Promise<void> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);

  await nftContract
    .mint(metadata, royaltyPercentage, contractAddress)
    .then((tx: Transaction) => {
      console.log(tx);
    })
    .catch((error: any) => {
      throw error;
    });
};

/** Get number of token owned by an owner in the token list by providing an INDEX */

export const tokenOfOwnerByIndex = async (
  ownerAddress: string,
  index: number,
  contractAddress: string
): Promise<string> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  const result = await nftContract.tokenOfOwnerByIndex(ownerAddress, index);
  return Number.parseInt(result).toString();
};

/**
 *  Returns the number of token (NFT) in the user's wallet by providing its address
 */
export const balanceOf = async (
  userAddress: string,
  contractAddress: string
): Promise<number> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  const result = await nftContract.balanceOf(userAddress);

  return result;
};

/**
 * Returns the total amount of tokens stored in one NFT contract
 */
export const totalSupply = async (contractAddress: string): Promise<number> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  const result = await nftContract.totalSupply();

  return result;
};

/**
 * Returns a tokenID by providing an index. The array is all the tokens stored in one NFT contract
 */
export const tokenByIndex = async (
  contractAddress: string,
  index: number
): Promise<number> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  const result = await nftContract.tokenByIndex(index);

  return result;
};

/**
 * Returns the token URI in the metadata linked to the token by providing its ID
 */
export const tokenURI = async (
  tokenID: number,
  contractAddress: string
): Promise<string> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  const result = await nftContract.tokenURI(tokenID);

  return result;
};

/**
 * Returns whether if the operator (market) is allowed to manage all of the assets of one user
 */
export const isApprovedForAll = async (
  userAddress: string,
  contractAddress: string
): Promise<boolean> => {
  const signer = await getSigner();
  const nftContract = new Contract(contractAddress, NFT.abi, signer);
  //operator address is marketplace contract address
  const result = await nftContract.isApprovedForAll(userAddress, marketAddress);

  return result;
};

/**
 * Fetch nft price if listed
 */
