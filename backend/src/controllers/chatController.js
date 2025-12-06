import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Get conversation between logged in user and specific userId
export const getChats = async (req, res) => {
  const { userId } = req.params; 
  const myId = req.user._id;

  const chats = await Chat.find({
    $or: [
      { sender: myId, receiver: userId },
      { sender: userId, receiver: myId }
    ]
  }).sort({ createdAt: 1 });

  res.json(chats);
};

// NEW: Get List of Users who have chatted with Admin
// Digunakan untuk Sidebar Admin Chat
export const getChatUsers = async (req, res) => {
    try {
        // Cari semua chat di mana receiver-nya adalah Admin (req.user._id)
        // Atau sender-nya adalah Admin (untuk melihat history chat keluar)
        // Tapi biasanya Admin ingin melihat inbox masuk.
        
        // Aggregation Pipeline untuk mendapatkan unique sender
        const users = await Chat.aggregate([
            {
                // Ambil chat yang melibatkan admin (sebagai sender atau receiver)
                $match: {
                    $or: [
                        { receiver: req.user._id }, 
                        { sender: req.user._id }
                    ]
                }
            },
            {
                // Group berdasarkan lawan bicara
                // Jika saya admin, lawan bicara saya adalah:
                // Jika sender == admin, maka lawan = receiver
                // Jika receiver == admin, maka lawan = sender
                $project: {
                    interlocutor: {
                        $cond: {
                            if: { $eq: ["$sender", req.user._id] },
                            then: "$receiver",
                            else: "$sender"
                        }
                    },
                    createdAt: 1
                }
            },
            {
                // Sort by latest date first sebelum grouping
                $sort: { createdAt: -1 }
            },
            {
                // Group by interlocutor untuk dapat 1 entry per user
                $group: {
                    _id: "$interlocutor",
                    lastMessageTime: { $first: "$createdAt" }
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        // Populate detail user dari ID yang didapat
        const userDetails = await User.populate(users, { path: '_id', select: 'name email' });
        
        // Format return agar bersih
        const formattedUsers = userDetails.map(u => u._id).filter(u => u !== null);

        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}