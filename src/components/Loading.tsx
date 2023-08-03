/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState } from "react";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT } from "../utils";

const getNbItems = (window: Window): number => {
  if (window.innerWidth < SM_BREAKPOINT) {
    return 1;
  } else if (
    window.innerWidth >= SM_BREAKPOINT &&
    window.innerWidth < MD_BREAKPOINT
  ) {
    return 1;
  } else if (
    window.innerWidth >= MD_BREAKPOINT &&
    window.innerWidth < LG_BREAKPOINT
  ) {
    return 2;
  } else if (window.innerWidth > LG_BREAKPOINT) {
    return 3;
  } else {
    return 1;
  }
};

const Loading = (): JSX.Element => {
  const [nbItems, setNbItems] = useState(1);
  const handleResize = (window: Window): void => {
    setNbItems(getNbItems(window));
  };

  useEffect(() => {
    //@ts-ignore
    window.addEventListener("resize", handleResize(window));
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-content-center overflow-hidden">
      {Array.from({ length: nbItems }).map((item, index) => (
        <div className="flex justify-center p-3" key={index}>
          <div className="w-4/5 bg-white rounded shadow-2xl">
            <div className="h-64 bg-gray-200 rounded-tr rounded-tl animate-pulse" />

            <div className="p-5">
              <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>

              <div className="grid grid-cols-4 gap-1">
                <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

                <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
