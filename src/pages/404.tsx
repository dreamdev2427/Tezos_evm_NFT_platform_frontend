import React from "react";
import { useRouter } from "next/router";

const NotFound = (): JSX.Element => {
  const navigate = useRouter();

  return (
    <>
      <div>La page que vous indiqué n'existe pas | Retour à l'accueil</div>
      <button
        className="btn-primary"
        onClick={async () => navigate.push("./home")}
      >
        Retour à l'accueil
      </button>
    </>
  );
};

export default NotFound;
