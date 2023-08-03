import React from "react";
import { useRouter } from "next/router";

const LandingRow = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-wrap justify-center w-full md:w-1/2">
      <h1 className="text-5xl font-semibold my-5">
        Découvrez, collectionner et vendez des NFTs extraordinaires
      </h1>
      <h3 className="text-2xl mb-10 text-indigo-800">
        NFT Marketplace
      </h3>

      <div className="flex items-center justify-center">
        <button
          className="btn-primary mx-5 py-5"
          onClick={async () => router.push("/market")}
        >
          Explorer
        </button>
        <button
          className="btn-primary-outlined py-5"
          onClick={async () => router.push("/mint")}
        >
          Créer
        </button>
      </div>

      <div className="flex justify-between px-2 md:px-10 lg:px-20 lg:justify-around my-20">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">50K+</span>
          <span>Artwork</span>
        </div>

        <div className="flex flex-col">
          <span className="text-4xl font-bold">30K+</span>
          <span>Artistes</span>
        </div>

        <div className="flex flex-col">
          <span className="text-4xl font-bold">10K+</span>
          <span>Enchères</span>
        </div>
      </div>
    </div>
  );
};

export default LandingRow;
