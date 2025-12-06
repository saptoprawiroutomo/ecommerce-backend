Inter Medi-A Store - Full Stack E-Commerce

Aplikasi E-Commerce lengkap untuk Inter Medi-A (Toko Mesin Fotocopy, Komputer, & Servis) dengan fitur lengkap User & Admin.

🚀 Teknologi

Frontend: React, Vite, Tailwind CSS V3, Zustand, Axios.

Backend: Node.js, Express, MongoDB Atlas, Mongoose, JWT, Socket.IO.

Fitur: Cart, Checkout, Upload Bukti Transfer, Realtime Chat, Admin Dashboard, Laporan Penjualan.

📦 Struktur Folder

/backend: Server API & Database logic.

/frontend: User Interface React.

🛠️ Cara Menjalankan (Local / VSCode Web)

1. Setup Backend

Masuk ke folder backend: cd backend

Install dependencies: npm install

Buat file .env (copas dari .env.example) dan isi MONGO_URI Anda.

Buat folder untuk upload gambar: mkdir uploads

Jalankan server: npm run dev

Server berjalan di http://localhost:5000

2. Setup Frontend

Buka terminal baru.

Masuk ke folder frontend: cd frontend

Install dependencies: npm install

Jalankan frontend: npm run dev

Frontend berjalan di http://localhost:5173

3. Akun Admin Pertama Kali

Buka aplikasi di browser.

Register akun baru (misal: admin@intermedia.com).

Buka MongoDB Atlas (Database Anda).

Cari collection users, temukan user yang baru dibuat.

Edit field isAdmin dari false menjadi true.

Logout dan Login kembali. Menu Admin akan muncul di Navbar.

📸 Fitur Utama

User:

Belanja Produk & Checkout.

Upload Bukti Transfer (Status: Pending -> Paid).

Chat dengan Admin (Realtime).

Admin:

Dashboard Statistik (Omset, Produk Terlaris).

CRUD Produk & Kategori.

Update Status Pesanan (Shipped -> Completed).

Balas Chat User.