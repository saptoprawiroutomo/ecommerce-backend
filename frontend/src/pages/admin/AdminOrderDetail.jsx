import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import useToastStore from '../../store/toastStore';
import { ArrowLeft, Printer, Truck, CheckCircle } from 'lucide-react';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/order/${id}`);
        setOrder(data);
      } catch (error) {
        addToast('Gagal memuat detail order', 'error');
      }
    };
    fetchOrder();
  }, [id, addToast]);

  const updateStatus = async (status) => {
      try {
        await api.put(`/order/${id}/deliver`, { status });
        setOrder({ ...order, status });
        addToast(`Status diubah menjadi ${status}`, 'success');
      } catch (error) {
        addToast('Gagal update status', 'error');
      }
  };

  if (!order) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-8">
      {/* Header untuk Print (Disembunyikan saat print kecuali bagian tertentu) */}
      <div className="bg-gray-50 p-6 border-b flex justify-between items-center print:hidden">
        <Link to="/admin/orders" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} /> Kembali
        </Link>
        <div className="flex gap-3">
            <button onClick={() => window.print()} className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
                <Printer size={18} /> Cetak Invoice
            </button>
            {order.status !== 'Shipped' && order.status !== 'Completed' && (
                <button onClick={() => updateStatus('Shipped')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <Truck size={18} /> Kirim Barang
                </button>
            )}
            {order.status === 'Shipped' && (
                <button onClick={() => updateStatus('Completed')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    <CheckCircle size={18} /> Selesai
                </button>
            )}
        </div>
      </div>

      {/* Area Invoice */}
      <div className="p-8" id="invoice-area">
        <div className="flex justify-between items-start border-b pb-8 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                <p className="text-gray-500">#{order._id}</p>
                <p className="text-sm text-gray-400 mt-1">Tanggal: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-bold text-blue-800">Inter Medi-A Store</h2>
                <p className="text-gray-600 text-sm">Jl. Klingkit Dalam Blok C No. 22</p>
                <p className="text-gray-600 text-sm">Cengkareng, Jakarta Barat</p>
                <p className="text-gray-600 text-sm">HP: 0895-3339-61424</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <h3 className="text-gray-600 font-bold mb-2">Penerima:</h3>
                <p className="font-bold text-lg">{order.user?.name}</p>
                <p className="text-gray-600">{order.user?.email}</p>
            </div>
            <div className="text-right">
                <h3 className="text-gray-600 font-bold mb-2">Alamat Pengiriman:</h3>
                <p className="text-gray-800">{order.shippingAddress.address}</p>
                <p className="text-gray-800">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p className="text-gray-800">{order.shippingAddress.country}</p>
            </div>
        </div>

        {/* Tabel Items */}
        <table className="w-full mb-8">
            <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="text-left p-3">Produk</th>
                    <th className="text-right p-3">Harga</th>
                    <th className="text-center p-3">Qty</th>
                    <th className="text-right p-3">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {order.orderItems.map((item, index) => (
                    <tr key={index} className="border-b">
                        <td className="p-3">{item.name}</td>
                        <td className="text-right p-3">Rp {item.price.toLocaleString()}</td>
                        <td className="text-center p-3">{item.qty}</td>
                        <td className="text-right p-3 font-medium">Rp {(item.price * item.qty).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex justify-end">
            <div className="w-1/2">
                <div className="flex justify-between border-b py-2">
                    <span className="font-bold text-xl">Total Tagihan</span>
                    <span className="font-bold text-xl text-blue-700">Rp {order.totalPrice.toLocaleString()}</span>
                </div>
                <div className="mt-4 text-right">
                    <span className={`inline-block px-3 py-1 rounded text-sm font-bold border ${
                        order.status === 'Paid' || order.status === 'Shipped' || order.status === 'Completed' 
                        ? 'border-green-500 text-green-600 bg-green-50' 
                        : 'border-yellow-500 text-yellow-600 bg-yellow-50'
                    }`}>
                        STATUS: {order.status.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>

        {/* Bukti Bayar Section (Hanya tampil jika ada & tidak print) */}
        {order.paymentResult?.proofImage && (
            <div className="mt-10 border-t pt-6 print:hidden">
                <h3 className="font-bold mb-4">Bukti Pembayaran:</h3>
                <a href={`http://localhost:5000${order.paymentResult.proofImage}`} target="_blank" rel="noreferrer">
                    <img 
                        src={`http://localhost:5000${order.paymentResult.proofImage}`} 
                        alt="Bukti Transfer" 
                        className="max-w-xs border rounded shadow hover:scale-105 transition duration-300"
                    />
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetail;