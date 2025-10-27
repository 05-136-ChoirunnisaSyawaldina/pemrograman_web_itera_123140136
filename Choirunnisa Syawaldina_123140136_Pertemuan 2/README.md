# Personal Dashboard (Pink/Purple Theme)

Ini adalah proyek *dashboard* personal sederhana yang dibuat dengan HTML, CSS, dan JavaScript modern (ES6+). Aplikasi ini dirancang sebagai halaman awal yang fungsional dan estetis, menampilkan informasi penting secara *real-time* dengan tema *glassmorphism* dan gradasi warna pink-ungu.

## Screenshot Aplikasi<br>
<img width="892" height="867" alt="image" src="https://github.com/user-attachments/assets/cf049fba-cc6a-414f-90ba-b84cc55ae306" />

## Fungsi & Fitur

Aplikasi ini memiliki beberapa fitur utama untuk membantu Anda tetap terorganisir:

* **Jam & Tanggal Real-time**: Menampilkan waktu dan tanggal saat ini secara langsung, diformat dalam Bahasa Indonesia.
* **Cuaca Live**: Mengambil data cuaca *real-time* (suhu dan kondisi) dari API Open-Meteo untuk lokasi yang telah ditentukan (Bandar Lampung).
* **Sistem Catatan (Notes)**:
    * **Buat Catatan**: Pengguna dapat menambahkan judul dan isi catatan baru.
    * **Hapus Catatan**: Catatan yang sudah ada dapat dihapus dengan mudah.
    * **Total Catatan**: Menampilkan hitungan jumlah total catatan yang tersimpan.
* **Penyimpanan Lokal**: Semua catatan disimpan di `localStorage` peramban (browser), sehingga data Anda tetap ada bahkan setelah me-refresh halaman.
* **Desain Modern**: Menggunakan efek *glassmorphism* untuk kartu, animasi *fade-in*, efek *hover*, dan *loading screen* yang mulus.
* **Responsif**: Tampilan disesuaikan untuk berbagai ukuran layar, dari desktop hingga *mobile*.

---

##  Fitur ES6+ yang Diimplementasikan

Proyek ini ditulis menggunakan sintaks JavaScript modern (ES6 dan yang lebih baru) untuk kode yang lebih bersih, terstruktur, dan efisien.

* **`Class`**: Menggunakan sintaks `class` untuk membuat *blueprint* `Note` dan `Dashboard`. Ini adalah pendekatan *Object-Oriented Programming* (OOP) untuk mengelola logika aplikasi.
* **`Arrow Functions`**: Digunakan secara ekstensif untuk:
    * *Event listeners* (contoh: `() => this.addNote()`).
    * *Class methods* (contoh: `loadFromStorage = () => {...}`) untuk secara otomatis mengikat konteks `this` ke *instance* kelas.
    * Fungsi *callback* singkat dalam *array methods* (contoh: `n => n.id !== id`).
* **`async/await`**: Digunakan dalam fungsi `fetchWeather` untuk menangani *asynchronous request* ke API cuaca. Ini membuat kode *asynchronous* terlihat seperti kode *synchronous* dan lebih mudah dibaca daripada menggunakan `.then()`.
* **`Template Literals`**: Digunakan untuk menyisipkan variabel dan ekspresi ke dalam string dengan mudah (menggunakan tanda *backtick* `` \` ``). Ini sangat berguna saat membuat *markup* HTML di `renderNotes` dan memformat teks di jam dan cuaca.
* **`Object Destructuring`**: Digunakan di `fetchWeather` untuk mengekstrak properti (`temperature`, `weathercode`) langsung dari objek respons JSON API (`const { temperature, weathercode } = data.current_weather;`).
* **`Array Methods (.map & .filter)`**:
    * `.map()`: Digunakan di `renderNotes` untuk mengubah *array* objek *notes* menjadi *array* string HTML.
    * `.filter()`: Digunakan di `deleteNote` untuk membuat *array* baru yang berisi semua catatan *kecuali* catatan yang ingin dihapus.
* **`ES Modules`**: File `app.js` dimuat di `index.html` menggunakan `type="module"`, yang merupakan cara standar ES6 untuk mengimpor dan mengekspor fungsionalitas antar file.
* **`const`**: Digunakan untuk mendeklarasikan variabel yang nilainya tidak akan diubah (bersifat *immutable*), yang membantu mencegah *bug* akibat perubahan nilai yang tidak disengaja.
