import React from "react";
import { GrTransaction } from "react-icons/gr";
import BlockchainIcon from "../BlockchainIcon";
import HeadingWithIcon from "../layout/HeadingWithIcon";

const NFTHistoric = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start">
      <div className="w-full">
        <div className="">
          <div className="flex items-center justify-between">
            <HeadingWithIcon
              headingText="Historique des transactions"
              Icon={<GrTransaction size={28} />}
            />
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Trier par:</p>
              <select
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option className="text-sm text-indigo-800">Récents</option>
                <option className="text-sm text-indigo-800">Anciens</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 max-h-96 overflow-y-scroll">
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="font-bold text-center">
                <td>Type transaction</td>
                <td>Montant</td>
                <td>Date</td>
                <td>De</td>
                <td>Vers</td>
                <td>Voir</td>
              </thead>
              <tbody>
                {Array.from({ length: 20 }).map((_, index) => (
                  <tr
                    className="focus:outline-none h-16 border border-gray-100 rounded"
                    key={index}
                  >
                    {/**  TYPE OF EVENT */}
                    <td className="pl-24">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="7.50004"
                            cy="7.49967"
                            r="1.66667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                        </svg>
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          Transfert
                        </p>
                      </div>
                    </td>

                    {/**  AMOUNT INVOLVED */}
                    <td className="">
                      <div className="flex items-center pl-5">
                        <div className="flex items-center">
                          <p className="text-base font-medium leading-none text-gray-700 mr-2">
                            {20 + index}
                          </p>
                          <BlockchainIcon />
                        </div>
                      </div>
                    </td>

                    {/**  DATE  */}
                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          17/06/2022
                        </p>
                      </div>
                    </td>

                    {/**  SENDER */}
                    <td className="pl-5">
                      <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                        0xd9E3b8Da016101eA5Adf196dAF3384c357eF5788
                      </button>
                    </td>

                    {/**  RECEIVER */}
                    <td className="pl-4">
                      <button className="focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 text-sm leading-none text-sky-600 py-3 px-5 bg-sky-100 rounded hover:bg-sky-200 focus:outline-none">
                        0x5280D083A543378B73b8397CCE35965242341759
                      </button>
                    </td>

                    {/**  DETAIL */}
                    <td>
                      <div className="relative px-5 pt-2">
                        <button className="focus:ring-2 rounded-md focus:outline-none">
                          <svg
                            className="dropbtn"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                              stroke="#9CA3AF"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                              stroke="#9CA3AF"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                              stroke="#9CA3AF"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </button>
                        <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                          <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Edit</p>
                          </div>
                          <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Delete</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTHistoric;
