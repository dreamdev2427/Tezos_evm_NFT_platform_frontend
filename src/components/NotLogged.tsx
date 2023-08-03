import React from "react";

const NotLogged = (): JSX.Element => {
  return (
    <div className="h-screen w-full flex justify-center items-center m-3">
      <span className="text-sm lg:text-xl text-center font-semibold p-5 outline outline-1 rounded-md">
        Pas de compte/wallet connecté, veuillez vous authentifier
      </span>
    </div>
  );
};

export default NotLogged;
