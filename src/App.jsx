import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Affiche from "./pages/Affiche.jsx";
import Detail from "./pages/Detail.jsx";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";
import Genre from "./pages/Genre";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const location = useLocation();

  useEffect(() => {
    const isDetailPage = location.pathname.startsWith("/detail");
    const isHomeWithSearch = location.pathname === "/" && searchQuery !== "";

    if (!isDetailPage && !isHomeWithSearch) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const navigateAndClearSearch = (path) => {
  setSearchQuery("");
  navigate(path);
};
  return (
    <>
      <Nav
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
          navigateAndClearSearch={navigateAndClearSearch}
      />
      <div className="App bg-slate-600">
        <Routes>
          <Route
            path="/"
            element={
              <Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            }
          />
          <Route path="/affiche" element={<Affiche />} />
          <Route
            path="/detail/:id"
            element={<Detail setSearchQuery={setSearchQuery} />}
          />
          <Route path="/genre/:id" element={<Genre />} />
        </Routes>
      </div>
    </>
  );
}
