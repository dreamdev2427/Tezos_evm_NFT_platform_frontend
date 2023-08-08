import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserLogin,
  selectAccount,
  selectWallet,
} from "../../config/redux/userAccount";
import axios from "../../config/axios";

const SignIn = ({ switchToSignUp, closeModal }): JSX.Element => {
  const userAccount = useSelector(selectAccount);
  const userWallet = useSelector(selectWallet);

  const [email, setEmail] = useState(userAccount?.email ?? "");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useRouter();

  /**
   * Login user
   */
  const loginAccount = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("user-data", JSON.stringify(response.data)); //  Set data inside browser storage
        dispatch(
          setUserLogin({
            id: response.data.id,
            email: response.data.email,
            authToken: response.data.authToken,
          })
        );
        closeModal();
        navigate.reload();
        alert(`Bienvenue ${email} !`);
      })
      .catch((error) => window.alert(error.response.data.error));
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-opacity-75 bg-gray-800 z-40"
        onClick={closeModal}
        aria-hidden={true}
      />
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 xl:w-1/2 z-50 transition ease-in-out">
        <div className="relative p-4 w-full  h-full px-10 md:h-auto">
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
            <div className="py-6 px-6 lg:px-8 flex flex-col items-center">
              <h3 className="my-6 text-xlfont-bold text-center text-zinc-900">
                Connexion
              </h3>
              {userWallet ? (
                <form className="space-y-6" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-zinc-900">
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
                      className="block mb-2 text-zinc-900"
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
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
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
                      onClick={(event) => loginAccount(event)}
                    >
                      Continuer
                    </button>
                  </div>

                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Pas encore de compte?{" "}
                    <button
                      className="text-blue-700 hover:underline dark:text-blue-500"
                      onClick={switchToSignUp}
                    >
                      Créer un compte
                    </button>
                  </div>
                </form>
              ) : (
                <span className="text-zinc-900">
                  Connectez-vous à votre wallet d'abord
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
