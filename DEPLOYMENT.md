Panduan Deployment Inter Medi-A Store

Tahap 1: Deploy Backend (Render.com)

Push kode project ini ke GitHub.

Daftar/Login ke Render.com.

Klik New + -> Web Service.

Hubungkan repository GitHub Anda.

Konfigurasi:

Root Directory: backend (PENTING!)

Build Command: npm install

Start Command: node src/server.js

Di bagian Environment Variables, tambahkan:

MONGO_URI: (Connection string MongoDB Atlas Anda)

JWT_SECRET: (String acak untuk keamanan)

NODE_ENV: production

Klik Create Web Service.

Tunggu sampai selesai. Salin URL backend Anda (contoh: https://intermedia-api.onrender.com).

Catatan: Karena Render versi gratis "tidur" jika tidak aktif, request pertama mungkin lambat (30-60 detik).

Tahap 2: Deploy Frontend (Vercel)

Daftar/Login ke Vercel.com.

Klik Add New... -> Project.

Import repository GitHub yang sama.

Konfigurasi:

Root Directory: Edit menjadi frontend.

Framework Preset: Vite.

Di bagian Environment Variables, tambahkan:

VITE_API_URL: Masukkan URL Backend dari Tahap 1 (contoh: https://intermedia-api.onrender.com/api).

PERHATIAN: Jangan lupa tambahkan /api di ujung URL jika struktur route backend Anda menggunakan prefix /api.

Klik Deploy.

Tahap 3: Konfigurasi Terakhir

CORS di Backend:

Buka file backend/src/server.js.

Pastikan konfigurasi CORS mengizinkan domain Vercel Anda.

app.use(cors({
    origin: ['http://localhost:5173', '[https://project-kamu.vercel.app](https://project-kamu.vercel.app)'],
    credentials: true
}));


Commit dan Push perubahan ini agar Backend di Render terupdate.

Socket.IO di Frontend:

Buka frontend/src/utils/socket.js.

Pastikan URL mengarah ke backend production jika env variable disupport, atau hardcode URL backend production.

const ENDPOINT = import.meta.env.VITE_API_URL 
    ? '[https://intermedia-api.onrender.com](https://intermedia-api.onrender.com)' 
    : 'http://localhost:5000';


Selamat! Toko Inter Medi-A Anda kini sudah online! 🚀