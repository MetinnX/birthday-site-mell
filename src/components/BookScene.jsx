import React, { useState } from 'react';

export default function BookScene({ onComplete }) {
  // State: 0 = Tertutup, 1 = Halaman 1 Terbuka, 2 = Halaman 2 Terbuka
  const [bookState, setBookState] = useState(0);

  const advanceBook = () => {
    // Siklus: 0 -> 1 -> 2 -> 0 -> 1...
    setBookState((prev) => (prev + 1) % 3);
  };

  return (
    <div className="scene-container">
      
      {/* KOTAK TEKS */}
      <div className="message-card">
        {bookState === 0 && (
          <>
            <h3>Happy Birthday Imelyan! ❤️</h3>
            <p>Sentuh buku untuk membuka</p>
          </>
        )}
        {bookState === 1 && (
          <>
            <h4>Dear Imelyan..</h4>
            <p>Selamat ulang tahun! Aku buatkan website ini spesial untukmu.</p>
          </>
        )}
        {bookState === 2 && (
          <>
            <h4>Harapanku...</h4>
            <p>Semoga bahagia selalu. Sentuh lagi untuk menutup buku.</p>
          </>
        )}
      </div>

      {/* KONTENER BUKU */}
      <div className="book-3d">
        {/* LEMBARAN 1 */}
        <div 
          className={`book-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ zIndex: 3 }}
        >
          <div className="sheet-face face-front"><img src="/assets/images/cover-buku.jpg" alt="Cover" /></div>
          <div className="sheet-face face-back"><img src="/assets/images/pasangan-kiri-1.jpg" alt="Kiri 1" /></div>
        </div>

        {/* LEMBARAN 2 */}
        <div 
          className={`book-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ zIndex: 2 }}
        >
          <div className="sheet-face face-front"><img src="/assets/images/pasangan-kanan-1.jpg" alt="Kanan 1" /></div>
          <div className="sheet-face face-back"><img src="/assets/images/pasangan-kiri-2.jpg" alt="Kiri 2" /></div>
        </div>

        {/* HALAMAN DASAR */}
        <div className="book-sheet" style={{ zIndex: 1 }}>
          <div className="sheet-face face-front"><img src="/assets/images/pasangankanan2.jpg" alt="Kanan 2" /></div>
        </div>
      </div>

      <button className="btn-next" onClick={onComplete}>Selesai</button>
    </div>
  );
}
