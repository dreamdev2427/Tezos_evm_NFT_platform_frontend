import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";
import { FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiHome } from "react-icons/hi";
import { AiFillShopping } from "react-icons/ai";
import {
  MdCreate,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { ImUser } from "react-icons/im";

import {
  getConnectedAddress,
  getConnectedNetwork,
  connectWallet,
  getAccountBalance,
} from "../../utils/wallet";

import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
  ColorMode,
} from "@airgap/beacon-sdk";

import {
  fetchData,
  fetchContractData,
  _walletConfig,
} from "../../config/redux/tezos_actions";

import {
  setAddress,
  setUserLogin,
  selectAccount,
  setUserLogout,
} from "../../config/redux/userAccount";
import {
  setBlockchainDapp,
  selectBlockchainDapp,
} from "../../config/redux/blockchainDapp";

import {
  connectTezosWallet,
  disconnecTezostWallet,
} from "../../config/redux/tezos_actions";

import { ellipseAddress } from "../../utils/ui";
import BlockchainIcon from "../BlockchainIcon";
import { TypeBlockchain } from "../../types";
import SignIn from "../../components/authentication/SignIn";
import SignUp from "../../components/authentication/SignUp";
import Disconnect from "../authentication/Disconnect";

export const Navbar = (): JSX.Element => {
  const dispatch = useDispatch();
  const blockchainDapp = useSelector(selectBlockchainDapp);
  const userAccount = useSelector(selectAccount);
  const tezosAccount = useSelector(
    (state) => state.tezosUser.walletConfig.user
  );
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://ghostnet.smartpy.io/")
  );
  const [tgWallet, setWallet] = useState(null);

  const navigate = useRouter();

  const [active, setActive] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<number | undefined>();
  const [balance, setBalance] = useState("");

  const [search, setSearch] = useState("");

  const [, , resetIsShowing] = useTimeoutFn(
    () => setUserArrowShowing(true),
    500
  );
  const [userArrowShowing, setUserArrowShowing] = useState(true);

  const [blockchain, setBlockchain] = useState<TypeBlockchain>(
    blockchainDapp ?? "Avalanche"
  );

  const [userExpanded, setUserExpanded] = useState(false);

  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchToSignUp = (): void => {
    setIsModalOpen(true);
    setIsSignIn(false);
    setIsSignUp(true);
  };

  const switchToSignIn = (): void => {
    setIsModalOpen(true);
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const signInUser = (): void => {
    setIsModalOpen(true);
    setIsSignIn(true);
  };

  const signUpUser = (): void => {
    setIsModalOpen(true);
    setIsSignUp(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setIsSignIn(false);
    setIsSignUp(false);
    setIsLogout(false);
  };

  const logoutUser = (): void => {
    setIsModalOpen(true);
    setIsLogout(true);
    setIsSignIn(false);
    setIsSignUp(false);
  };

  const loadTezosClient = async () => {
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
      _walletConfig({
        userAddress: userAddress,
        balance: balance.toNumber(),
      })(dispatch);
    }
    console.log("wallet_instance >>>> ", wallet_instance);
    setWallet(wallet_instance);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!tgWallet) {
          await loadTezosClient();
        }
      } catch (err) {
        setTimeout(() => loadTezosClient(), 1000);
      }
    })();
  }, [tgWallet]);

  useEffect(() => {
    if (Tezos) fetchData({ Tezos })(dispatch);
  }, [Tezos, dispatch]);

  const handleClick = (): void => {
    setActive(!active);
  };

  const isConnected = async (): Promise<void> => {
    const address = await getConnectedAddress();
    const chainIdTemporary = await getConnectedNetwork();
    const balanceTemporary = await getAccountBalance();

    if (address && blockchainDapp === "Avalanche") {
      dispatch(
        setAddress({
          address,
          chainIdTemporary,
          balanceTemporary,
        })
      );
      setAccount(address);
      setChainId(chainIdTemporary);
      setBalance(balanceTemporary);
    }
    if (blockchainDapp === "Tezos") {
      if (tezosAccount.userAddress === "") {
        setAccount(address);
      }
    }
  };

  const changeBlockchain = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newBlockchain = e.target.value as TypeBlockchain;
    dispatch(setBlockchainDapp(newBlockchain));
    setBlockchain(newBlockchain);
  };

  const handleUserAccount = (): void => {
    if (userAccount?.id) {
      navigate.push(`/account/${userAccount.id}`);
    } else {
      signInUser();
    }
  };

  useEffect(() => {
    /**
     * Listen wallet onChange
     */
    if (window.ethereum !== undefined) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        localStorage.removeItem("user-data");
        dispatch(setUserLogout());
        //  Check connected userId if equals user new account address
        window.location.reload();
      });
    }
  });

  useEffect(() => {
    isConnected();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      const dataToPersist = JSON.parse(userData);

      dispatch(setUserLogin(dataToPersist));
    }
  }, []);

  const handleTezosWallet = (event) => {
    if (
      tezosAccount.userAddress === "" ||
      !tezosAccount ||
      !tezosAccount?.userAddress
    ) {
      console.log("doing tezos wallet connection !");
      console.log("tgWallet >>> ", tgWallet);
      try {
        // Values you want to keep
        const keysToKeep = ["beacon:sdk_version", "beacon:sdk-secret-seed"];
        const preservedValues = {};

        // Save the values you want to keep
        keysToKeep.forEach((key) => {
          preservedValues[key] = localStorage.getItem(key);
        });

        console.log("clear storage !");
        // Clear all local storage
        localStorage.clear();

        // Restore the values you want to keep
        keysToKeep.forEach((key) => {
          localStorage.setItem(key, preservedValues[key]);
        });
        console.log("done clear!");
      } catch (error) {
        console.log(error);
      }
      console.log("do connect");
      setTimeout(() => {
        connectTezosWallet({ wallet: tgWallet, Tezos: Tezos })(dispatch);
      }, 1000);
    } else {
      disconnecTezostWallet({ wallet: tgWallet, setTezos: setTezos })(dispatch);
    }
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap text-white bg-zinc-900 py-10 px-5 sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <Link href="/home">
        <span className="inline-flex p-2 mr-4 font-extrabold text-sm xl:text-xl text-white cursor-pointer">
          NFT MARKETPLACE
        </span>
      </Link>

      <div className="hidden md:flex mx-4 flex-grow">
        <input
          type="search"
          className="text-sm outline outline-0 text-black w-4/5 rounded-lg py-2"
          placeholder={` Recherche...${chainId ?? chainId} chainID`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        className={`${
          active ? "" : "hidden"
        }   w-full lg:inline-flex lg:w-auto `}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          <Link href="/home">
            <div className="flex items-center mr-4">
              <HiHome />
              <span className="navbar-item">Accueil</span>
            </div>
          </Link>

          <Link href="/market">
            <div className="flex items-center mr-4">
              <AiFillShopping />
              <span className="navbar-item">Marketplace</span>
            </div>
          </Link>
          <Link href="/mint">
            <div className="flex items-center mr-4">
              <MdCreate />
              <span className="navbar-item">Création</span>
            </div>
          </Link>
          <div className="relative">
            <div className="flex items-center m-0">
              <div
                className="flex items-center"
                aria-hidden={true}
                onClick={handleUserAccount}
              >
                <ImUser />
                <span className="navbar-item">
                  {userAccount && userAccount.id
                    ? ellipseAddress(userAccount.email, 6)
                    : "Mon compte"}
                </span>
              </div>

              <Transition
                show={userArrowShowing}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
              >
                {userExpanded ? (
                  <MdKeyboardArrowUp
                    size={20}
                    className="cursor-pointer m-0"
                    onClick={() => {
                      setUserExpanded((prev) => !prev);
                      setUserArrowShowing(false);
                      resetIsShowing();
                    }}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={20}
                    className="cursor-pointer m-0"
                    onClick={() => {
                      setUserExpanded((prev) => !prev);
                      setUserArrowShowing(false);
                      resetIsShowing();
                    }}
                  />
                )}
              </Transition>
            </div>

            {userExpanded && (
              <div className="absolute bg-white text-zinc-900 rounded-lg shadow-lg">
                {userAccount && userAccount.id ? (
                  <button
                    className="hover:bg-zinc-100 w-full h-10 px-1"
                    onClick={logoutUser}
                  >
                    Déconnexion
                  </button>
                ) : (
                  <>
                    <button
                      className="hover:bg-zinc-100 w-full h-10"
                      onClick={signUpUser}
                    >
                      Inscription
                    </button>
                    <button
                      className="hover:bg-zinc-100 w-full h-10"
                      onClick={signInUser}
                    >
                      Connexion
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/**  SIGN IN*/}
          {isModalOpen && isSignIn && (
            <SignIn switchToSignUp={switchToSignUp} closeModal={closeModal} />
          )}

          {/**  SIGN UP */}
          {isModalOpen && isSignUp && (
            <SignUp switchToSignIn={switchToSignIn} closeModal={closeModal} />
          )}

          {/**  DISCONNECT */}
          {isModalOpen && isLogout && <Disconnect closeModal={closeModal} />}

          <span className="mx-2"> | </span>
          {blockchainDapp === "Avalanche" ? (
            account ? (
              <span>{ellipseAddress(account)}</span>
            ) : (
              <FaWallet
                className="text-white cursor-pointer mx-3"
                onClick={async () => connectWallet()}
              />
            )
          ) : tezosAccount.userAddress !== "" ? (
            <span>{ellipseAddress(tezosAccount.userAddress)}</span>
          ) : (
            <FaWallet
              className="text-white cursor-pointer mx-3"
              onClick={async (e) => handleTezosWallet(e)}
            />
          )}
          <div className="flex items-center ml-4 text-white">
            {balance ? Number.parseFloat(balance).toFixed(2) : "0"}{" "}
            <BlockchainIcon />
          </div>
        </div>
      </div>
      <div className="mx-2">
        <select
          className="select-form"
          name="blockchain"
          value={blockchain}
          onChange={(e) => changeBlockchain(e)}
        >
          <option value={"Avalanche"}>Avalanche</option>
          <option value={"Tezos"}>Tezos</option>
        </select>
      </div>

      <button
        className=" inline-flex p-3 hover:bg-sky-700 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
};
