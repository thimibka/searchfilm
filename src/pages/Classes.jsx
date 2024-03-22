import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Classes() {
  const [apiData, setApiData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1",
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
      console.log(apiData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        error
      );
    }
  }

  return (
    <>
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
    </>
  );
}
