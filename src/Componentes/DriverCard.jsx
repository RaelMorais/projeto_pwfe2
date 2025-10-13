import React from 'react';

const DriverCard = ({ driver }) => {
  const { 
    driver_number, 
    full_name, 
    team_name, 
    country_code,
    headshot_url 
  } = driver;

  const key = driver_number; 

  return (
    <div className="driver-card" style={{ borderLeftColor: driver.team_colour }}>
      {headshot_url && (
          <div className="driver-image-container">
              <img src={headshot_url} alt={`Foto de ${full_name}`} className="driver-headshot" />
          </div>
      )}

      <div className="driver-info">
        
        {/* Número e Nome */}
        <div className="driver-name-row">
            <span className="driver-number">{driver_number}</span>
            <h2 className="driver-full-name">{full_name}</h2>
        </div>

        {/* Equipe e País */}
        <p className="driver-team" style={{ color: driver.team_colour }}>
          Equipe: {team_name}
        </p>
        <p className="driver-country">
          País: {country_code}
        </p>
        
        {/* Outras informações que você queira adicionar, como 'name_acronym' */}
        <p className="driver-acronym">
          Acrônimo: {driver.name_acronym}
        </p>
      </div>
    </div>
  );
};

export default DriverCard;