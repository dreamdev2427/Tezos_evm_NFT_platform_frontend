import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../../config/redux/userAccount";
import axios from "../../config/axios";
import TxProcessing from "../TxProcessing";

const SignUp = ({ switchToSignIn, closeModal }): JSX.Element => {
  const userWallet = useSelector(selectWallet);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isArtist, setIsArtist] = useState(false);

  const [addressAlreadyRegistered, setAddressAlreadyRegistered] =
    useState(true);

  const [loading, setLoading] = useState(false);
  const tezosAccount = useSelector(
    (state) => state.tezosUser.walletConfig.user
  );

  /**
   * Create a new user
   */
  const createAccount = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !birthDate) {
      alert("Un ou plusieurs champs n'est pas rempli");
      return;
    }

    if (!userWallet) {
      alert("Pas d'utilisateur connecté");
      return;
    }

    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user/create`, {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        isArtist,
        evmaddress: userWallet?.address || Date.now.toString(),
        tezosaddress: tezosAccount?.userAddress || Date.now.toString() + 1
      })
      .then(() => {
        alert("Compte crée ! \n You're registered.");
        closeModal();
      })
      .catch((error) => {
        alert(error.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  /**
   * Check if blockchain address already registered
   */
  const checkAddressIsRegistered = async (): Promise<void> => {
    if (!userWallet) {
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user/checkAddress`, {
        params: {
          blockchainAddress: userWallet.address,
        },
      })
      .then((response) => {
        setAddressAlreadyRegistered(response.data);
      });
  };

  useEffect(() => {
    if (userWallet) checkAddressIsRegistered();
  }, [userWallet]);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-opacity-75 bg-gray-800 z-40"
        onClick={closeModal}
        aria-hidden={true}
      />
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 xl:w-1/2 z-50 transition ease-in-out lg:max-h-[42rem] overflow-y-scroll">
        <div className="relative py-2 w-full h-full px-6 md:h-auto">
          <div className="relative bg-white rounded-lg px-32 shadow">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div className="py-4 px-4 lg:px-8">
              <h3 className="my-6 text-xlfont-bold text-center text-zinc-900">
                Inscription
              </h3>

              {userWallet !== undefined ? (
                <>
                  <span className="flex flex-col text-zinc-900 bg-gray-100 p-3 rounded-md self-center">
                    <span className="font-bold self-center text-sm">
                      Addresse
                    </span>
                    <span className="text-sm w-fit self-center">
                      {addressAlreadyRegistered
                        ? "Un compte est déjà associé à cette addresse"
                        : userWallet.address}
                    </span>
                  </span>
                  {loading ? (
                    <TxProcessing />
                  ) : (
                    <form className="space-y-6 mt-5" action="#">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-zinc-900 input-label"
                        >
                          Votre prénom
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="input-form w-full"
                          placeholder="nom"
                          required
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-zinc-900 input-label"
                        >
                          Votre nom
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="input-form w-full"
                          placeholder="Lefievre"
                          required
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-zinc-900 input-label"
                        >
                          Votre mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="input-form w-full"
                          placeholder="mail@company.com"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-zinc-900 input-label"
                        >
                          Votre mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="input-form w-full"
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="birthDate"
                          className="block mb-2 text-zinc-900 input-label"
                        >
                          Votre date de naissance
                        </label>
                        <input
                          type="date"
                          name="birthDate"
                          id="birthDate"
                          placeholder="01/01/2000"
                          className="input-form w-full"
                          required
                          value={birthDate}
                          onChange={(event) => setBirthDate(event.target.value)}
                        />
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="isArtist"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-50 rounded cursor-pointer border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            required
                            checked={isArtist}
                            onChange={() => setIsArtist((prev) => !prev)}
                          />
                        </div>
                        <label
                          htmlFor="isArtist"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Je suis un artiste
                        </label>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 bg-gray-50 rounded border cursor-pointer border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Se souvenir de moi
                          </label>
                        </div>
                        <a
                          href="https://www.google.com"
                          className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                          Mot de passe perdu ?
                        </a>
                      </div>

                      <div className="w-full flex justify-center">
                        <button
                          type="submit"
                          className="btn-secondary"
                          onClick={(event) => createAccount(event)}
                        >
                          S'inscrire
                        </button>
                      </div>

                      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Déjà un compte?{" "}
                        <button
                          className="text-blue-700 hover:underline dark:text-blue-500"
                          onClick={switchToSignIn}
                        >
                          Se connecter
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="flex flex-col">
                  <span className="text-zinc-900 self-center">
                    Pas de wallet connecté
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
