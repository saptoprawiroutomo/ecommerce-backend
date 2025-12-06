import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Trash2, Plus } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/category');
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await api.post('/category', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      alert('Gagal menambah kategori');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus kategori ini?')) {
      try {
        await api.delete(`/category/${id}`);
        fetchCategories();
      } catch (error) {
        alert('Gagal menghapus kategori');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Kelola Kategori</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Tambah */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Tambah Kategori Baru</h3>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nama Kategori (contoh: Printer)"
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              <Plus />
            </button>
          </form>
        </div>

        {/* List Kategori */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Nama Kategori</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{cat.name}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan="2" className="p-4 text-center text-gray-500">Belum ada kategori</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;