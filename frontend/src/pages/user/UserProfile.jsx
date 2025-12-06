import { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';
import api from '../../utils/api';
import { User, Lock, Save } from 'lucide-react';

const UserProfile = () => {
  const { userInfo, setCredentials } = useAuthStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Password tidak cocok!', 'error');
      return;
    }

    try {
      const { data } = await api.put('/auth/profile', {
        name,
        email,
        password,
      });
      setCredentials(data);
      addToast('Profil berhasil diperbarui!', 'success');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      addToast('Gagal update profil', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Profil Saya</h2>
      
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <User size={18} /> Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              Email (Tidak dapat diubah)
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Ganti Password</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  <Lock size={18} /> Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Kosongkan jika tidak ingin mengganti"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
          >
            <Save size={20} />
            Simpan Perubahan
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserProfile;