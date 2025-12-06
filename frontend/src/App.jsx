import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBubble from './components/ChatBubble';
import Toast from './components/Toast';

import Home from './pages/user/Home';
import About from './pages/user/About'; // NEW
import Services from './pages/user/Services'; // NEW
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Products from './pages/user/Products';
import ProductDetail from './pages/user/ProductDetail';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Orders from './pages/user/Orders';
import PaymentProof from './pages/user/PaymentProof';
import UserChat from './pages/user/UserChat';
import UserProfile from './pages/user/UserProfile';
import NotFound from './pages/NotFound';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminCategories from './pages/admin/AdminCategories';
import AdminChat from './pages/admin/AdminChat';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReports from './pages/admin/AdminReports';

import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useAuthStore();
  if (!userInfo) return <Navigate to="/login" />;
  if (adminOnly && !userInfo.isAdmin) return <Navigate to="/" />;
  return children;
};

function App() {
  const { userInfo } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <Toast />
        
        <main className="flex-grow pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full pb-12">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* NEW */}
            <Route path="/services" element={<Services />} /> {/* NEW */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Protected User Routes */}
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/order/:id/payment" element={<ProtectedRoute><PaymentProof /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><UserChat /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute adminOnly><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/order/:id" element={<ProtectedRoute adminOnly><AdminOrderDetail /></ProtectedRoute>} />
            <Route path="/admin/chat" element={<ProtectedRoute adminOnly><AdminChat /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviews /></ProtectedRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        {userInfo && !userInfo.isAdmin && <ChatBubble />}
      </div>
    </BrowserRouter>
  );
}

export default App;