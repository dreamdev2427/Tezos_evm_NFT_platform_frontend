import Slider from "rc-slider";
import { useState } from "react";

const ActionsSider = (): JSX.Element => {
  const [filterPrice, setFilterPrice] = useState(0.0);

  return (
    <div className="flex flex-col items-start">
      <div className="my-2 w-full">
        <label className="font-bold text-zinc-700" htmlFor="filterPrice">
          Range du prix
        </label>

        <Slider
          value={filterPrice}
          onChange={(value) => setFilterPrice(value)}
          max={1000}
          step={0.5}
        />
        <span>{filterPrice} AVAX </span>
      </div>

      <div className="my-2">
        <span className="font-bold text-zinc-700">Couleur </span>
      </div>

      <div className="my-2">
        <span className="font-bold text-zinc-700">Artiste </span>
      </div>

      <div className="my-2">
        <span className="font-bold text-zinc-700">Listé </span>
      </div>
    </div>
  );
};

export default ActionsSider;
