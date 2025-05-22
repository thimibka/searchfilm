import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Affiche from "./pages/Affiche.jsx";
import Detail from "./pages/Detail.jsx";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";
import Genre from "./pages/Genre";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <Nav
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className="App bg-slate-600">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/affiche" element={<Affiche />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/genre/:id" element={<Genre />} />
        </Routes>
      </div>
    </>
  );
}
