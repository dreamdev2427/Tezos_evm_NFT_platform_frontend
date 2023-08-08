import { TezosToolkit } from "@taquito/taquito";
import { NetworkType } from "@airgap/beacon-sdk";
import config from "./tezos_config";
import axios from "axios";

export const connectTezosWallet = ({ wallet, Tezos }) => {
  return async (dispatch) => {
    try {
      var payload = {};

      console.log("Tezos >>>> ", Tezos);
      Tezos.setWalletProvider(wallet);
      console.log("wallet >>>> ", wallet);
      const activeAccount = await wallet.client.getActiveAccount();
      console.log("activeAccount >>>> ", activeAccount);
      console.log(activeAccount);
      if (!activeAccount) {
        await wallet.requestPermissions({
          network: {
            type: NetworkType.GHOSTNET,
            rpcUrl: "https://ghostnet.smartpy.io/",
          },
        });
      }
      const userAddress = await wallet.getPKH();
      console.log(userAddress);
      const balance = await Tezos.tz.getBalance(userAddress);
      console.log(balance);
      payload.user = {
        userAddress: userAddress,
        balance: balance.toNumber(),
      };
      dispatch(_walletConfig(payload.user));
    } catch (error) {
      console.log(error);
      dispatch({
        type: "CONNECT_WALLET_ERROR",
      });
    }
  };
};

export const _walletConfig = (user) => {
  return {
    type: "CONNECT_WALLET",
    user,
  };
};

export const disconnecTezostWallet = ({ wallet, setTezos }) => {
  return async (dispatch) => {
    setTezos(new TezosToolkit("https://ghostnet.smartpy.io/"));

    dispatch({
      type: "DISCONNECT_WALLET",
    });

    if (wallet) {
      await wallet.clearActiveAccount();
    }
  };
};
export const fetchContractData = ({ Tezos }) => {
  return async (dispatch, getState) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const storage = await contract.storage();
      dispatch({ type: "SET_VALUE", payload: storage.toNumber() });
    } catch (e) {
      //dispatch
      console.log(e);
    }
  };
};

export const incrementData = ({ Tezos }) => {
  return async (dispatch, getState) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const op = await contract.methods.increment(1).send();
      await op.confirmation();
      const newStorage = await contract.storage();
      dispatch({ type: "SET_VALUE", payload: newStorage.toNumber() });
    } catch (e) {
      console.log(e);
    }
  };
};

export const decrementData = ({ Tezos }) => {
  return async (dispatch, getState) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const op = await contract.methods.decrement(1).send();
      await op.confirmation();
      const newStorage = await contract.storage();
      dispatch({ type: "SET_VALUE", payload: newStorage.toNumber() });
    } catch (e) {
      console.log(e);
    }
  };
};

export const hex2buf = (hex) => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString("utf8");
}

// We export an asynchronous fetchData function that takes no parameters
export const fetchData = () => {
  // This function returns another asynchronous function which takes as argument 'dispatch',
  // a function provided by Redux to send actions to the store
  return async (dispatch) => {
    try {
      // We use axios to make a GET request to the TzKT API using
      // the address of the contract specified in our configuration file
      const response = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/data/keys`
      );
      // We make another GET request to retrieve the token metadata
      const response1 = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${config.tokenAddress}/bigmaps/token_metadata/keys`
      );
      // We store the data returned by the two queries
      const d1 = response.data;
      const d2 = response1.data;
      // We initialize an empty array to store the token data
      let tokenData = [];
      // We browse the retrieved data
      for (let i = 0; i < d1.length; i++) {
       // We transform the bytes into characters and get the last part of the string
        const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);
        // We make a GET request to retrieve the data from the IPFS URL
        const res = await axios.get("https://ipfs.io/ipfs/" + s);
        // We store the data from the first request and the data from the IPFS request
        const l1 = d1[i].value;
        const l2 = res.data;
        // We add this data to our tokenData array
        tokenData[i] = {
          ...l1,
          ...l2,
          token_id: d2[i].value.token_id,
        };
      }
      // We display the token data in the console
      console.log(tokenData);
      // We send the token data to the Redux store
      dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });
    } catch (e) {
      // If an error occurs, we display it in the console
      console.log(e);
    }
  };
};

// Export an asynchronous function 'mintNFT' which takes as argument an object containing
// the Tezos instance, the quantity (amount) and the metadata (metadata) of the token to be issued
export const mintTezosNFT = ({ Tezos, amount, metadata, data }) => {
  // The function returns another asynchronous function that takes 'dispatch' as an argument,
  // a function provided by Redux to send actions to the store
  return async (dispatch) => {
    try {
      // Retrieve the contract using the address specified in the configuration file
      const contract = await Tezos.wallet.at(config.contractAddress);
      let bytes = "";
      // Traverse the metadata and convert each character to a hexadecimal value
      for (var i = 0; i < metadata.length; i++) {
        bytes += metadata.charCodeAt(i).toString(16).slice(-4);
      }
      // Call of the 'mint' method of the contract with the quantity and the metadata converted into hexadecimal,
      // then send the transaction on the network
      const op = await contract.methods.mint(amount, bytes).send();
      // Wait for transaction confirmation
      await op.confirmation();
      window.alert("Succeed in minting!");
      
        //STORE TO THE DB
        await axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/nft/`, { ...data })
          .then(() => {
          })
          .catch((error) => window.alert(error.response?.data?.error))

      // Fetch updated contract data using 'fetchData' function
      dispatch(fetchData());
    } catch (e) {
      // If an error occurs, it is displayed in the console
      console.log(e);
    }
  };
};

export const collectNFT = ({ Tezos, amount, id }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const op = await contract.methods
        .collect(id)
        .send({ mutez: true, amount: amount });
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};

export const upvoteNFT = ({ Tezos, id }) => {
  return async (dispatch) => {
    try {
      const contract = await Tezos.wallet.at(config.contractAddress);

      const op = await contract.methods.upvoter(id).send();
      await op.confirmation();
      dispatch(fetchData());
    } catch (e) {
      console.log(e);
    }
  };
};
