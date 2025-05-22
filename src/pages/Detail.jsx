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
        <p className="text-lg font-semibold text-red-600 mt-6 font-[1000]">
          {movie.title}
        </p>
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

      <h1 className="text-red-600 flex justify-center font-[1000] mb-8">
        {movie.tagline}
      </h1>

      <div className="ml-8">
        <div className="">
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">Date de sortie : </p>
          <p className="text-gray-300">{movie.release_date}</p>
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">Genre : </p>

          {movie.genres &&
            movie.genres.map((genre) => (
              <p key={genre.id} className="text-gray-300">
                {genre.name}
              </p>
            ))}
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">Synopsis :</p>
          <p className="text-gray-300 me-8">{movie.overview}</p>
        </div>
        <br />
        <div className="">
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">
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
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">
            Pays de production:
          </p>
          {movie.production_countries && movie.production_countries[0] && (
            <p className="text-gray-300">
              {movie.production_countries[0].name}
            </p>
          )}
        </div>
        <div className="mb-[50px] me-[30px]">
          <p className="text-lg font-semibold text-white text-red-600 font-[1000]">Trailer : </p>
          {trailer ? (
            <div className="aspect-w-16 aspect-h-9">
              <div className="relative pt-[56.25%]">
                {" "}
                {/* 16:9 aspect ratio */}
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Aucun trailer disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}
