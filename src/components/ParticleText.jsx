import React, { useEffect, useRef, useState } from 'react';

export default function ParticleText({ onComplete }) {
  const canvasRef = useRef(null);
  const [text, setText] = useState("3");
  const particlesRef = useRef([]);
  const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "IMEYY", "❤️"];

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
    
    const getTargetCoordinates = () => {
      const off = document.createElement('canvas');
      off.width = canvas.width; off.height = canvas.height;
      const octx = off.getContext('2d');
      octx.fillStyle = 'white';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      const size = Math.min(canvas.width * 0.5, 300);
      octx.font = `900 ${size}px Arial Black`;
      octx.fillText(text === '❤️' ? '♥' : text, canvas.width / 2, canvas.height / 2);
      
      const img = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const targets = [];
      for (let y = 0; y < canvas.height; y += 9) {
        for (let x = 0; x < canvas.width; x += 9) {
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
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff477e';
      ctx.fillStyle = '#ffb3c6';

      particlesRef.current.forEach(p => {
        p.x += (p.tx - p.x) * 0.08;
        p.y += (p.ty - p.y) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [text]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />;
}
