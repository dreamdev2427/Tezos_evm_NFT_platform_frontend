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

// Nous exportons une fonction asynchrone fetchData qui ne prend pas de paramètres
export const fetchData = () => {
  // Cette fonction renvoie une autre fonction asynchrone qui prend comme argument 'dispatch',
  // une fonction fournie par Redux pour envoyer des actions au store
  return async (dispatch) => {
    try {
      // Nous utilisons axios pour faire une requête GET vers l'API TzKT en utilisant
      // l'adresse du contrat spécifié dans notre fichier de configuration
      const response = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/data/keys`
      );
      // Nous faisons une autre requête GET pour récupérer les métadonnées du token
      const response1 = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${config.tokenAddress}/bigmaps/token_metadata/keys`
      );
      // Nous stockons les données renvoyées par les deux requêtes
      const d1 = response.data;
      const d2 = response1.data;
      // Nous initialisons un tableau vide pour stocker les données du token
      let tokenData = [];
      // Nous parcourons les données récupérées
      for (let i = 0; i < d1.length; i++) {
        // Nous transformons les bytes en caractères et récupérons la dernière partie du string
        const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);
        // Nous faisons une requête GET pour récupérer les données à partir de l'URL IPFS
        const res = await axios.get("https://ipfs.io/ipfs/" + s);
        // Nous stockons les données de la première requête et les données de la requête IPFS
        const l1 = d1[i].value;
        const l2 = res.data;
        // Nous ajoutons ces données à notre tableau tokenData
        tokenData[i] = {
          ...l1,
          ...l2,
          token_id: d2[i].value.token_id,
        };
      }
      // Nous affichons les données du token dans la console
      console.log(tokenData);
      // Nous envoyons les données du token au store Redux
      dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });
    } catch (e) {
      // Si une erreur se produit, nous l'affichons dans la console
      console.log(e);
    }
  };
};

// Exportation d'une fonction asynchrone 'mintNFT' qui prend en argument un objet contenant
// l'instance Tezos, la quantité (amount) et les métadonnées (metadata) du token à émettre
export const mintNFT = ({ Tezos, amount, metadata }) => {
  // La fonction retourne une autre fonction asynchrone qui prend 'dispatch' comme argument,
  // une fonction fournie par Redux pour envoyer des actions au store
  return async (dispatch) => {
    try {
      // Récupération du contrat à l'aide de l'adresse spécifiée dans le fichier de configuration
      const contract = await Tezos.wallet.at(config.contractAddress);
      let bytes = "";
      // Parcours des métadonnées et conversion de chaque caractère en une valeur hexadécimale
      for (var i = 0; i < metadata.length; i++) {
        bytes += metadata.charCodeAt(i).toString(16).slice(-4);
      }
      // Appel de la méthode 'mint' du contrat avec la quantité et les métadonnées converties en hexadécimal,
      // puis envoi de la transaction sur le réseau
      const op = await contract.methods.mint(amount, bytes).send();
      // Attente de la confirmation de la transaction
      await op.confirmation();
      // Récupération des données mises à jour du contrat à l'aide de la fonction 'fetchData'
      dispatch(fetchData());
    } catch (e) {
      // Si une erreur se produit, elle est affichée dans la console
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
