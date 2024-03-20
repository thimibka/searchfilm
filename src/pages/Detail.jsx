import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  async function fetchMovieDetails() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`,
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
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        error
      );
    }
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 bg-gray-900  ">
      <div className="flex justify-center">
        <p className="text-lg font-semibold text-white">{movie.title}</p>
      </div>
      <div className="mb-2">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="mx-auto mt-4 mb-8"
            style={{ maxWidth: "300px" }}
          />
        )}
      </div>

      <p className="text-gray-400 flex justify-center">{movie.tagline}</p>

      <div className="ml-8">
        <div className="">
          <p className="text-red-800">Genre : </p>
          {movie.genres &&
            movie.genres.map((genre) => (
              <p key={genre.id} className="text-white">
                {genre.name}
              </p>
            ))}
        </div>
        <br />
        <div className="text-red-800">
          <p>Synopsis :</p>
          <p className="text-white">{movie.overview}</p>
        </div>
        <br />
        <div className="text-red-800">
          <p>lien:</p>
          <a href={movie.homepage} className="text-white">
            {movie.homepage}
          </a>
        </div>
        <br />
        <div className="text-red-800">
          <p>Compagnie de production :</p>
          {movie.production_companies && movie.production_companies[1] && (
            <p className="text-white">{movie.production_companies[1].name}</p>
          )}
        </div>
        <br />
        <div className="text-red-800 mb-6 ">
          <p>Pays de production:</p>
          {movie.production_countries && movie.production_countries[0] && (
            <p className="text-white">{movie.production_countries[0].name}</p>
          )}
        </div>
      </div>
    </div>
  );
}
