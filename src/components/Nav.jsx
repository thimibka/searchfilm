import React from "react";
import { useNavigate } from "react-router-dom";
export default function Nav({ searchQuery, onSearchChange, onSearchSubmit }) {
  const navigate = useNavigate();
  const menu = () => {
    navigate(`/`);
  };
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4">
      <button className="text-white text-2xl font-bold" onClick={menu}>
        Mon Application
      </button>
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
