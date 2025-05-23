import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Genre() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=fr-FR&page=${currentPage}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDliZjk3MjViYTcyYWI4Mzk0NzIxODBmY2Q4M2EwZSIsInN1YiI6IjY1ZjM0ZWRlNmRlYTNhMDEyZjc4NTY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDsTVi9bnC5wV_30oRkMQwXqVGnUDqSYYapGfK5iQFY",
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages || 1);
      window.scrollTo(0, 0);
    };

    fetchMovies();
  }, [id, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const start = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const end = Math.min(start + 9, totalPages);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`mx-1 px-3 py-1 rounded ${
            i === currentPage
              ? "bg-gray-100 text-black mb-[30px]"
              : "bg-gray-400 text-black mb-[30px]"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="flex justify-center text-white mb-6 text-sm sm:text-base text-center px-2">
        Page {currentPage} sur {totalPages}
      </div>

      <div className="flex justify-center flex-wrap gap-2 px-2 mb-2">
        {renderPageNumbers()}
      </div>

      <div className="flex justify-center gap-2 px-2">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-black hover:bg-gray-100 px-3 py-1 rounded flex items-center mb-[10px]"
          >
            ⬅️ <span className="hidden sm:inline ml-1">Page précédente</span>
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-black hover:bg-gray-100 px-3 py-1 rounded flex items-center mb-[10px]"
          >
            <span className="hidden sm:inline mr-1">Page suivante</span> ➡️
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 overflow-y-auto ml-[50px] mr-[50px]">
        {movies.map((movie) => (
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
              <h2 className="text-lg text-red-600 font-[1000]">
                {movie.title}
              </h2>
              <p className="text-gray-300">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-2 px-2 mb-2">
        {renderPageNumbers()}
      </div>

      <div className="flex justify-center gap-2 px-2">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-black hover:bg-gray-100 px-3 py-1 rounded flex items-center mb-[10px]"
          >
            ⬅️ <span className="hidden sm:inline ml-1">Page précédente</span>
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-black hover:bg-gray-100 px-3 py-1 rounded flex items-center mb-[10px]"
          >
            <span className="hidden sm:inline mr-1">Page suivante</span> ➡️
          </button>
        )}
      </div>
    </>
  );
}
