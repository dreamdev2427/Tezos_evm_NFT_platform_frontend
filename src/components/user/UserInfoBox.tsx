import React from "react";
import { useSelector } from "react-redux";
import { selectAccount, selectWallet } from "../../config/redux/userAccount";
import { BLOCK_EXPLORER_LINK } from "../../utils";
import BlockchainIcon from "../BlockchainIcon";
import NotLogged from "../NotLogged";

const UserInfoBox = (): JSX.Element => {
  const userWallet = useSelector(selectWallet);
  const userAccount = useSelector(selectAccount);

  if (!userWallet) return <NotLogged />;

  return (
    <div className="flex flex-col items-center m-3 rounded-xl outline outline-3 outline-gray-300 p-5 mt-10 relative">
      <img
        className="object-cover w-20 h-20 rounded-full absolute -top-6"
        src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt="profile"
      />

      <div className="flex items-center mt-10">
        <span className="mr-2 text-xl text-zinc-900">
          <span className="text-gray-600">Solde:</span>{" "}
          {Number.parseFloat(userWallet.balanceTemporary).toFixed(4)}
        </span>
        <BlockchainIcon />
      </div>
      <span className="text-zinc-900">
        <span className="text-gray-600">Adresse: </span>
        <a href={`${BLOCK_EXPLORER_LINK}${userWallet.address}`}>
          {userWallet.address}
        </a>
      </span>
      {userAccount && (
        <span>
          Connecté en tant que{" "}
          <span className="font-bold">{userAccount.email}</span>{" "}
        </span>
      )}
    </div>
  );
};

export default UserInfoBox;
