import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookItem.css';

function BookItem({ book, onEdit }) {
  const { deleteBook } = useBooks(); // Ambil fungsi delete dari context

  // Teks status yang lebih ramah
  const getStatusText = (status) => {
    if (status === 'milik') return 'Dimiliki';
    if (status === 'baca') return 'Dibaca';
    if (status === 'beli') return 'Ingin Dibeli';
    return '';
  };

  return (
    <div className="book-item glass-card">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <div className="book-status">
        <span className={`status-badge status-${book.status}`}>
          {getStatusText(book.status)}
        </span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="edit-btn">Edit</button>
        <button onClick={() => deleteBook(book.id)} className="delete-btn">Hapus</button>
      </div>
    </div>
  );
}

export default BookItem;