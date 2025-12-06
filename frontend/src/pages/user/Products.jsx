import { useEffect, useState } from 'react';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';
import { Search } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi fetch dengan keyword
  const fetchProducts = async (search = '') => {
    setLoading(true);
    try {
        const { data } = await api.get(`/product?keyword=${search}`);
        setProducts(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(keyword);
  };

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Katalog Produk</h2>
        
        <form onSubmit={handleSearch} className="flex w-full md:w-1/2 relative">
            <input 
                type="text" 
                placeholder="Cari mesin fotocopy, printer..." 
                className="w-full border-2 border-gray-200 p-3 rounded-full pl-5 focus:outline-none focus:border-blue-500 transition"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button 
                type="submit"
                className="absolute right-1 top-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
                <Search size={20} />
            </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Memuat produk...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
            <p className="text-xl text-gray-600">Produk tidak ditemukan.</p>
            <button onClick={() => {setKeyword(''); fetchProducts('');}} className="mt-4 text-blue-500 hover:underline">
                Reset Pencarian
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Products;