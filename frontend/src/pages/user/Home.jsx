import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';
import { ArrowRight, Wrench, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch produk terbaru (limit 4)
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/product'); // Idealnya endpoint khusus ?limit=4
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Gagal load produk");
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-10">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="md:w-1/2 space-y-6 relative z-10">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-semibold text-red-400 mb-2 border border-white/10">
            Solusi Kantor #1 di Jakarta Barat
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Inter <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Medi-A</span>
            <br />Store
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
            Pusat penjualan mesin fotocopy, printer, komputer, dan jasa servis terpercaya. Kami menjamin kualitas dan layanan purna jual terbaik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/products" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
              Belanja Sekarang <ArrowRight size={20} />
            </Link>
            <Link to="/services" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition backdrop-blur-sm border border-white/10 text-center">
              Layanan Servis
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative z-10">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20"></div>
                <div className="w-72 h-72 md:w-96 md:h-96 bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm relative shadow-2xl">
                    <div className="text-center">
                        <span className="text-6xl font-black text-white/80">IM</span>
                        <p className="text-white/60 font-medium tracking-widest mt-2">STORE</p>
                    </div>
                    
                    {/* Floating Cards Decoration */}
                    <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl text-gray-800 animate-bounce">
                        <Wrench className="text-blue-600 mb-1" />
                        <span className="text-xs font-bold">Servis Kilat</span>
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl text-gray-800 animate-bounce animation-delay-1000">
                        <ShieldCheck className="text-green-600 mb-1" />
                        <span className="text-xs font-bold">Bergaransi</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Features Icons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
            { icon: <Truck size={32} />, title: "Pengiriman Cepat", desc: "Area Jakarta & Sekitarnya" },
            { icon: <ShieldCheck size={32} />, title: "Jaminan Garansi", desc: "Produk & Servis Resmi" },
            { icon: <Wrench size={32} />, title: "Teknisi Ahli", desc: "Berpengalaman 10+ Tahun" },
            { icon: <ArrowRight size={32} />, title: "Support 24/7", desc: "Layanan Pelanggan" },
        ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="text-blue-600 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
        ))}
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Produk Terbaru</h2>
                <p className="text-gray-500 mt-2">Pilihan terbaik minggu ini untuk Anda</p>
            </div>
            <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                Lihat Semua <ArrowRight size={16} />
            </Link>
        </div>
        
        {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">Memuat produk unggulan...</p>
            </div>
        )}
      </section>

    </div>
  );
};

export default Home;