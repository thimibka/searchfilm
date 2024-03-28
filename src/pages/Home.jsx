import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  async function fetchData(page) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDliZjk3MjViYTcyYWI4Mzk0NzIxODBmY2Q4M2EwZSIsInN1YiI6IjY1ZjM0ZWRlNmRlYTNhMDEyZjc4NTY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDsTVi9bnC5wV_30oRkMQwXqVGnUDqSYYapGfK5iQFY",
          },
        }
      );
      const data = await response.json();
      setApiData(data.results);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        error
      );
    }
  }
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 p-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Mon Application</h1>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex lg:items-center ${menuOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="">
              <Link
                to="/affiche"
                className="block lg:inline-block text-white hover:text-gray-300"
              >
                à l'affiche
              </Link>
            </div>
            <div className="">
              <Link
                to="/classes"
                className="block lg:inline-block text-white hover:text-gray-300"
              >
                Film classés
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 overflow-y-auto">
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
              <div className="flex justify-center">
                <button>Detail</button>
              </div>{" "}
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">
                {movie.title}
              </h2>

              <p className="text-gray-300">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <p className="text-white"> Page {currentPage}</p>
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="text-white flex direction-row mr-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <p className="flex justify-center text-white">Page précédente</p>
          </button>
        )}
        <button
          onClick={handleNextPage}
          className="text-white flex direction-row"
        >
          <p className="flex justify-center text-white">Page suivante</p>
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>{" "}
      </div>
    </>
  );
}
