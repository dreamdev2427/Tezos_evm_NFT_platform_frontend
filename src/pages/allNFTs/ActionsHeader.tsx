import React from "react";

interface IActionHeaderProps {
  searchToken: string;
  setSearchToken: (token: string) => void;
}

const ActionsHeader = ({
  searchToken,
  setSearchToken,
}: IActionHeaderProps): JSX.Element => {
  return (
    <div className="flex justify-between mb-3">
      <input
        type="search"
        placeholder="Rechercher un NFT"
        name="searchNFT"
        className="outline outline-2 outline-gray-300 p-4 flex-grow mr-3 rounded-lg"
        value={searchToken}
        onChange={(e) => setSearchToken(e.target.value)}
      />
      <button className="btn-primary mx-2 py-2 text-lg">Rechercher</button>
      <select className="outline outline-2 outline-gray-300 p-4 rounded-lg">
        <option>Prix: Plus bas au plus haut</option>
        <option>Prix: Plus bas au plus haut</option>
        <option>Prix: Plus bas au plus haut</option>
        <option>Prix: Plus bas au plus haut</option>
      </select>
    </div>
  );
};

export default ActionsHeader;
