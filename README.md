# Aplikasi Manajemen Buku Pribadi (MyBookApp)

Aplikasi ini adalah submission untuk Tugas Praktikum Pemrograman Web. Ini adalah aplikasi React (Single Page Application) yang memungkinkan pengguna untuk mencatat dan mengelola koleksi buku pribadi mereka dengan antarmuka yang modern.

Aplikasi ini dibangun menggunakan `create-react-app` dan memanfaatkan konsep React modern seperti Hooks, Context API, dan React Router untuk manajemen state dan navigasi yang efisien.

---

## Screenshot Antarmuka

<br><img width="733" height="952" alt="image" src="https://github.com/user-attachments/assets/00e7822a-a0ce-47bb-a678-917c182fde39" />


<br><img width="731" height="352" alt="image" src="https://github.com/user-attachments/assets/67d5e1a1-939c-414f-8f99-5c6c89652d4b" />

---

## Fitur Utama

* **Manajemen Buku (CRUD):** Pengguna dapat **Menambah** buku baru, **Mengedit** detail buku yang ada, dan **Menghapus** buku dari koleksi.
* **Filter Status:** Buku dapat difilter secara instan berdasarkan statusnya: "All", "Milik", "Baca", atau "Beli".
* **Pencarian Cepat:** Pengguna dapat mencari buku secara *real-time* berdasarkan judul atau penulis.
* **Penyimpanan Lokal:** Data buku akan tetap tersimpan di browser (menggunakan `localStorage`) bahkan setelah browser ditutup, berkat *custom hook* `useLocalStorage`.
* **Halaman Statistik:** Halaman terpisah (`/stats`) yang menunjukkan ringkasan jumlah buku berdasarkan status, dihitung menggunakan *custom hook* `useBookStats`.

---

## Instruksi Instalasi dan Menjalankan

Anda memerlukan [Node.js](https://nodejs.org/) (v18 atau lebih baru) dan `npm` terinstal di komputer Anda.

1.  **Clone atau Unduh Proyek**
    (Jika ini proyek Git, clone repositori. Jika tidak, cukup ekstrak file ZIP).

2.  **Masuk ke Folder Proyek**
    ```sh
    cd manajemen-buku-choi
    ```

3.  **Instal Dependencies**
    Buka terminal di folder proyek dan jalankan:
    ```sh
    npm install
    ```

4.  **Menjalankan Aplikasi (Mode Development)**
    Setelah instalasi selesai, jalankan:
    ```sh
    npm start
    ```
    Aplikasi akan otomatis terbuka di browser Anda pada alamat `http://localhost:3000`.

5.  **Menjalankan Tes (Testing)**
    Untuk menjalankan tes unit, jalankan:
    ```sh
    npm test
    ```

---

## Penjelasan Fitur React yang Digunakan

Aplikasi ini dibangun sepenuhnya menggunakan **Functional Components** dengan **React Hooks**.

* **`useState`**: Digunakan untuk mengelola *state* lokal di dalam komponen.
    * **Contoh:** Di `BookForm.jsx` (untuk mengelola input `title`, `author`, `status`) dan di `Home.jsx` (untuk mengelola `filter`, `searchTerm`, dan buku yang sedang diedit).

* **`useEffect`**: Digunakan untuk *side effects* (efek samping).
    * **Contoh:** Di `useLocalStorage.js` (untuk menyinkronkan *state* ke `localStorage` setiap kali nilai *state* berubah) dan di `BookForm.jsx` (untuk mengisi *field* form secara otomatis ketika `bookToEdit` (props) berubah).

* **React Router (`react-router-dom`)**: Digunakan untuk membuat aplikasi menjadi Single Page Application (SPA) dengan navigasi multi-halaman.
    * **Contoh:** Di `App.js`, `<Router>`, `<Routes>`, dan `<Route>` digunakan untuk mengatur rute halaman `/` (Home) dan `/stats` (Statistik).

* **Context API (`createContext`, `useContext`)**: Digunakan untuk *state management* global, menghindari "prop drilling".
    * **Contoh:** `BookContext.js` membuat `BookProvider` yang menyimpan *state* global (`books`) dan fungsi (`addBook`, `deleteBook`, `updateBook`). Komponen lain seperti `Home.jsx` dan `BookItem.jsx` menggunakan *custom hook* `useBooks()` untuk mengakses *state* tersebut.

* **Custom Hooks**: Dua *custom hooks* dibuat untuk mengekstrak logika yang bisa dipakai ulang.
    * `useLocalStorage.js`: Sebuah *hook* yang menggabungkan `useState` dan `useEffect` untuk secara otomatis menyimpan *state* apapun ke `localStorage`.
    * `useBookStats.js`: Sebuah *hook* yang menerima *array* `books` dan menggunakan `useMemo` untuk menghitung statistik (total, milik, baca, beli) secara efisien.

---

## Laporan Testing

Tes unit ditulis menggunakan **Jest** dan **React Testing Library** untuk memastikan komponen dan logika bisnis berjalan sesuai harapan.

* Tes mencakup rendering komponen, simulasi interaksi pengguna (input form dan klik tombol), dan validasi logika *custom hook*.
* Semua tes berhasil dijalankan (PASS) setelah memperbaiki *missing dependency* dan *mocking module*.

**Hasil Tes:**

<br><img width="1403" height="657" alt="Screenshot 2025-11-01 110709" src="https://github.com/user-attachments/assets/70e36430-72e0-475c-95d2-ebdbc3f10aac" />
