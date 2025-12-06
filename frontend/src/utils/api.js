import axios from 'axios';

// Menggunakan Environment Variable VITE_API_URL jika ada, kalau tidak fallback ke localhost
// Saat deploy di Vercel, kita set VITE_API_URL di setting environment variables.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;