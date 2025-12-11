import { useState } from "react";

// SVGs da internet (pode trocar por outros links se quiser)
const SUCESSO_SVG =
  "https://www.svgrepo.com/show/13683/trophy.svg";
const ERRO_SVG =
  "https://www.svgrepo.com/show/401979/error-circle.svg";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // chama a função de concluir após 1s (tempo para mostrar feedback)
      setTimeout(() => {
        onConcluir(missao.id);
      }, 1000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  return (
    <dialog open className="modal">
      <h2 className="titulo" id="titulo-missao">
        {missao.titulo}
      </h2>
      <p id="descricao-missao">{missao.descricao}</p>

      <label htmlFor="resposta" className="sr-only">
        Digite sua resposta
      </label>
      <input
        className="caixaTexto"
        id="resposta"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
      />

      <div className="modal-botoes">
        <button onClick={verificarResposta}>Enviar</button>
        <button onClick={onClose}>Fechar</button>
      </div>

      {resultado && (
        <div className="resultado">
          <p>{resultado}</p>
          {status === "sucesso" && (
            <img
              src={SUCESSO_SVG}
              alt="Missão concluída com sucesso"
              width="80"
            />
          )}
          {status === "erro" && (
            <img
              src={ERRO_SVG}
              alt="Erro na resposta da missão"
              width="80"
            />
          )}
        </div>
      )}
    </dialog>
  );
}
