import { useState } from 'react';
import useCartStore from '../../store/cartStore';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.images[0],
        price: item.price
    }));

    try {
      await api.post('/order', {
        orderItems,
        shippingAddress: { address, city, postalCode: '12345', country: 'Indonesia' },
        paymentMethod: 'Transfer Bank',
        totalPrice
      });
      clearCart();
      navigate('/orders');
    } catch (err) {
      alert('Gagal buat pesanan');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Pengiriman</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block mb-1">Alamat Lengkap</label>
            <textarea 
                className="w-full border p-2 rounded" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
            />
        </div>
        <div>
            <label className="block mb-1">Kota</label>
            <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required 
            />
        </div>
        
        <div className="border-t pt-4">
            <h3 className="font-bold">Total Pembayaran: Rp {totalPrice.toLocaleString()}</h3>
            <p className="text-sm text-gray-500 mb-4">Silakan transfer ke BCA 1234567890 a.n Inter Medi-A</p>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">
                Buat Pesanan
            </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;