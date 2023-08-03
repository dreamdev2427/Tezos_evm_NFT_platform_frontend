import React from "react";

const MarketBanner = (): JSX.Element => {
  return (
    <div className="relative w-full">
      <h1 className="absolute text-md text-white left-8 lg:text-5xl 2xl:text-7xl top-24 lg:top-44 ">
        Explorer les <br /> collections
      </h1>

      <img
        src="./market_cover.jpg"
        alt="market_cover"
        className="shadow-lg rounded-3xl my-10 w-full"
      />
    </div>
  );
};

export default MarketBanner;
