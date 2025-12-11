import { Routes, Route } from "react-router-dom";

import Entrada from "../Paginas/Entrada";
import { Pilotos } from "../Paginas/Pilotos";
import { Equipes } from "../Paginas/Equipes";
import { Fabricantes } from "../Paginas/Fabricantes";
import { Missao } from "../Paginas/Missao";
import { Inventario } from "../Paginas/Inventario";
import { CameraGeo } from "../Paginas/CameraGeo";
import F1TeamViewer from "../Paginas/Teams";
import { DSGo } from "../Paginas/DSGo";

export function Rotas() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Entrada />} />

      {/* Rotas principais */}
      <Route path="/pilotos" element={<Pilotos />} />
      <Route path="/equipes" element={<Equipes />} />
      <Route path="/fabricantes" element={<Fabricantes />} />
      <Route path="/missao" element={<Missao />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/camera-gps" element={<CameraGeo />} />

      {/* Rotas já existentes */}
      <Route path="/teams" element={<F1TeamViewer />} />

      {/* Sub-rotas dentro de DSGo */}
      <Route path="/dsgo" element={<DSGo />}>
        <Route index element={<DSGo />} />
        <Route path="missao" element={<Missao />} />
      </Route>
    </Routes>
  );
}
