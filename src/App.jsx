import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Affiche from "./pages/Affiche.jsx";
import Classes from "./pages/Classes.jsx";
import Detail from "./pages/Detail.jsx";

export default function App() {
  return (
    <div className="App bg-slate-600">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affiche" element={<Affiche />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}
