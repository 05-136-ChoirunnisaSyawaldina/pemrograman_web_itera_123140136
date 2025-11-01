import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid'; // Install: npm install uuid

// 1. Buat Context [cite: 791]
const BookContext = createContext();

// 2. Buat custom hook untuk menggunakan context (lebih rapi) [cite: 792]
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider'); // [cite: 793]
  }
  return context;
}

// 3. Buat Provider Component [cite: 794]
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (title, author, status) => {
    const newBook = { id: uuidv4(), title, author, status };
    // Selalu buat array baru, jangan mutasi state [cite: 302, 303]
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const updateBook = (id, updates) => {
    setBooks(
      books.map(book =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
  };

  // Nilai yang akan dibagikan ke semua komponen di dalamnya
  const value = {
    books,
    addBook,
    deleteBook,
    updateBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}