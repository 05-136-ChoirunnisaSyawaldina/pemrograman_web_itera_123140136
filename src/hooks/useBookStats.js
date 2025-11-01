import { useMemo } from 'react';

function useBookStats(books) {
  // Gunakan useMemo agar kalkulasi tidak dijalankan di setiap render,
  // hanya jika 'books' berubah 
  const stats = useMemo(() => {
    const total = books.length;
    const milik = books.filter(b => b.status === 'milik').length;
    const baca = books.filter(b => b.status === 'baca').length;
    const beli = books.filter(b => b.status === 'beli').length;

    return { total, milik, baca, beli };
  }, [books]); // Dependency array [books] [cite: 738]

  return stats;
}

export default useBookStats;