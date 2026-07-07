import React from 'react';

export default function CollageScene() {
  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      {/* --- LAPISAN BINTANG BERTERBANGAN (BACKGROUND) --- */}
      <div className="starfield"></div>
      
      {/* --- CONTAINER FORMASI HATI MINI KOSONG DI TENGAH --- */}
      <div className="heart-formation-grid">
        {[...Array(17)].map((_, idx) => (
          <div 
            key={idx} 
            className={`scatter-polaroid target-pos-${idx + 1}`}
            style={{ 
              animationDelay: `${0.1 + (idx * 0.12)}s` /* Tempo sebaran beruntun yang pas */
            }} 
          >
            <img src={`/assets/images/love-${idx + 1}.jpg`} alt={`Memory ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
