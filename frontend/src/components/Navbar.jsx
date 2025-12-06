import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/30">
                IM
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
                Inter<span className="text-red-600">Medi-A</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 font-medium hover:text-red-600 transition">Beranda</Link>
            <Link to="/about" className="text-gray-600 font-medium hover:text-red-600 transition">Tentang Kami</Link>
            <Link to="/services" className="text-gray-600 font-medium hover:text-red-600 transition">Layanan</Link>
            <Link to="/products" className="text-gray-600 font-medium hover:text-red-600 transition">Produk</Link>
          </div>
          
          {/* Icons & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-red-600 transition group">
              <ShoppingBag className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-4 pl-4 border-l">
                <Link to={userInfo.isAdmin ? "/admin/dashboard" : "/profile"} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                   </div>
                   <span className="max-w-[100px] truncate">{userInfo.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 text-sm">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative text-gray-700">
                <ShoppingBag className="w-6 h-6" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                    </span>
                )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg absolute w-full left-0 animate-slide-in-top">
          <Link to="/" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Beranda</Link>
          <Link to="/about" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Tentang Kami</Link>
          <Link to="/services" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Layanan</Link>
          <Link to="/products" className="block py-2 text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Produk</Link>
          {userInfo ? (
            <div className="border-t pt-4">
                <Link to="/profile" className="flex items-center gap-2 py-2 font-bold text-blue-600" onClick={() => setIsOpen(false)}>
                    <User size={18} /> Akun Saya
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-red-500 w-full text-left">
                    <LogOut size={18} /> Logout
                </button>
            </div>
          ) : (
            <Link to="/login" className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-bold mt-4" onClick={() => setIsOpen(false)}>
                Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;