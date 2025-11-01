import { useState, useEffect } from 'react';

// Fungsi ini mengambil 'key' dan 'initialValue' sebagai argumen
function useLocalStorage(key, initialValue) {
  // Gunakan useState, tapi berikan fungsi untuk mendapatkan nilai awal
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Coba dapatkan item dari localStorage [cite: 573]
      const item = window.localStorage.getItem(key);
      // Jika ada, parse JSON-nya. Jika tidak, gunakan initialValue [cite: 576]
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika error, log dan gunakan initialValue [cite: 571, 579]
      console.error(error);
      return initialValue;
    }
  });

  // Gunakan useEffect untuk menyimpan ke localStorage setiap kali state berubah [cite: 580]
  useEffect(() => {
    try {
      // Simpan nilai state ke localStorage sebagai string JSON [cite: 582-584]
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]); // Dependency array [key, storedValue] [cite: 586]

  // Kembalikan state dan fungsi setter-nya [cite: 586]
  return [storedValue, setStoredValue];
}

export default useLocalStorage;