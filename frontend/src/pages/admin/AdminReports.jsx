import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Printer } from 'lucide-react';

const AdminReports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/order/stats');
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Menyiapkan Laporan...</div>;
  if (!stats) return <div className="p-10 text-center text-red-500">Gagal memuat data laporan.</div>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      
      {/* Tombol Print (Sembunyi saat diprint) */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h2 className="text-3xl font-bold text-gray-800">Laporan & Statistik</h2>
        <button 
          onClick={() => window.print()} 
          className="bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition"
        >
          <Printer size={20} /> Cetak Laporan
        </button>
      </div>

      {/* Header Laporan (Tampil saat diprint) */}
      <div className="hidden print:block text-center mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold uppercase">Laporan Inter Medi-A Store</h1>
        <p>Jl. Klingkit Dalam Blok C No. 22, Cengkareng, Jakarta Barat</p>
        <p className="text-sm text-gray-500">Dicetak pada: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-12 print:space-y-8">
        
        {/* 1. Laporan Pendapatan */}
        <section className="bg-white p-6 rounded-xl shadow-sm border print:shadow-none print:border-none">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">1. Ringkasan Pendapatan</h3>
          <div className="bg-blue-50 p-4 rounded border border-blue-100 print:bg-white print:border-black">
            <p className="text-lg">Total Pendapatan Bersih (Status Paid/Completed)</p>
            <p className="text-4xl font-bold text-blue-700 print:text-black">Rp {stats.income.toLocaleString()}</p>
          </div>
        </section>

        {/* 2. Laporan Penjualan Harian */}
        <section className="bg-white p-6 rounded-xl shadow-sm border print:shadow-none print:border-none print:break-inside-avoid">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-green-500 pl-3">2. Laporan Penjualan Harian</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b print:bg-gray-200">
                <th className="p-3 border">Tanggal</th>
                <th className="p-3 border text-center">Jumlah Transaksi</th>
                <th className="p-3 border text-right">Total Penjualan</th>
              </tr>
            </thead>
            <tbody>
              {stats.dailySales.map((day) => (
                <tr key={day._id} className="border-b">
                  <td className="p-3 border">{day._id}</td>
                  <td className="p-3 border text-center">{day.count}</td>
                  <td className="p-3 border text-right">Rp {day.totalSales.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 3. Laporan Produk Terlaris */}
        <section className="bg-white p-6 rounded-xl shadow-sm border print:shadow-none print:border-none print:break-inside-avoid">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-orange-500 pl-3">3. Laporan Produk Terlaris (Top 5)</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b print:bg-gray-200">
                <th className="p-3 border">Nama Produk</th>
                <th className="p-3 border text-center">Unit Terjual</th>
              </tr>
            </thead>
            <tbody>
              {stats.bestSellers.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border text-center font-bold">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 4. Laporan Pelanggan Terbaik */}
        <section className="bg-white p-6 rounded-xl shadow-sm border print:shadow-none print:border-none print:break-inside-avoid">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">4. Laporan Pelanggan Terbaik</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b print:bg-gray-200">
                <th className="p-3 border">Nama Pelanggan</th>
                <th className="p-3 border text-center">Total Order</th>
                <th className="p-3 border text-right">Total Belanja</th>
              </tr>
            </thead>
            <tbody>
              {stats.topCustomers.map((cust, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3 border">{cust.name}</td>
                  <td className="p-3 border text-center">{cust.orderCount}</td>
                  <td className="p-3 border text-right">Rp {cust.totalSpent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Footer Tanda Tangan (Hanya Print) */}
        <div className="hidden print:flex justify-end mt-20 pr-10">
          <div className="text-center">
            <p>Jakarta, {new Date().toLocaleDateString()}</p>
            <p className="mt-20 border-t border-black px-10">Administrator / Pemilik</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminReports;