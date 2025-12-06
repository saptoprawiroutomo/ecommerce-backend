import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Maaf, halaman yang Anda cari mungkin telah dihapus atau alamat URL salah.
      </p>
      <Link 
        to="/" 
        className="mt-8 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition flex items-center gap-2"
      >
        <Home size={20} />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;