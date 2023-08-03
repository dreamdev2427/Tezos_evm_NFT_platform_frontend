import React from "react";
import { useSelector } from "react-redux";
import { selectBlockchainDapp } from "../config/redux/blockchainDapp";

//  Display current blockchain icon of the DApp

const BlockchainIcon = (): JSX.Element => {
  const blockchainDapp = useSelector(selectBlockchainDapp);

  return (
    <img
      className="mx-1"
      src={blockchainDapp === "Avalanche" ? "/avax.png" : "/tezos.png"}
      alt="avax"
      width={20}
      height={20}
    />
  );
};

export default BlockchainIcon;
