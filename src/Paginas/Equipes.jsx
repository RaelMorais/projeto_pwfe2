import React from "react";
import F1TeamViewer from "./Teams"; 

export function Equipes() {
  return (
    <main className="conteiner">
      <h2>Equipes de F1</h2>
      <p>Visualize as equipes, cores e informações principais.</p>

      <F1TeamViewer />
    </main>
  );
}
