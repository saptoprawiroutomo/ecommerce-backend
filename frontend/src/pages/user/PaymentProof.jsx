import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const PaymentProof = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/order/${id}`);
        setOrder(data);
      } catch (error) {
        alert("Order tidak ditemukan");
        navigate('/orders');
      }
    };
    fetchOrder();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih file gambar terlebih dahulu");

    const formData = new FormData();
    formData.append('proof', file);

    setLoading(true);
    try {
      await api.put(`/order/${id}/pay`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Bukti pembayaran berhasil diunggah!');
      navigate('/orders');
    } catch (error) {
      alert('Gagal mengunggah bukti pembayaran');
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Bukti Transfer</h2>
      
      <div className="mb-6 bg-gray-50 p-4 rounded border">
        <p className="text-sm text-gray-600">ID Pesanan:</p>
        <p className="font-mono font-bold">{order._id}</p>
        <p className="text-sm text-gray-600 mt-2">Total Tagihan:</p>
        <p className="text-xl font-bold text-red-600">Rp {order.totalPrice.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Foto Bukti (JPG/PNG)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
        </button>
      </form>
    </div>
  );
};

export default PaymentProof;