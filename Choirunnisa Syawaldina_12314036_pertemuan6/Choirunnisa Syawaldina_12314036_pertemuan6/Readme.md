## Deskripsi Proyek

Aplikasi ini adalah REST API sederhana untuk pengelolaan data Matakuliah yang dibangun menggunakan framework **Pyramid**. Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk entitas matakuliah.

## Cara Instalasi

Ikuti langkah-langkah berikut untuk menyiapkan environment pengembangan:

### 1\. Membuat Virtual Environment

Buat environment terisolasi agar dependensi tidak bentrok dengan sistem utama.

```bash
# Untuk Windows
python -m venv venv
venv\Scripts\activate

# Untuk Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

### 2\. Instalasi Dependensi

Install paket aplikasi dalam mode *editable* beserta dependensi testingnya.

```bash
pip install -e ".[testing]"
```


### 3\. Konfigurasi Database

Aplikasi ini menggunakan PostgreSQL. Pastikan kamu sudah membuat user dan database yang sesuai dengan konfigurasi di `development.ini`:

  * **URL**: `postgresql://user_matakuliah:pass_matakuliah@localhost:5432/pyramid_matakuliah`
  * Pastikan PostgreSQL server sudah berjalan di port 5432.

## Cara Menjalankan

### 1\. Menjalankan Migrasi (Inisialisasi Database)

Jalankan skrip inisialisasi untuk membuat tabel yang diperlukan di database.

```bash
initialize_pyramid_matakuliah_db development.ini
```

\*\*

### 2\. Menjalankan Server

Jalankan server aplikasi menggunakan `pserve`.

```bash
pserve development.ini
```

Server akan berjalan di `http://localhost:6543`.

-----

## API Endpoints

Berikut adalah dokumentasi endpoint yang tersedia untuk manajemen Matakuliah.

### 1\. Get All Matakuliah

Mengambil daftar semua matakuliah yang tersimpan.

  * **URL**: `/api/matakuliah`
  * **Method**: `GET`
  * **Success Response (200 OK)**:
    ```json
    {
      "matakuliahs": [
        {
          "id": 1,
          "kode_mk": "IF221",
          "nama_mk": "Pemrograman Web",
          "sks": 3,
          "semester": 4
        }
      ]
    }
    ```

### 2\. Get Matakuliah Detail

Mengambil data satu matakuliah berdasarkan ID.

  * **URL**: `/api/matakuliah/{id}`
  * **Method**: `GET`
  * **Success Response (200 OK)**:
    ```json
    {
      "matakuliah": {
        "id": 1,
        "kode_mk": "IF221",
        "nama_mk": "Pemrograman Web",
        "sks": 3,
        "semester": 4
      }
    }
    ```
  * **Error Response (404 Not Found)**:
    ```json
    { "error": "Matakuliah tidak ditemukan" }
    ```

### 3\. Add Matakuliah

Menambahkan data matakuliah baru.

  * **URL**: `/api/matakuliah`
  * **Method**: `POST`
  * **Body (JSON)**:
    ```json
    {
      "kode_mk": "IF305",
      "nama_mk": "Kecerdasan Buatan",
      "sks": 3,
      "semester": 5
    }
    ```
  * **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "matakuliah": {
        "id": 2,
        "kode_mk": "IF305",
        "nama_mk": "Kecerdasan Buatan",
        "sks": 3,
        "semester": 5
      }
    }
    ```
  * **Error Response (400 Bad Request)**: Jika ada field wajib yang kosong.

### 4\. Update Matakuliah

Memperbarui data matakuliah yang sudah ada berdasarkan ID.

  * **URL**: `/api/matakuliah/{id}`
  * **Method**: `PUT`
  * **Body (JSON)**:
    ```json
    {
      "nama_mk": "Kecerdasan Buatan Lanjut",
      "sks": 4
    }
    ```
  * **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "matakuliah": {
        "id": 2,
        "kode_mk": "IF305",
        "nama_mk": "Kecerdasan Buatan Lanjut",
        "sks": 4,
        "semester": 5
      }
    }
    ```

### 5\. Delete Matakuliah

Menghapus data matakuliah berdasarkan ID.

  * **URL**: `/api/matakuliah/{id}`
  * **Method**: `DELETE`
  * **Success Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Matakuliah ID 2 berhasil dihapus"
    }
    ```

-----

## Testing dengan cURL

Berikut adalah contoh perintah `curl` untuk menguji setiap endpoint via terminal.

**1. Test GET All**

```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**2. Test POST (Tambah Data)**

```bash
curl -X POST http://localhost:6543/api/matakuliah \
     -H "Content-Type: application/json" \
     -d '{"kode_mk": "IF101", "nama_mk": "Algoritma", "sks": 3, "semester": 1}'
```

**3. Test GET Detail (Ganti ID sesuai data yang ada)**

```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**4. Test PUT (Update Data)**

```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
     -H "Content-Type: application/json" \
     -d '{"sks": 4}'
```

**5. Test DELETE (Hapus Data)**

```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```
