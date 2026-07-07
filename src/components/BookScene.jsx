import React, { useState } from 'react';

export default function BookScene({ onComplete }) {
  const [bookState, setBookState] = useState(0);

  const advanceBook = () => {
    if (bookState === 0) {
      setBookState(1);
    } else if (bookState === 1) {
      setBookState(2);
    } else if (bookState === 2) {
      setBookState(0);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      
      {/* KOTAK TEKS */}
      <div className="message-card" style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '300px', // Disesuaikan dengan buku
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        {bookState === 0 && (
          <>
            <h3 style={{ margin: 0, color: '#b55a5a' }}>Happy Birthday Imelyan! ❤️</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>Sentuh buku untuk membuka</p>
          </>
        )}
        {bookState === 1 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Dear Imelyan..</h4>
            <p style={{ margin: '8px 0', fontSize: '0.85rem', color: '#444' }}>
              Selamat ulang tahun! Aku buatkan website ini spesial untukmu.
            </p>
          </>
        )}
        {bookState === 2 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Harapanku...</h4>
            <p style={{ margin: '8px 0', fontSize: '0.85rem', color: '#444' }}>
              Semoga bahagia selalu. Sentuh lagi untuk menutup buku.
            </p>
          </>
        )}
      </div>

      {/* BUKU (Class book-3d akan mengambil style dari CSS di atas) */}
      <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
        
        {/* LEMBARAN 1 */}
        <div 
          className={`book-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ zIndex: bookState === 0 ? 3 : 1 }}
        >
          <div className="sheet-face face-front"><img src="/assets/images/cover-buku.jpg" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div className="sheet-face face-back"><img src="/assets/images/pasangan-kiri-1.jpg" alt="Kiri 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>

        {/* LEMBARAN 2 */}
        <div 
          className={`book-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ zIndex: 2 }}
        >
          <div className="sheet-face face-front"><img src="/assets/images/pasangan-kanan-1.jpg" alt="Kanan 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div className="sheet-face face-back"><img src="/assets/images/pasangan-kiri-2.jpg" alt="Kiri 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>

        {/* HALAMAN DASAR */}
        <div className="book-sheet" onClick={advanceBook} style={{ zIndex: 1 }}>
          <div className="sheet-face face-front"><img src="/assets/images/pasangankanan2.jpg" alt="Kanan 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>
      </div>
      
    </div>
  );
}
