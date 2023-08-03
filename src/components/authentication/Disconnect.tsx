import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUserLogout } from "../../config/redux/userAccount";

const Disconnect = ({ closeModal }): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  /**
   * Logout user
   */
  const logout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    dispatch(setUserLogout());

    localStorage.removeItem("user-data");

    closeModal();

    navigate.push("/");

    alert("Déconnexion réussie");
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
            <div className="py-6 px-6 lg:px-8 flex flex-col items-center justify-center">
              <h3 className="my-6 text-xlfont-bold text-center text-zinc-900">
                Etes vous sur de vouloir vous déconnecter ?
              </h3>

              <button
                type="submit"
                className="btn-secondary self-center"
                onClick={(event) => logout(event)}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disconnect;
