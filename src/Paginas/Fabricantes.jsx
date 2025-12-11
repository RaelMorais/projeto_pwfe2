
import React from "react";

const fabricantes = [
  "Mercedes",
  "Ferrari",
  "Honda",
  "Renault",
  "Ford (histórico)",
];

export function Fabricantes() {
  return (
    <main className="conteiner">
      <h2>Fabricantes de Motores</h2>
      <p>Principais fabricantes que já estiveram ou estão na Fórmula 1.</p>

      <ul>
        {fabricantes.map((fab) => (
          <li key={fab}>{fab}</li>
        ))}
      </ul>
    </main>
  );
}
