import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Star } from 'lucide-react';

const AdminReviews = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductsWithReviews = async () => {
            try {
                // Kita ambil semua produk, lalu filter yang punya review di frontend
                // Idealnya ada endpoint khusus /api/reviews tapi ini cukup untuk skala kecil
                const { data } = await api.get('/product');
                // Filter produk yang punya review saja
                const reviewedProducts = data.filter(p => p.reviews.length > 0);
                setProducts(reviewedProducts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductsWithReviews();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Ulasan Masuk</h2>
            
            {products.length === 0 ? (
                <div className="bg-white p-10 rounded shadow text-center text-gray-500">
                    Belum ada ulasan dari pelanggan.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-4 border-b pb-4">
                                <img src={`http://localhost:5000${product.images[0]}`} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Star size={14} className="text-yellow-400 fill-current" />
                                        <span>{product.rating.toFixed(1)} / 5.0</span>
                                        <span>({product.numReviews} ulasan)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                {product.reviews.map((review, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                                        <div className="flex justify-between font-semibold text-gray-700 mb-1">
                                            <span>{review.name}</span>
                                            <span className="text-yellow-500 flex items-center gap-1">
                                                {review.rating} <Star size={10} fill="currentColor" />
                                            </span>
                                        </div>
                                        <p className="text-gray-600 italic">"{review.comment}"</p>
                                        <p className="text-xs text-gray-400 mt-2 text-right">{review.createdAt.substring(0,10)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminReviews;