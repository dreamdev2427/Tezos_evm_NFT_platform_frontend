import React from "react";
import { useRouter } from "next/router";

const Footer = (): JSX.Element => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col lg:flex-row items-start lg:justify-around bg-zinc-900 text-white p-20 my-10">
      <button className="text-xl" onClick={async () => navigate.push("./home")}>
        NFT MARKETPLACE
      </button>
      <button className="text-xl" onClick={async () => navigate.push("./faq")}>
        FAQ
      </button>
      <button
        className="text-xl"
        onClick={async () => navigate.push("./about")}
      >
        A propos
      </button>
      <button
        className="text-xl"
        onClick={async () => navigate.push("./contact")}
      >
        Contact
      </button>
      <span className="text-xl">Avalanche - Tezos</span>
    </div>
  );
};

export default Footer;
