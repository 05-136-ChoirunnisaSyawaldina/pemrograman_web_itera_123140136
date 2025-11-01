import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import BookItem from './BookItem';

const mockBook = { 
  id: 1, 
  title: 'Judul Testing', 
  author: 'Penulis Testing', 
  status: 'baca' 
};

// Mock fungsi props
const mockOnEdit = jest.fn();

describe('BookItem Component', () => {
  test('renders book details correctly', () => {
    render(
      <BookProvider>
        <BookItem book={mockBook} onEdit={mockOnEdit} />
      </BookProvider>
    );

    // Cari teks di dalam dokumen [cite: 1010]
    expect(screen.getByText('Judul Testing')).toBeInTheDocument();
    expect(screen.getByText('Penulis Testing')).toBeInTheDocument();
    expect(screen.getByText('Dibaca')).toBeInTheDocument(); // Cek status text
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Hapus')).toBeInTheDocument();
  });
});