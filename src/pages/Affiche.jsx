import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Affiche() {
  const [genres, setGenres] = useState([]);

  async function fetchGenres() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=fr",
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
      setGenres(data.genres);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        error
      );
    }
  }
  useEffect(() => {
    fetchGenres();
  }, []);

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 overflow-y-auto">
    {genres.map((genre) => (
      <Link
        to={`/genre/${genre.id}`}
        key={genre.id}
        className="flex flex-col bg-gray-800 text-white rounded overflow-hidden hover:bg-gray-700 transition duration-300"
      >
        <h3 className="text-xl font-bold mb-2 p-4">{genre.name}</h3>
      </Link>
    ))}
  </div>
);
}
