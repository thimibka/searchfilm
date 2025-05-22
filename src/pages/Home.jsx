import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ searchQuery }) {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDliZjk3MjViYTcyYWI4Mzk0NzIxODBmY2Q4M2EwZSIsInN1YiI6IjY1ZjM0ZWRlNmRlYTNhMDEyZjc4NTY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDsTVi9bnC5wV_30oRkMQwXqVGnUDqSYYapGfK5iQFY";

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        searchQuery.trim() === ""
          ? `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${currentPage}`
          : `https://api.themoviedb.org/3/search/movie?language=fr-FR&query=${searchQuery}&page=${currentPage}&include_adult=false`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        });
        const data = await response.json();
        setApiData(data.results || []);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Erreur API :", error);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto p-4">
        {apiData.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col bg-gray-900 text-white rounded overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
            <Link to={`/detail/${movie.id}`}>
              <div className="flex justify-center p-2">
                <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-1 rounded">
                  Détail
                </button>
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-gray-300">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center text-white">Page {currentPage}</div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="text-white mr-4">
            ⬅️ Page précédente
          </button>
        )}
        <button onClick={handleNextPage} className="text-white">
          Page suivante ➡️
        </button>
      </div>
    </>
  );
}
