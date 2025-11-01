import React from 'react';

function BookSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="book-search">
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default BookSearch;