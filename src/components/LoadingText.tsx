import React from "react";

const LoadingText = (): JSX.Element => {
  return (
    <div className="w-4/5 bg-white rounded shadow-2xl">
      <div className="p-5">
        <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>

        <div className="grid grid-cols-4 gap-1">
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingText;
