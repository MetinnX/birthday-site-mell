import React, { useEffect, useRef, useState } from 'react';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);
  const [assetsReady,setAssetsReady]=useState(false);
  const imageList=[...Array.from({length:30},(_,i)=>`/assets/images/${i+1}.jpg`)];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Promise.all(imageList.map(src=>new Promise(r=>{const img=new Image();img.onload=r;img.onerror=r;img.src=src;}))).then(()=>setAssetsReady(true));

    const alphabet = "HAPPYBIRTHDAYIMELYAA❤️";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).map(() => 1);

    const matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(11, 9, 20, 0.1)'; // Memberikan efek bayangan memudar
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff477e'; // Warna teks pink neon
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }, 30);

    // Durasi Scene 1 adalah 7 detik, lalu otomatis pindah ke Scene Buku
    const sceneTimer=setTimeout(()=>{if(assetsReady){onComplete();return;}const i=setInterval(()=>{if(assetsReady){clearInterval(i);onComplete();}},100);},7000);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(sceneTimer);
    };
  }, [onComplete,assetsReady]);

  return (
    <div className="scene-container center-content">
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="overlay-text-wrapper">
        <h1 className="pulse-text-matrix">TO IMELYANN</h1>
        <div className="matrix-heart">❤️</div><p style={{color:"white",marginTop:20,fontSize:14,opacity:.8}}>{assetsReady?"Ready ✓":"Loading memories..."}</p>
      </div>
    </div>
  );
}
