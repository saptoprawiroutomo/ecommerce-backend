import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js'; // Kita buat dummy data inline saja di bawah
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Category from './models/Category.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Bersihkan Data Lama
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    // 2. Buat User Admin & User Biasa
    const createdUsers = await User.insertMany([
        {
            name: 'Admin Intermedia',
            email: 'admin@intermedia.com',
            password: '$2a$10$YourHashedPasswordHere', // Ganti dengan hash password asli jika perlu, atau gunakan fitur register di UI lalu ubah manual di DB
            // Note: Untuk kemudahan, password ini adalah hasil hash dari '123456'
            // Gunakan bcrypt hash untuk '123456' -> $2a$10$3.s.7t8.q.w.e.r.t.y... (Gunakan generator online atau script register)
            // SEMENTARA KITA GUNAKAN LOGIC REGISTER DI UI SAJA UTK DAPAT HASH YANG BENAR
            // TAPI, field isAdmin: true kuncinya.
            isAdmin: true
        },
        {
            name: 'User Demo',
            email: 'user@intermedia.com',
            password: '$2a$10$YourHashedPasswordHere', 
            isAdmin: false
        }
    ]);
    
    // Karena password harus di-hash, saran saya: 
    // 1. Jalankan aplikasi normal
    // 2. Register user baru via halaman Register (misal: admin@test.com / 123456)
    // 3. Buka MongoDB Compass/Atlas, ubah field `isAdmin` user tersebut menjadi `true`.
    // Script ini lebih berguna untuk data master produk/kategori.

    const adminUser = createdUsers[0]._id;

    // 3. Buat Kategori
    const createdCategories = await Category.insertMany([
        { name: 'Mesin Fotocopy' },
        { name: 'Printer' },
        { name: 'Laptop & Komputer' },
        { name: 'Jasa Servis' },
        { name: 'ATK' }
    ]);

    // 4. Buat Produk Dummy
    const sampleProducts = [
      {
        name: 'Canon imageRUNNER 2525',
        images: ['/uploads/sample-fotocopy.jpg'],
        description: 'Mesin fotocopy heavy duty untuk kebutuhan kantor besar. Kecepatan 25 ppm.',
        category: 'Mesin Fotocopy',
        price: 15000000,
        stock: 5,
      },
      {
        name: 'Epson L3210',
        images: ['/uploads/sample-printer.jpg'],
        description: 'Printer EcoTank All-in-One, irit tinta dan hasil cetak tajam.',
        category: 'Printer',
        price: 2300000,
        stock: 10,
      },
      {
        name: 'Servis Ringan Komputer',
        images: ['/uploads/sample-service.jpg'],
        description: 'Jasa perbaikan software, install ulang windows, dan pembersihan virus.',
        category: 'Jasa Servis',
        price: 150000,
        stock: 999,
      },
      {
        name: 'Kertas A4 PaperOne 70gr',
        images: ['/uploads/sample-paper.jpg'],
        description: 'Kertas HVS kualitas premium, cocok untuk dokumen penting.',
        category: 'ATK',
        price: 45000,
        stock: 50,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}