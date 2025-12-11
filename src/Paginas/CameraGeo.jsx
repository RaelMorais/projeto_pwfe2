// src/Paginas/CameraGeo.jsx
import React, { useRef, useState } from "react";

export function CameraGeo() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [geoError, setGeoError] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);

  // GEOLOCALIZAÇÃO
  const obterLocalizacao = () => {
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError("Geolocalização não é suportada neste navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setGeoError("Não foi possível obter sua localização.")
    );
  };

  // CÂMERA
  const iniciarCamera = async () => {
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (e) {
      console.error(e);
      setCameraError("Erro ao acessar a câmera.");
    }
  };

  const capturarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = canvas.toDataURL("image/png");
    setFoto(imgData);
  };

  const temCoordenadas = coords.lat && coords.lon;

  return (
    <main className="conteiner">
      <h2>📷 Câmera & Geolocalização</h2>

      {/* GEO */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>🌎 Geolocalização</h3>
        <button onClick={obterLocalizacao}>Obter localização atual</button>

        {temCoordenadas && (
          <>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Lat:</strong> {coords.lat} | <strong>Lon:</strong>{" "}
              {coords.lon}
            </p>

            {/* Mapa */}
            <div style={{ marginTop: "1rem" }}>
              <iframe
                title="Mapa da localização"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${coords.lat},${coords.lon}&z=15&output=embed`}
              />
            </div>

            <a
              href={`https://www.google.com/maps?q=${coords.lat},${coords.lon}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-block", marginTop: "0.5rem" }}
            >
              👉 Abrir no Google Maps
            </a>
          </>
        )}

        {geoError && <p style={{ color: "red" }}>{geoError}</p>}
      </section>

      {/* CÂMERA */}
      <section>
        <h3>📸 Câmera</h3>
        <button onClick={iniciarCamera}>Ativar câmera</button>
        {cameraError && <p style={{ color: "red" }}>{cameraError}</p>}

        <div style={{ marginTop: "1rem" }}>
          <video
            ref={videoRef}
            style={{ width: "320px", borderRadius: "8px" }}
          />
        </div>

        <button onClick={capturarFoto} style={{ marginTop: "1rem" }}>
          Capturar foto
        </button>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {foto && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Foto capturada:</h4>
            <img
              src={foto}
              alt="Foto capturada"
              style={{ width: "320px", borderRadius: "8px" }}
            />
          </div>
        )}
      </section>
    </main>
  );
}
