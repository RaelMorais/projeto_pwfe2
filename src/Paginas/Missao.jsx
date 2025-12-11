import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  const concluirMissao = (id) => {
    setMissoesConcluidas((prev) => [...prev, id]);
    setMissaoSelecionada(null);
  };

  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id}
            missao={m}
            onIniciarMissao={setMissaoSelecionada}
            concluida={missoesConcluidas.includes(m.id)}
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)}
          onConcluir={() => concluirMissao(missaoSelecionada.id)}
        />
      )}
    </section>
  );
}
