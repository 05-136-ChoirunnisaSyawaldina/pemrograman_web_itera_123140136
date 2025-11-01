import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks(); // Dapatkan semua buku dari context
  const stats = useBookStats(books); // Gunakan custom hook kita [cite: 739]

  return (
    <div className="container">
      <h2 className="stats-title">Statistik Buku Anda</h2>
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <h3>Total Buku</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card glass-card">
          <h3>Dimiliki</h3>
          <p>{stats.milik}</p>
        </div>
        <div className="stat-card glass-card">
          <h3>Sedang Dibaca</h3>
          <p>{stats.baca}</p>
        </div>
        <div className="stat-card glass-card">
          <h3>Ingin Dibeli</h3>
          <p>{stats.beli}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;