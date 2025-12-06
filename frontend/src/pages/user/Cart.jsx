import useCartStore from '../../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong. <Link to="/products" className="text-primary">Belanja yuk!</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-4 border-b pb-4">
                <img src={`http://localhost:5000${item.images[0]}`} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Rp {item.price.toLocaleString()}</p>
                  <p>Qty: {item.qty}</p>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-sm mt-2">Hapus</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">Ringkasan</h3>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold">Rp {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white py-3 rounded hover:bg-red-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;