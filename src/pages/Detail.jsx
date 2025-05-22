import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieVideos();
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
      setMovie(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        error
      );
    }
  }
  async function fetchMovieVideos() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=fr-FR`,
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
      setVideos(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des vidéos:", error);
    }
  }
  if (!movie) {
    return <div>Loading...</div>;
  }
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
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
          <p className="text-lg font-semibold text-white">Date de sortie : </p>
          <p className="text-gray-300">{movie.release_date}</p>
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white">Genre : </p>

          {movie.genres &&
            movie.genres.map((genre) => (
              <p key={genre.id} className="text-gray-300">
                {genre.name}
              </p>
            ))}
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white">Synopsis :</p>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white">
            Compagnie de production :
          </p>
          {movie.production_companies && movie.production_companies[1] && (
            <p className="text-gray-300">
              {movie.production_companies[1].name}
            </p>
          )}
        </div>
        <br />
        <div className=" ">
          <p className="text-lg font-semibold text-white">
            Pays de production:
          </p>
          {movie.production_countries && movie.production_countries[0] && (
            <p className="text-gray-300">
              {movie.production_countries[0].name}
            </p>
          )}
        </div>
        <div className="">
          <p className="text-lg font-semibold text-white">Trailer : </p>
          {trailer ? (
            <div className="mt-4">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                controls
                width="100%"
                height="1000px"
              />
            </div>
          ) : (
            <p className="text-gray-300">Aucun trailer disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}
