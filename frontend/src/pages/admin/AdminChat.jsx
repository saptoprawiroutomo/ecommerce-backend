import { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';
import api from '../../utils/api';
import useAuthStore from '../../store/authStore';

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { userInfo } = useAuthStore();

  // 1. Load users (Real Logic)
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/chat/users');
            setUsers(data);
        } catch (error) {
            console.error("Gagal load chat list");
        }
    };
    fetchUsers();

    // Listen incoming global messages to update Sidebar if new user chats
    socket.emit('join_room', userInfo._id); 
    
    // Refresh list jika ada pesan baru masuk (optional enhancement)
    socket.on('receive_message', () => {
        fetchUsers(); 
    });
  }, [userInfo]);

  // 2. Load Chat History
  useEffect(() => {
    if (!selectedUser) return;
    
    const fetchChat = async () => {
      const { data } = await api.get(`/chat/${selectedUser._id}`);
      setMessages(data);
    };
    fetchChat();

    const handleMessage = (data) => {
        if (data.sender === selectedUser._id || data.receiver === selectedUser._id) {
            setMessages((prev) => [...prev, data]);
        }
    };

    socket.on('receive_message', handleMessage);
    return () => socket.off('receive_message', handleMessage);
  }, [selectedUser]);

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    const msgData = {
      sender: userInfo._id,
      receiver: selectedUser._id,
      message: input
    };

    socket.emit('send_message', msgData);
    setMessages([...messages, msgData]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white border rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar List User */}
      <div className="w-1/3 border-r bg-gray-50 flex flex-col">
        <div className="p-4 font-bold border-b bg-gray-100 flex justify-between items-center">
            <span>Inbox Pesan</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{users.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users.map((u) => (
            <div 
              key={u._id} 
              onClick={() => setSelectedUser(u)}
              className={`p-4 border-b cursor-pointer hover:bg-blue-50 transition ${selectedUser?._id === u._id ? 'bg-blue-100' : ''}`}
            >
              <div className="font-semibold text-gray-800">{u.name}</div>
              <div className="text-xs text-gray-500 truncate">{u.email}</div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">
                Belum ada pesan masuk.
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white shadow-sm font-bold flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    {selectedUser.name.charAt(0)}
                </div>
                <span>{selectedUser.name}</span>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === userInfo._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg shadow-sm text-sm ${
                    msg.sender === userInfo._id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <input 
                className="flex-1 border p-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Balas pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-semibold shadow-md transition"
              >
                Kirim
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <p>Pilih percakapan dari sidebar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;