import React from "react";
import { useNavigate } from "react-router-dom";
export default function Nav({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  navigateAndClearSearch,
}) {
  const navigate = useNavigate();
  const menu = () => {
    navigate(`/`);
  };
  const affiche = () => {
    navigate(`/affiche`);
  };
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4">
      <div className="flex flex-col gap-2 ">
        <button
          className="text-white text-2xl font-bold border border-white p-2 rounded"
          onClick={() => navigateAndClearSearch("/")}
        >
          Menu
        </button>
        <button
          className="text-white text-2xl font-bold border border-white p-2 rounded"
          onClick={() => navigateAndClearSearch("/affiche")}
        >
          Catégorie
        </button>
      </div>
      
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={onSearchChange}
          className="px-2 py-1 border border-gray-600 rounded text-gray-800 focus:outline-none"
        />
      </form>
    </div>
  );
}
