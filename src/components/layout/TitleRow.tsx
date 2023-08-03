import React from "react";

interface ITitleRowProps {
  title: string;
  infoItem: React.ReactNode;
  subTitle?: string;
}

const TitleRow = ({
  title,
  subTitle,
  infoItem,
}: ITitleRowProps): JSX.Element => {
  return (
    <div className="flex flex-col items-start w-full my-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-gray-900">{title}</h1>
        {infoItem}
      </div>

      {subTitle && (
        <span className="text-indigo-800 text-xl mt-3">{subTitle}</span>
      )}
    </div>
  );
};

export default TitleRow;
