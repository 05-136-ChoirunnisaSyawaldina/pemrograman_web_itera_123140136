#  Task Quest Management

**Task Quest Management** adalah aplikasi web manajemen tugas yang dirancang khusus untuk mahasiswa. Dengan antarmuka yang ceria bertema pink dan efek *glassmorphism* yang modern, aplikasi ini membantu mengelola aktivitas akademik menjadi lebih mudah, visual, dan efisien.

Aplikasi ini dibangun menggunakan HTML, Tailwind CSS, dan JavaScript murni, serta memanfaatkan `localStorage` untuk menyimpan semua data tugas langsung di browser pengguna.

## Screenshot Aplikasi

Berikut adalah beberapa tangkapan layar yang menunjukkan fitur-fitur utama dari aplikasi.

**1. Tampilan Utama**<br>
<img width="1058" height="598" alt="image" src="https://github.com/user-attachments/assets/a329daf2-4fd1-4f00-9dfa-058a41a0dfc4" />

**2. Mode Edit Tugas**<br>  
<img width="1063" height="418" alt="image" src="https://github.com/user-attachments/assets/112dc823-b1d8-438c-8976-13291d9efa9f" />

**3. Fitur Filter dan Pencarian**<br>
<img width="1050" height="537" alt="image" src="https://github.com/user-attachments/assets/40ca3495-1630-4e2c-8d2e-e8f9e8ff3a1a" />

-----

##  Cara Menjalankan Aplikasi

1.  **Unduh File**: Unduh file `index.html` dan `script.js` dari repository ini.
2.  **Simpan di Folder yang Sama**: Pastikan kedua file tersebut berada dalam satu direktori (folder) yang sama.
3.  **Buka di Browser**: Buka file `index.html` menggunakan browser web modern seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.
4.  **Selesai\!** Aplikasi siap digunakan. Semua tugas yang Anda tambahkan akan tersimpan secara otomatis.

-----

##  Daftar Fitur yang Telah Diimplementasikan

  - [x] **Fungsionalitas CRUD Penuh**:
      - **Create**: Menambahkan tugas baru melalui form.
      - **Read**: Menampilkan semua tugas dalam bentuk kartu yang informatif.
      - **Update**: Mengedit detail tugas dan menandainya sebagai selesai/belum selesai.
      - **Delete**: Menghapus tugas yang sudah tidak diperlukan lagi.
  - [x] **Penyimpanan Lokal**: Menggunakan `localStorage` browser untuk menyimpan data, sehingga tugas tidak akan hilang bahkan setelah browser ditutup.
  - [x] **Statistik Real-time**: Tiga kartu statistik di bagian atas (Total, Belum Selesai, Sudah Selesai) akan diperbarui secara otomatis setiap kali ada perubahan data.
  - [x] **Filter dan Pencarian Cerdas**:
      - Memfilter tugas berdasarkan statusnya (Semua, Belum Selesai, Selesai).
      - Mencari tugas secara *real-time* berdasarkan **nama tugas** atau **nama mata kuliah**.
  - [x] **Validasi Form**: Memastikan semua kolom wajib diisi sebelum tugas dapat ditambahkan atau disimpan.
  - [x] **Desain UI/UX Modern**:
      - Desain *glassmorphism* (efek kaca) dengan latar belakang gradien pink yang menarik.
      - Peringatan visual untuk tugas mendesak (garis batas kartu berubah menjadi merah).
      - Animasi *fade-in* yang halus saat tugas ditampilkan.
      - Layout yang sepenuhnya responsif untuk tampilan optimal di desktop maupun perangkat mobile.

-----

##  Penjelasan Teknis

### 1\. Penggunaan `localStorage`

Aplikasi ini menjamin data pengguna tidak hilang dengan memanfaatkan `localStorage`.

  - **Penyimpanan Data**: Setiap kali ada aksi yang mengubah data (menambah, mengedit, menghapus, atau mengubah status), fungsi `saveTasks()` dipanggil. Fungsi ini mengubah array `tasks` menjadi format string JSON menggunakan `JSON.stringify()` dan menyimpannya ke `localStorage` dengan kunci `'tasks'`.

    ```javascript
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    ```

  - **Pengambilan Data**: Saat halaman pertama kali dimuat, aplikasi akan memeriksa `localStorage` untuk kunci `'tasks'`. Jika data ada, string JSON tersebut akan diubah kembali menjadi array objek JavaScript menggunakan `JSON.parse()`. Jika tidak ada, `tasks` akan diinisialisasi sebagai array kosong.

    ```javascript
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    ```

### 2\. Validasi Form

Untuk menjaga integritas data, validasi sederhana namun efektif diterapkan pada form.

  - **Logika Validasi**: Validasi terjadi di dalam *event listener* untuk `taskForm`. Sebelum data diproses, skrip akan memeriksa apakah input `name`, `course`, dan `deadline` memiliki nilai.
    ```javascript
    const name = taskNameInput.value.trim();
    const course = courseNameInput.value.trim();
    const deadline = taskDeadlineInput.value;

    if (!name || !course || !deadline) {
        alert('Harap isi semua kolom yang wajib diisi!');
        return; // Menghentikan proses jika ada input yang kosong
    }
    ```
  - **Umpan Balik Pengguna**: Jika salah satu dari kolom wajib tersebut kosong, sebuah `alert()` akan muncul untuk memberitahu pengguna, dan proses penambahan atau pengeditan tugas akan dihentikan. Ini memastikan tidak ada data yang tidak lengkap yang disimpan.
