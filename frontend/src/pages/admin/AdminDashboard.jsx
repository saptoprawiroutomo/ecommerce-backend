import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await api.get('/order/stats');
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-10">Loading Laporan...</div>;

  const chartData = {
    labels: stats.dailySales.map(x => x._id),
    datasets: [{
      label: 'Penjualan Harian (Rp)',
      data: stats.dailySales.map(x => x.totalSales),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3>Total Pendapatan</h3>
            <p className="text-2xl font-bold">Rp {stats.income.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3>Produk Terlaris</h3>
            <p className="text-xl font-bold">{stats.bestSellers[0]?.name || '-'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <h3>Pelanggan Top</h3>
            <p className="text-xl font-bold">{stats.topCustomers[0]?.name || '-'}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="mb-4 font-bold text-gray-700">Grafik Penjualan</h3>
        <Bar data={chartData} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="mb-4 font-bold text-gray-700">Top 5 Pelanggan</h3>
        <table className="w-full text-left">
            <thead>
                <tr className="border-b">
                    <th className="py-2">Nama</th>
                    <th>Total Belanja</th>
                    <th>Jumlah Order</th>
                </tr>
            </thead>
            <tbody>
                {stats.topCustomers.map((cust, i) => (
                    <tr key={i} className="border-b">
                        <td className="py-2">{cust.name}</td>
                        <td>Rp {cust.totalSpent.toLocaleString()}</td>
                        <td>{cust.orderCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;