import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import UserChat from '../pages/user/UserChat';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-80 md:w-96 border border-gray-200">
          <div className="bg-red-600 p-3 flex justify-between items-center text-white">
            <h3 className="font-bold">Live Chat Admin</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="h-[400px]">
            {/* Menggunakan komponen UserChat yang sudah dibuat, tapi disesuaikan stylingnya */}
            <UserChat isWidget={true} /> 
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;