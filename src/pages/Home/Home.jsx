import React, { useState, useMemo } from 'react';
// Path yang benar: naik dua level ke src/, lalu masuk ke context/
import { useBooks } from '../../context/BookContext'; 
// Path yang benar: naik dua level ke src/, lalu masuk ke components/
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookSearch from '../../components/BookSearch/BookSearch';

// Hapus semua import yang tidak perlu (Navbar, Home, Stats, App.css)

function Home() {
  const { books } = useBooks(); // Ambil data buku dari context
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null); 

  const visibleBooks = useMemo(() => {
    return books
      .filter(book => {
        if (filter === 'all') return true;
        return book.status === filter;
      })
      .filter(book => {
        const term = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      });
  }, [books, filter, searchTerm]); 

  return (
    <div className="container">
      <BookForm
        bookToEdit={editingBook}
        onDoneEditing={() => setEditingBook(null)}
      />
      
      <BookFilter currentFilter={filter} onFilterChange={setFilter} />
      <BookSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <BookList
        books={visibleBooks}
        onEdit={setEditingBook} 
      />
    </div>
  );
}

export default Home;