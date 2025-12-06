import io from 'socket.io-client';

// Mengambil URL dasar tanpa "/api"
// Jika VITE_API_URL = https://api.com/api, kita butuh https://api.com untuk socket
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Regex sederhana untuk menghapus "/api" di akhir jika ada, karena socket connect ke root
const SOCKET_URL = API_URL.replace('/api', '');

export const socket = io(SOCKET_URL);