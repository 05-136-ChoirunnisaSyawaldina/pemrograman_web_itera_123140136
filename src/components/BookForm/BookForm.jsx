import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

function BookForm({ bookToEdit, onDoneEditing }) {
  // State lokal untuk form input [cite: 243, 250]
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik'); // Default status
  const [error, setError] = useState('');

  const { addBook, updateBook } = useBooks(); // Ambil fungsi dari context

  // useEffect untuk mengisi form jika kita sedang mengedit
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setStatus(bookToEdit.status);
    } else {
      // Reset form jika tidak mengedit
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error Handling Sederhana
    if (!title.trim() || !author.trim()) {
      setError('Judul dan Penulis tidak boleh kosong.');
      return;
    }
    setError('');

    if (bookToEdit) {
      // Mode Edit
      updateBook(bookToEdit.id, { title, author, status });
      onDoneEditing(); // Panggil fungsi untuk reset mode edit
    } else {
      // Mode Tambah Baru
      addBook(title, author, status);
    }

    // Reset form setelah submit
    setTitle('');
    setAuthor('');
    setStatus('milik');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form glass-card">
      <h3>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
      {error && <p className="form-error">{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Judul Buku"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Penulis"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
      <button type="submit">{bookToEdit ? 'Update' : 'Tambah'}</button>
      {bookToEdit && (
        <button type="button" onClick={onDoneEditing} className="cancel-btn">
          Batal
        </button>
      )}
    </form>
  );
}

export default BookForm;