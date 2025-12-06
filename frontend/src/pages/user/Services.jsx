import { Wrench, Printer, Monitor, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: <Printer size={40} />,
      title: "Servis Mesin Fotocopy",
      desc: "Perbaikan berbagai merek mesin fotocopy (Canon, Fuji Xerox) dengan sparepart berkualitas. Penanganan paper jam, error code, hingga overhaul.",
      price: "Mulai Rp 150.000"
    },
    {
      icon: <Wrench size={40} />,
      title: "Servis Printer",
      desc: "Servis printer inkjet & laserjet. Masalah tinta mampet, reset waste ink pad, ganti head, dan pemasangan infus sistem.",
      price: "Mulai Rp 75.000"
    },
    {
      icon: <Monitor size={40} />,
      title: "Servis Komputer/Laptop",
      desc: "Install ulang Windows, basmi virus, upgrade SSD/RAM, ganti layar LCD, keyboard, dan perbaikan hardware lainnya.",
      price: "Mulai Rp 100.000"
    },
    {
      icon: <FileText size={40} />,
      title: "Jasa Dokumen",
      desc: "Layanan Fotocopy, Jilid Skripsi/Laporan, Laminating, Scan Dokumen, dan Print Warna/Hitam Putih.",
      price: "Harga Bersaing"
    }
  ];

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan <span className="text-blue-600">Profesional</span></h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami menyediakan solusi teknis lengkap untuk menjaga produktivitas kantor Anda tetap berjalan lancar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {services.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.desc}</p>
            <p className="font-bold text-red-600">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Booking Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Memilih Kami?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
                <div className="flex justify-center mb-4 text-green-500"><CheckCircle size={32} /></div>
                <h4 className="font-bold mb-2">Teknisi Berpengalaman</h4>
                <p className="text-sm text-gray-500">Tim kami ahli menangani berbagai kerusakan perangkat kantor.</p>
            </div>
            <div className="p-4">
                <div className="flex justify-center mb-4 text-green-500"><CheckCircle size={32} /></div>
                <h4 className="font-bold mb-2">Bergaransi</h4>
                <p className="text-sm text-gray-500">Setiap jasa servis kami lengkapi dengan garansi pengerjaan.</p>
            </div>
            <div className="p-4">
                <div className="flex justify-center mb-4 text-green-500"><CheckCircle size={32} /></div>
                <h4 className="font-bold mb-2">Harga Transparan</h4>
                <p className="text-sm text-gray-500">Biaya dikonfirmasi di awal sebelum pengerjaan dimulai.</p>
            </div>
        </div>
        <div className="text-center mt-12">
            <Link to="/products" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
                Lihat Sparepart & Produk
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;