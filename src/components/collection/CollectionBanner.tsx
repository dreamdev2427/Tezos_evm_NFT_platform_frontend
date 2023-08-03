import React from "react";

const collection = {
  banner: "galerie.jpg",
};

interface ICollectionBanner {
  collectionImage: string;
}

const CollectionBanner = ({
  collectionImage,
}: ICollectionBanner): JSX.Element => {
  return (
    <div className="relative">
      <img
        className="h-96 rounded-md blur-[1.5px] "
        src={`/${collection.banner}`}
        alt="collectionBanner"
        width="100%"
      />
      <div className="shadow-2xl outline outline-1 w-fit outline-white absolute left-[1rem] top-[55%] lg:left-[3rem] rounded-md">
        <img
          src={`${collectionImage}`}
          width={200}
          height={300}
          alt="collection"
          className="object-cover h-52 w-40"
        />
      </div>
    </div>
  );
};

export default CollectionBanner;
