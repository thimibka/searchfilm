// pages/Genre.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Genre() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=fr-FR`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDliZjk3MjViYTcyYWI4Mzk0NzIxODBmY2Q4M2EwZSIsInN1YiI6IjY1ZjM0ZWRlNmRlYTNhMDEyZjc4NTY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDsTVi9bnC5wV_30oRkMQwXqVGnUDqSYYapGfK5iQFY",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
    .then((data) => {
      console.log("Movies from genre:", data);
      setMovies(data.results);
    });
}, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 text-white p-4 rounded">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2 className="mt-2 font-bold">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
}
