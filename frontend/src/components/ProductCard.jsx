import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <img 
        src={product.images[0] ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/300'} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-bold">Rp {product.price.toLocaleString()}</span>
          <Link to={`/product/${product._id}`} className="bg-secondary text-white px-3 py-1 rounded hover:bg-blue-800 text-sm">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;