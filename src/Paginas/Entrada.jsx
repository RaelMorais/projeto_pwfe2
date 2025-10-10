import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import videoF1 from '../assets/videos/f1-intro.mp4'; 

const Entrada = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  const [isMuted, setIsMuted] = useState(true); 
  
  const videoSource = videoF1; 
  const REDIRECT_TIME_MS = 48 * 1000; 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dsgo'); 
    }, REDIRECT_TIME_MS);
    
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]); 
  
  const handleVideoEnd = () => {
    console.log("Vídeo terminou, mas o timer de 58s ainda está ativo.");
  };

  const toggleMute = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
          videoElement.muted = !videoElement.muted; 
          setIsMuted(videoElement.muted); 
      }
  };

  return (
    <div className="video-background-container">
      <video
        ref={videoRef}
        className="video-background"
        autoPlay 
        muted={isMuted} 
        loop     
        playsInline 
        onEnded={handleVideoEnd} 
      >
        <source src={videoSource} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      
      <div className="content-overlay">
        <button 
          onClick={toggleMute} 
          style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              zIndex: 10,
              // ✅ CORREÇÃO AQUI: Cor de fundo vermelha adicionada
              backgroundColor: '#E10600', 
              color: 'white',
              border: 'none', 
              borderRadius: '0', // Sem border radius
              padding: '10px 15px',
              cursor: 'pointer',
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              fontFamily: 'Arial, sans-serif', 
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' // Adiciona uma leve sombra para contraste
          }}
        >
          {isMuted ? 'LIGAR ÁUDIO 🔇' : 'DESLIGAR ÁUDIO 🔊'}
        </button>
      </div>
    </div>
  );
};

export default Entrada;