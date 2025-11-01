import React from 'react';
import BookItem from '../BookItem/BookItem';
import './BookList.css';

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-message glass-card">Belum ada buku di daftar ini.</p>;
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;