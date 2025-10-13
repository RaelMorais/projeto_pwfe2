import React, { useState, useEffect } from 'react';
import DriverCard from '../Componentes/DriverCard'; 

const API_URL = 'https://api.openf1.org/v1/drivers';

const DriverCards = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(API_URL);
                if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setDrivers(data);
      } catch (err) {
        console.error("Erro ao buscar dados dos pilotos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []); 

  if (loading) {
    return <div className="loading">Carregando dados dos pilotos da F1...</div>;
  }

  if (error) {
    return <div className="error-message">Erro ao carregar: {error}. Tente novamente mais tarde.</div>;
  }
  
  const activeDrivers = drivers.filter(driver => driver.session_key); 
  const top20Drivers = activeDrivers.slice(0, 20); 

  return (
    <div className="drivers-container">
      <h1 className='centralized-title'>Pilotos F1</h1> 
      <div className="cards-grid">
        {top20Drivers.map((driver) => (
          <DriverCard 
            key={driver.driver_number + driver.session_key} 
            driver={driver} 
          />
        ))}
      </div>
    </div>
  );
};

export default DriverCards;