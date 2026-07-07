import React, { useState } from 'react';

export default function BookScene({ onComplete }) {
  const [bookState, setBookState] = useState(0); // 0: Tertutup, 1: Buka Hal 1, 2: Buka Hal 2

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
      
      {/* --- KOTAK TEKS DI ATAS BUKU (Sesuai gambar referensi) --- */}
      <div className="message-card" style={{
        background: 'white',
        padding: '15px 25px',
        borderRadius: '12px',
        width: '80%',
        maxWidth: '350px',
        textAlign: 'center',
        marginBottom: '40px', // Jarak yang memisahkan teks di atas dan buku di bawah
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        {bookState === 0 && (
          <>
            <h3 style={{ margin: 0, color: '#b55a5a' }}>Happy Birthday Anita! ❤️</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>Sentuh buku di bawah untuk membuka</p>
          </>
        )}
        
        {bookState === 1 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Dear Anita...</h4>
            <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#444' }}>
              Selamat ulang tahun! Di hari yang sangat spesial ini, aku sengaja meluangkan waktu membuatkan website kejutan ini khusus untukmu.
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>
              "Happy Birthday Sayang ❤️"
            </p>
          </>
        )}
        
        {bookState === 2 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Harapanku...</h4>
            <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#444' }}>
              Semoga di usia yang baru ini kebahagiaan selalu menyertai setiap langkahmu. Silakan sentuh lagi untuk menutup buku, ada kejutan terakhir untukmu.
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>
              "As long as you're here..."
            </p>
          </>
        )}
      </div>

      {/* --- BAGIAN BUKU (HANYA GAMBAR & BISA DIKLIK) --- */}
      <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
        
        {/* LEMBARAN 1: COVER DEPAN */}
        <div 
          className={`book-sheet cover-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front cover-front">
             {/* Dikosongkan dari teks */}
          </div>
          <div className="sheet-face face-back page-bg">
             {/* Dikosongkan dari teks */}
          </div>
        </div>

        {/* LEMBARAN 2: FOTO HALAMAN KIRI & KANAN */}
        <div 
          className={`book-sheet middle-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front page-bg">
            <div className="photo-frame-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Hanya menampilkan gambar */}
              <img src="/assets/images/anita-page1.jpg" alt="Anita Page 1" className="embedded-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="sheet-face face-back page-bg">
            <div className="photo-frame-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Hanya menampilkan gambar */}
              <img src="/assets/images/anita-page2.jpg" alt="Anita Page 2" className="embedded-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* HALAMAN DASAR BUKU */}
        <div 
          className="book-sheet base-sheet page-bg" 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front">
             {/* Dikosongkan dari teks */}
          </div>
        </div>
      </div>
      
    </div>
  );
}
