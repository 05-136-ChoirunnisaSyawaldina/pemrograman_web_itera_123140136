import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookProvider } from '../../context/BookContext'; // Perlu provider
import BookForm from './BookForm';

// Buat wrapper custom untuk render dengan context
const renderWithProvider = (ui) => {
  return render(<BookProvider>{ui}</BookProvider>);
};

describe('BookForm Component', () => {
  test('renders form inputs and button', () => {
    renderWithProvider(<BookForm />);
    // Cari elemen berdasarkan placeholder [cite: 1064]
    expect(screen.getByPlaceholderText('Judul Buku')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Penulis')).toBeInTheDocument();
    expect(screen.getByText('Tambah')).toBeInTheDocument();
  });

  test('shows error message if title is empty', async () => {
    renderWithProvider(<BookForm />);
    
    // Gunakan userEvent untuk interaksi yang lebih realistis [cite: 1066]
    await userEvent.type(screen.getByPlaceholderText('Penulis'), 'Test Author');
    
    // Klik tombol tambah [cite: 1075]
    await userEvent.click(screen.getByText('Tambah'));

    // Harapkan pesan error muncul
    expect(await screen.findByText('Judul dan Penulis tidak boleh kosong.')).toBeInTheDocument();
  });

  test('fills form when in edit mode', () => {
    const mockBook = { id: 1, title: 'Buku Edit', author: 'Author Edit', status: 'baca' };
    renderWithProvider(<BookForm bookToEdit={mockBook} />);

    // Cek apakah input memiliki value dari prop [cite: 1070]
    expect(screen.getByPlaceholderText('Judul Buku')).toHaveValue('Buku Edit');
    expect(screen.getByPlaceholderText('Penulis')).toHaveValue('Author Edit');
    expect(screen.getByRole('combobox')).toHaveValue('baca'); // <select> adalah combobox
    expect(screen.getByText('Update')).toBeInTheDocument();
  });
});