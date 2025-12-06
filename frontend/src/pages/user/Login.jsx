import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setCredentials(data);
      navigate(data.isAdmin ? '/admin/dashboard' : '/');
    } catch (err) {
      alert('Login Gagal: Cek email/password');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-primary">Login Inter Medi-A</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-secondary text-white py-3 rounded hover:bg-blue-800">Masuk</button>
        <p className="text-center text-sm">
          Belum punya akun? <Link to="/register" className="text-primary">Daftar</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;