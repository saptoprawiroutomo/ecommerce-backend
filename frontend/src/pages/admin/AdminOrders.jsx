import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../utils/api';
import useToastStore from '../../store/toastStore';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { addToast } = useToastStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
        const { data } = await api.get('/order');
        setOrders(data);
    } catch (err) {
        addToast('Gagal memuat pesanan', 'error');
    }
  };

  const updateStatus = async (id, status) => {
      try {
        await api.put(`/order/${id}/deliver`, { status });
        addToast('Status diperbarui', 'success');
        fetchOrders();
      } catch (err) {
        addToast('Gagal update status', 'error');
      }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola Pesanan</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left text-sm">
              <thead className="bg-gray-100">
                  <tr>
                      <th className="p-3">ID Order</th>
                      <th>User</th>
                      <th>Total</th>
                      <th>Bukti</th>
                      <th>Status</th>
                      <th>Aksi</th>
                  </tr>
              </thead>
              <tbody>
                  {orders.map(order => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono">
                              <Link to={`/admin/order/${order._id}`} className="text-blue-600 font-bold hover:underline">
                                {order._id.substring(0, 8)}...
                              </Link>
                          </td>
                          <td>{order.user?.name || 'Deleted User'}</td>
                          <td>Rp {order.totalPrice.toLocaleString()}</td>
                          <td>
                              {order.paymentResult?.proofImage ? (
                                  <a href={`http://localhost:5000${order.paymentResult.proofImage}`} target="_blank" className="text-blue-500 underline" rel="noreferrer">Lihat</a>
                              ) : '-'}
                          </td>
                          <td>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                  order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                              }`}>{order.status}</span>
                          </td>
                          <td className="space-x-2">
                              {/* Quick Actions */}
                              {order.status !== 'Shipped' && order.status !== 'Completed' && (
                                  <button onClick={() => updateStatus(order._id, 'Shipped')} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">Kirim</button>
                              )}
                              {order.status === 'Shipped' && (
                                  <button onClick={() => updateStatus(order._id, 'Completed')} className="text-green-600 hover:bg-green-50 px-2 py-1 rounded">Selesai</button>
                              )}
                              <Link to={`/admin/order/${order._id}`} className="text-gray-500 hover:text-gray-700 px-2">Detail</Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default AdminOrders;