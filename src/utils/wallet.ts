import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers, Signer, utils } from "ethers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

/**
 * Connection to the wallet with web3modal
 */
export const connectWallet = async (): Promise<
  [ethers.providers.JsonRpcSigner, string] | undefined
> => {
  const web3Modal = new Web3Modal({
    providerOptions,
  });

  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const accounts = await provider.listAccounts();
    const signer = provider.getSigner();

    if (!accounts[0]) {
      return;
    }

    return [signer, accounts[0]];
  } catch (err) {
    window.alert(
      "Connexion au wallet non aboutie ou connectez vous manuellement si vous utilisez Metamask depuis une extension"
    );
    return;
  }
};

/**
 * Get signer with Metamask
 * @returns
 */
export async function getSigner(): Promise<Signer | undefined> {
  if (window.ethereum === undefined) {
    alert("Get MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return signer as Signer;
}

/**
 * Check if Metamask wallet is connected
 * @returns
 */
export async function checkIfWalletIsConnected(): Promise<boolean> {
  if (window.ethereum !== undefined) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Connection to the wallet with Metamask
 * @returns
 */
export async function connect(): Promise<
  ethers.providers.JsonRpcSigner | undefined
> {
  if (window.ethereum === undefined) {
    alert("Get MetaMask!");
    return;
  }

  // window.ethereum.request({ method: "eth_requestAccounts" });

  const isConnected = await checkIfWalletIsConnected();

  if (isConnected) {
    alert("Already connected !");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  return signer;
}

/**
 * Get connected user first address
 * @returns
 */
export const getConnectedAddress = async (): Promise<string> => {
  if (window.ethereum !== undefined) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];

      return utils.getAddress(account) as string;
    }
    return "";
  }
  return "";
};

/**
 * Get connected network chain ID
 * @returns
 */
export const getConnectedNetwork = async (): Promise<number> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { chainId } = await provider.getNetwork();

  return chainId;
};

/**
 * Get first account balance
 * @returns
 */
export const getAccountBalance = async (): Promise<string> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const address = await getConnectedAddress();

  if (!address) return "0";

  const balance = await await provider.getBalance(address);

  return ethers.utils.formatEther(balance.toString());
};
