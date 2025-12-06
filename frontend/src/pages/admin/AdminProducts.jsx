import { useEffect, useState } from 'react';
import api from '../../utils/api';
import useToastStore from '../../store/toastStore';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', stock: '' });
  const [files, setFiles] = useState(null);
  const { addToast } = useToastStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/product');
      setProducts(data);
    } catch (err) {
      addToast('Gagal memuat produk', 'error');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: '', description: '', stock: '' });
    setFiles(null);
    setIsEditing(false);
    setEditId(null);
    // Reset file input value manually if needed via ref, but standard usage is ok
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    if (files) {
        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }
    }

    try {
        if (isEditing) {
            await api.put(`/product/${editId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Produk berhasil diperbarui!', 'success');
        } else {
            await api.post('/product', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            addToast('Produk berhasil ditambah!', 'success');
        }
        loadProducts();
        resetForm();
    } catch (err) {
        console.error(err);
        addToast(isEditing ? 'Gagal update produk' : 'Gagal tambah produk', 'error');
    }
  };

  const handleDelete = async (id) => {
      if(window.confirm('Yakin ingin menghapus produk ini?')) {
          try {
            await api.delete(`/product/${id}`);
            addToast('Produk dihapus', 'success');
            loadProducts();
          } catch (err) {
            addToast('Gagal menghapus', 'error');
          }
      }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kelola Produk</h2>
      
      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
                {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h3>
            {isEditing && (
                <button onClick={resetForm} className="text-sm text-red-500 flex items-center hover:underline">
                    <X size={16} className="mr-1"/> Batal Edit
                </button>
            )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Nama Produk</label>
                <input 
                    required
                    value={formData.name}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Harga (Rp)</label>
                <input 
                    required
                    type="number" 
                    value={formData.price}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Kategori</label>
                <input 
                    required
                    value={formData.category}
                    placeholder="Contoh: Printer"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Stok</label>
                <input 
                    required
                    type="number" 
                    value={formData.stock}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={e => setFormData({...formData, stock: e.target.value})} 
                />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-600">Deskripsi</label>
                <textarea 
                    required
                    rows="3"
                    value={formData.description}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-600">
                    Upload Gambar {isEditing && <span className="text-gray-400 font-normal">(Biarkan kosong jika tidak ingin mengubah gambar)</span>}
                </label>
                <input 
                    type="file" 
                    multiple 
                    className="w-full border p-2 rounded bg-gray-50" 
                    onChange={e => setFiles(e.target.files)} 
                />
            </div>
            
            <button className={`col-span-1 md:col-span-2 text-white py-3 rounded font-bold transition flex justify-center items-center gap-2 ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isEditing ? <Pencil size={18} /> : <Plus size={18} />}
                {isEditing ? 'Update Produk' : 'Simpan Produk'}
            </button>
        </form>
      </div>

      {/* List Produk */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="p-4 font-semibold text-gray-600">Produk</th>
                    <th className="p-4 font-semibold text-gray-600">Harga</th>
                    <th className="p-4 font-semibold text-gray-600">Stok</th>
                    <th className="p-4 font-semibold text-gray-600 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-4">
                            <div className="font-medium text-gray-800">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.category}</div>
                        </td>
                        <td className="p-4 text-gray-700">Rp {p.price.toLocaleString()}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {p.stock} unit
                            </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                            <button 
                                onClick={() => handleEditClick(p)} 
                                className="text-blue-500 hover:bg-blue-50 p-2 rounded transition"
                                title="Edit"
                            >
                                <Pencil size={18} />
                            </button>
                            <button 
                                onClick={() => handleDelete(p._id)} 
                                className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                                title="Hapus"
                            >
                                <Trash2 size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500">Belum ada data produk.</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;