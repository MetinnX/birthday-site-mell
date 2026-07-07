import React, { useEffect, useRef, useState } from 'react';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const imageList = [...Array.from({ length: 30 }, (_, i) => `/assets/images/${i + 1}.jpg`)];

  // 1. Preload Gambar
  useEffect(() => {
    Promise.all(
      imageList.map(
        (src) =>
          new Promise((r) => {
            const img = new Image();
            img.onload = r;
            img.onerror = r;
            img.src = src;
          })
      )
    ).then(() => setAssetsReady(true));
  }, []);

  // 2. Efek Bola Neon Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "HAPPYBIRTHDAYANITA";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).map(() => 1);

    const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "ANITA", "♥"];
    let currentSeqIndex = -1;
    let particles = [];
    let lastSeqTime = 0;
    let matrixInterval;

    // Membaca koordinat piksel untuk membentuk kata
    const getParticles = (text) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });

      octx.fillStyle = 'white';
      octx.textBaseline = 'middle';
      octx.textAlign = 'center';
      
      let dynamicFontSize;
      if (text === '♥') {
        dynamicFontSize = Math.min(canvas.width * 0.7, 280);
      } else if (text.length === 1) {
        dynamicFontSize = Math.min(canvas.width * 0.6, 350); 
      } else {
        dynamicFontSize = Math.min((canvas.width / text.length) * 1.3, 110); 
      }
      
      octx.font = `900 ${dynamicFontSize}px "Arial Black", Impact, sans-serif`;
      octx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imgData = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const newParticles = [];
      
      const step = 9; // Jarak antar bola (semakin kecil semakin rapat)

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alpha = imgData[(y * canvas.width + x) * 4 + 3];
          if (alpha > 128) {
            newParticles.push({ x, y });
          }
        }
      }
      return newParticles;
    };

    const draw = () => {
      const now = Date.now();
      
      if (now - lastSeqTime > 1200 && currentSeqIndex < sequence.length - 1) {
        currentSeqIndex++;
        lastSeqTime = now;
        particles = getParticles(sequence[currentSeqIndex]);
      }

      // Efek memudar pada background
      ctx.fillStyle = 'rgba(11, 9, 20, 0.35)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- A. Background Hujan Matrix (Opsional, dibiarkan redup) ---
      ctx.fillStyle = 'rgba(255, 71, 126, 0.15)'; 
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      // --- B. Foreground: Bola-Bola Neon ---
      // Menambahkan efek glow / neon
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ff477e'; // Warna cahaya neon (Pink)
      ctx.fillStyle = '#ffb3c6'; // Warna inti bola (Pink sangat terang/putih)

      particles.forEach(p => {
        // Menambahkan sedikit gerakan acak (jitter) agar bola terlihat hidup
        const jitterX = (Math.random() - 0.5) * 1.5;
        const jitterY = (Math.random() - 0.5) * 1.5;

        ctx.beginPath();
        // Menggambar lingkaran dengan radius 2.5
        ctx.arc(p.x + jitterX, p.y + jitterY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mereset shadow agar efek hujan di background tidak ikut menyala
      ctx.shadowBlur = 0;
    };

    // Kecepatan render sedikit dipercepat untuk kehalusan animasi bola
    matrixInterval = setInterval(draw, 35);

    const totalDuration = sequence.length * 1200 + 2000; 
    const sceneTimer = setTimeout(() => {
      if (assetsReady) {
        onComplete();
        return;
      }
      const i = setInterval(() => {
        if (assetsReady) {
          clearInterval(i);
          onComplete();
        }
      }, 100);
    }, totalDuration);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(sceneTimer);
    };
  }, [onComplete, assetsReady]);

  return (
    <div className="scene-container center-content" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0b0914' }}>
      <canvas ref={canvasRef} className="matrix-canvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      <div className="overlay-text-wrapper" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', paddingBottom: '10vh' }}>
        <p style={{ color: "white", fontSize: 14, opacity: 0.5, fontFamily: 'monospace' }}>
          {assetsReady ? "" : "Loading memories..."}
        </p>
      </div>
    </div>
  );
}
