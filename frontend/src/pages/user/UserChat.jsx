import { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';
import api from '../../utils/api';
import useAuthStore from '../../store/authStore';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { userInfo } = useAuthStore();
  // Asumsi User chat ke Admin dengan ID tertentu atau sistem broadcast
  // Untuk simplifikasi demo, kita set hardcode admin ID atau logika sender/receiver
  // Di sini user join room ID mereka sendiri
  
  useEffect(() => {
    socket.emit('join_room', userInfo._id);

    // Ambil history chat (Disini butuh ID admin yang dituju, misal admin ID statis jika single admin)
    // api.get(`/chat/${adminId}`).then(...) 
    
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [userInfo]);

  const sendMessage = () => {
    // Demo: Kirim ke diri sendiri dulu untuk tes UI, idealnya ke Admin ID
    const msgData = {
        sender: userInfo._id,
        receiver: userInfo._id, // Harusnya Admin ID
        message: input
    };
    
    // Optimistic UI
    setMessages([...messages, msgData]);
    socket.emit('send_message', msgData);
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto border rounded-lg h-[500px] flex flex-col bg-white">
      <div className="bg-primary text-white p-4 font-bold rounded-t-lg">Chat Admin</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
            <div key={i} className={`p-2 rounded max-w-[80%] ${msg.sender === userInfo._id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
                {msg.message}
            </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-l" 
            placeholder="Ketik pesan..."
        />
        <button onClick={sendMessage} className="bg-secondary text-white px-4 rounded-r">Kirim</button>
      </div>
    </div>
  );
};

export default UserChat;