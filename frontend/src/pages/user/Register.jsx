import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useAuthStore from '../../store/authStore';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      setCredentials(data);
      navigate('/');
    } catch (err) {
      alert('Register Gagal');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-primary">Daftar Akun</h2>
        <input 
          type="text" 
          placeholder="Nama Lengkap" 
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="w-full bg-secondary text-white py-3 rounded hover:bg-blue-800">Daftar</button>
      </form>
    </div>
  );
};

export default Register;