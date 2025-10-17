import React, { useState, useEffect } from 'react';

const TEAMS_API_URL = 'https://raelmorais.github.io/f1_json_data/teams.json';

const TeamCard = ({ team }) => {
  const getInitials = (name) => (name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'F1');
  const initials = getInitials(team.name);

  return (
    <div style={{ 
        border: '1px solid #333', 
        borderRadius: '8px', 
        margin: '10px', 
        padding: '15px', 
        minWidth: '280px', 
        maxWidth: '300px',
        backgroundColor: '#1a1a1a', 
        color: '#f0f0f0', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      
      {/* Exibe o Logo ou as Iniciais */}
      <div style={{ 
          marginBottom: '15px', 
          height: '60px', // Altura maior para o logo
          backgroundColor: '#000', // Fundo preto para o logo
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '4px',
          padding: '5px'
      }}>
        <img
          src={team.logotype_url}
          alt={`${team.name} Logo`}
          style={{ maxWidth: '90%', maxHeight: '50px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `<div style="padding: 5px; background: #333; border-radius: 4px; color: #fff; font-weight: bold; font-size: 0.9em;">Logo: ${initials}</div>`;
          }}
        />
      </div>

      <h3 style={{ margin: '8px 0', fontSize: '20px', color: '#e60000', borderBottom: '1px solid #444', paddingBottom: '5px' }}> {/* Vermelho vibrante */}
        {team.name}
      </h3>
      
      <div style={{ fontSize: '15px', lineHeight: '1.5' }}>
        <p style={{ margin: '4px 0' }}>Nacionalidade: <strong>{team.nationality || 'N/A'}</strong></p>
        
        {team.base && (
          <p style={{ margin: '4px 0' }}>
            Base: {team.base}
          </p>
        )}
        
        {team.principal && (
          <p style={{ margin: '4px 0' }}>
            Chefe de Equipe: <strong style={{color: '#e60000'}}>{team.principal}</strong> {/* Destaque em vermelho */}
          </p>
        )}
      </div>
    </div>
  );
};


const F1TeamViewer = () => { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(''); 
  const [availableSeasons, setAvailableSeasons] = useState([]); 

  // Efeito para buscar os dados da API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(TEAMS_API_URL);
        
        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }
        
        const result = await response.json();
        
        setData(result);
        
        // Extrai temporadas e define a mais recente como padrão
        if (result && Array.isArray(result.seasons)) {
            // Mapeia para string e ordena de forma decrescente (2025, 2024, ...)
            const seasons = result.seasons.map(s => s.season.toString()).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
            setAvailableSeasons(seasons);
            if (seasons.length > 0) {
                setSelectedSeason(seasons[0]); // Define a temporada mais recente
            }
        }
        
      } catch (err) {
        console.error("ERRO FATAL ao carregar dados:", err);
        setError("Não foi possível carregar os dados das equipes. Verifique a URL da API.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Processamento dos dados
  let teams = [];

  // Lógica de Extração
  const seasonData = data?.seasons?.find(s => s.season === parseInt(selectedSeason, 10));

  if (seasonData && Array.isArray(seasonData.teams)) {
      teams = seasonData.teams;
  }

  // Exibição de Status (Loading/Error)
  if (loading) {
    return (
      <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#0d0d0d', // Fundo escuro para loading
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#f0f0f0',
          fontFamily: 'Inter, sans-serif'
      }}>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Carregando dados de F1...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#330000', 
          color: '#ffdddd', 
          border: '1px solid #cc0000', 
          borderRadius: '8px',
          margin: '20px',
          fontFamily: 'Inter, sans-serif'
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>ERRO:</p>
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div style={{ 
        padding: '20px', 
        backgroundColor: '#0d0d0d', // Fundo escuro para a página
        minHeight: '100vh', 
        color: '#f0f0f0', 
        fontFamily: 'Inter, sans-serif' 
    }}>
      
      {/* Cabeçalho */}
      <header style={{ marginBottom: '30px', paddingBottom: '15px', borderBottom: '1px solid #444' }}>
        <h1 style={{ fontSize: '2.5em', color: '#e60000', marginBottom: '10px' }}> {/* Vermelho F1 */}
            F1 Teams Viewer
        </h1>
        <p style={{ color: '#ccc', marginBottom: '20px' }}>Visualize as equipes da Fórmula 1 por temporada.</p>
        
        {/* Seletor de Temporada */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label htmlFor="season-select" style={{ fontWeight: 'bold', color: '#f0f0f0' }}>
                Selecionar Temporada:
            </label>
            <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                disabled={loading || availableSeasons.length === 0}
                style={{ 
                    padding: '8px 12px', 
                    borderRadius: '5px', 
                    border: '1px solid #555', 
                    minWidth: '150px',
                    backgroundColor: '#333',
                    color: '#fff',
                    fontSize: '1em',
                    cursor: 'pointer'
                }}
            >
                {availableSeasons.length > 0 ? (
                    availableSeasons.map(season => (
                        <option key={season} value={season}>
                            {season}
                        </option>
                    ))
                ) : (
                    <option value="">Carregando...</option>
                )}
            </select>
        </div>
      </header>

      
      {/* Grid de Cards das Equipes */}
      <main>
        <h2 style={{ fontSize: '2em', marginBottom: '25px', color: '#f0f0f0' }}>
            Equipes da Temporada {selectedSeason} (Total: {teams.length})
        </h2>
        
        {teams.length === 0 ? (
            <p style={{ 
                color: '#ff6666', 
                backgroundColor: '#330000', 
                border: '1px solid #cc0000', 
                padding: '20px', 
                borderRadius: '8px',
                fontSize: '1.1em'
            }}>
                Nenhuma equipe encontrada para a temporada **{selectedSeason}**. Por favor, tente outra temporada.
            </p>
        ) : (
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '20px', 
                justifyContent: 'center' // Centraliza os cards
            }}>
              {teams.map((team, index) => (
                <TeamCard key={index} team={team} />
              ))}
            </div>
        )}
      </main>

    </div>
  );
};

export default F1TeamViewer;
