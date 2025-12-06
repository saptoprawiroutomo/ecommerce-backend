import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';
import { Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const { addToCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/product/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/product/${id}/reviews`, { rating, comment });
      addToast('Ulasan berhasil dikirim', 'success');
      setComment('');
      fetchProduct(); // Reload data
    } catch (error) {
      addToast('Gagal mengirim ulasan / Anda sudah mereview', 'error');
    }
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div>
      {/* Product Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <img 
              src={product.images[0] ? `http://localhost:5000${product.images[0]}` : ''} 
              className="w-full rounded-lg shadow-lg" 
              alt={product.name} 
          />
          <div className="flex mt-4 gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                  <img key={idx} src={`http://localhost:5000${img}`} className="w-20 h-20 rounded border object-cover cursor-pointer" />
              ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
            </div>
            <span className="text-gray-500">({product.numReviews} Ulasan)</span>
          </div>

          <p className="text-3xl text-primary font-bold">Rp {product.price.toLocaleString()}</p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-semibold mb-2">Deskripsi Produk</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
            </span>
          </div>

          <button 
            onClick={() => {
              addToCart(product, 1);
              navigate('/cart');
            }}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-lg text-lg font-bold shadow-lg transition transform hover:-translate-y-1 ${
                product.stock > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? '+ Keranjang' : 'Stok Habis'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t pt-10">
        <div>
            <h2 className="text-2xl font-bold mb-6">Ulasan Pelanggan</h2>
            {product.reviews.length === 0 && <p className="text-gray-500 italic">Belum ada ulasan untuk produk ini.</p>}
            
            <div className="space-y-6">
                {product.reviews.map((review) => (
                    <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between mb-2">
                            <strong className="text-gray-800">{review.name}</strong>
                            <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{review.createdAt.substring(0, 10)}</p>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-6">Tulis Ulasan</h2>
            {userInfo ? (
                <form onSubmit={submitReview} className="bg-gray-50 p-6 rounded-xl border">
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Rating</label>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full border p-3 rounded bg-white"
                        >
                            <option value="5">5 - Sangat Bagus</option>
                            <option value="4">4 - Bagus</option>
                            <option value="3">3 - Biasa Saja</option>
                            <option value="2">2 - Buruk</option>
                            <option value="1">1 - Sangat Buruk</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Komentar</label>
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border p-3 rounded bg-white h-32"
                            placeholder="Bagaimana pengalaman Anda menggunakan produk ini?"
                            required
                        ></textarea>
                    </div>
                    <button className="bg-primary text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition">
                        Kirim Ulasan
                    </button>
                </form>
            ) : (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                    <p className="text-gray-700 mb-4">Silakan login untuk menulis ulasan.</p>
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">Login Sekarang</Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;