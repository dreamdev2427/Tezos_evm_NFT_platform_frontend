import React from "react";
import { ITopCollection } from "../../types";
import TopCollectionRow from "./TopCollectionRow";

const topCollections: ITopCollection[] = [
  {
    image: "/1915_antonia.jpg",
    name: "Antonia 1915",
    minimumPrice: 17.15,
  },
  {
    image: "/1915_alice.jpg",
    name: "Alice 1915",
    minimumPrice: 89.15,
  },
  {
    image: "/1915_madame-pompadour.jpg",
    name: "Madame Pompadour",
    minimumPrice: 56.15,
  },
  {
    image: "/1915_a-head.jpg",
    name: "A Head 1915",
    minimumPrice: 17.15,
  },
  {
    image: "/dali_2.jpg",
    name: "Dali",
    minimumPrice: 89.15,
  },
  {
    image: "/1909_jean-alexandre.jpg",
    name: "Madame Pompadour",
    minimumPrice: 56.15,
  },
  {
    image: "/1915_leon-indenbaum.jpg",
    name: "Leon-indenbaum 1915",
    minimumPrice: 10.11,
  },
  {
    image: "/1916_almaisa.jpg",
    name: "Almaisa 1916",
    minimumPrice: 89.15,
  },
  {
    image: "/1914_beatrice-hastings.jpg",
    name: "Beatrice Hastings",
    minimumPrice: 86.15,
  },
];

const TopCollectionsTable = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 place-items-center my-6">
      {topCollections.map(({ image, minimumPrice, name }, index) => {
        return (
          <TopCollectionRow
            key={image}
            image={image}
            index={index + 1}
            minimumPrice={minimumPrice}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default TopCollectionsTable;
