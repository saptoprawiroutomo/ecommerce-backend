import { useEffect, useState } from 'react';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await api.get('/order/myorders');
    setOrders(data);
  };

  const handleUpload = async (e, orderId) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('proof', file);

    try {
        await api.put(`/order/${orderId}/pay`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Bukti berhasil diupload!');
        fetchOrders();
    } catch (error) {
        alert('Gagal upload');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pesanan Saya</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border p-6 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between mb-4">
                <div>
                    <span className="font-bold">ID: {order._id}</span>
                    <span className={`ml-4 px-2 py-1 rounded text-sm ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {order.status}
                    </span>
                </div>
                <span className="font-bold text-primary">Rp {order.totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="space-y-2">
                {order.orderItems.map(item => (
                    <div key={item._id} className="flex justify-between text-gray-600">
                        <span>{item.name} x {item.qty}</span>
                        <span>Rp {item.price.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {order.status === 'Pending' && (
                <div className="mt-4 border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Bukti Transfer</label>
                    <input type="file" onChange={(e) => handleUpload(e, order._id)} className="mt-1" />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;