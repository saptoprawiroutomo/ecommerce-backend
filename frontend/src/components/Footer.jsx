import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Inter <span className="text-red-500">Medi-A</span></h3>
          <p className="text-sm leading-relaxed">
            Mitra terpercaya untuk kebutuhan mesin fotocopy, printer, komputer, dan jasa servis profesional sejak 2010.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Menu Cepat</h4>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-red-500 transition">Produk Kami</Link></li>
            <li><Link to="/cart" className="hover:text-red-500 transition">Keranjang</Link></li>
            <li><Link to="/orders" className="hover:text-red-500 transition">Cek Pesanan</Link></li>
            <li><Link to="/login" className="hover:text-red-500 transition">Login Member</Link></li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Layanan</h4>
          <ul className="space-y-2">
            <li>Servis Mesin Fotocopy</li>
            <li>Servis Printer & Laptop</li>
            <li>Sewa Mesin Fotocopy</li>
            <li>Pengadaan Alat Kantor</li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-red-500 shrink-0" />
              <span>Jl. Klingkit Dalam Blok C No. 22, Cengkareng, Jakarta Barat 11470</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-500" />
              <span>0895-3339-61424</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-500" />
              <span>medyyes.krps@gmail.com</span>
            </li>
            <li className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white"><Facebook /></a>
              <a href="#" className="hover:text-white"><Instagram /></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Inter Medi-A Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;