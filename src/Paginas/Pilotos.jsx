
import React from "react";
import DriverCards from "./DriverCards"; // se for named export: { DriverCards }

export function Pilotos() {
  return (
    <main className="conteiner">
      <h2>Pilotos F1</h2>
      <p>Confira os pilotos da temporada e seus detalhes.</p>
      <DriverCards />
    </main>
  );
}
