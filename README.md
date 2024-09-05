# Video Player App

Aplikasi pemutar video berbasis Node.js dengan fitur login dan logout.

## Fitur

- Login pengguna
- Logout pengguna
- Menyimpan dan mengelola data pengguna di database

## Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi terbaru)
- [MySQL](https://www.mysql.com/)

## Instalasi

1. Clone repositori ini:

    ```bash
    git clone https://github.com/fajarjulyana/video-player-nodejs-mysql.git
    ```

2. Masuk ke direktori proyek:

    ```bash
    cd video-player-nodejs-mysql
    ```

3. Instal dependensi:

    ```bash
    npm install
    ```

4. Buat file `.env` di root direktori proyek Anda dan tambahkan konfigurasi database Anda:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=videoplayerdb
    ```

5. Jalankan migrasi database untuk membuat tabel yang diperlukan:

    ```bash
    npx sequelize-cli db:migrate
    ```

## Menjalankan Aplikasi

Jalankan aplikasi menggunakan perintah:

```bash
node app.js
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## Rute

- `GET /`: Menampilkan halaman utama
- `GET /login`: Menampilkan halaman login
- `POST /login`: Mengautentikasi pengguna
- `GET /logout`: Mengeluarkan pengguna
- `GET /register`: Menampilkan halaman pendaftaran pengguna
- `POST /register`: Mendaftarkan pengguna baru

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan kirim pull request dengan perubahan Anda. Pastikan untuk mengikuti pedoman kontribusi yang ada.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

Jika Anda memiliki pertanyaan atau masalah, silakan hubungi [fajarjulyana](mailto:fajarjulyana1@gmail.com).

---

Terima kasih telah menggunakan aplikasi ini!
