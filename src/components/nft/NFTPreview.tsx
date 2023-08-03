import React from "react";

interface INFTPreviewProps {
  nftPreview: string;
}

const NFTPreview = ({ nftPreview }: INFTPreviewProps): JSX.Element => {
  return (
    <div className="flex flex-1 items-center">
      {nftPreview ? (
        <img src={nftPreview} alt="preview" />
      ) : (
        <div className="flex flex-col items-center justify-center h-fit w-fit p-20 rounded-lg bg-gray-200">
          <span>Display vide</span>
        </div>
      )}
    </div>
  );
};

export default NFTPreview;
