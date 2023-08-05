import NFTCard from "../components/nft/NFTCard";
import LandingRow from "../components/layout/LandingRow";
import Market from "./market";
import { useDispatch } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex m-10 w-fit">
        {/**  LANDING ROW */}
        <LandingRow />

        <div className="justify-center p-5 w-6/12 hidden md:flex">
          <NFTCard
            tokenId="6633"
            collectionAddress="template"
            creatorAddress="template"
            className="shadow-2xl"
            isListed={false}
            metadata={{
              image: "/joconde.jpg",
              name: "Joconde",
              description: "Joconde description",
            }}
          />
        </div>
      </div>

      <div className="divider"></div>

      {/**  DISPLAY MARKET ON LANDING PAGE */}
      <Market />
    </div>
  );
};

export default Home;
