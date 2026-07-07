import React, { useEffect, useRef, useState } from 'react';

export default function ParticleText({ onComplete }) {
  const canvasRef = useRef(null);
  const [text, setText] = useState("3");
  const particlesRef = useRef([]);
  const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "ANITA", "❤️"];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < sequence.length) {
        setText(sequence[index]);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1300);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Pastikan Canvas Fullscreen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const getTargetCoordinates = () => {
      const off = document.createElement('canvas');
      off.width = canvas.width; off.height = canvas.height;
      const octx = off.getContext('2d');
      octx.fillStyle = 'white';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      
      // Ukuran font disesuaikan agar selalu pas di tengah
      const size = Math.min(canvas.width * 0.4, 400);
      octx.font = `900 ${size}px "Arial Black", sans-serif`;
      octx.fillText(text === '❤️' ? '♥' : text, canvas.width / 2, canvas.height / 2);
      
      const img = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const targets = [];
      for (let y = 0; y < canvas.height; y += 8) { // Step diperkecil agar lebih padat
        for (let x = 0; x < canvas.width; x += 8) {
          if (img[(y * canvas.width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      return targets;
    };

    const targets = getTargetCoordinates();
    particlesRef.current = targets.map((t, i) => ({
      ...particlesRef.current[i],
      x: particlesRef.current[i]?.x || Math.random() * canvas.width,
      y: particlesRef.current[i]?.y || Math.random() * canvas.height,
      tx: t.x, ty: t.y
    }));

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Efek Neon yang jauh lebih terang
      ctx.shadowBlur = 25; 
      ctx.shadowColor = '#ff477e';
      ctx.fillStyle = '#ffffff'; // Inti bola berwarna putih agar terlihat sangat terang

      particlesRef.current.forEach(p => {
        p.x += (p.tx - p.x) * 0.1;
        p.y += (p.ty - p.y) * 0.1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); // Bola sedikit lebih besar
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [text]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 2 
      }} 
    />
  );
}
