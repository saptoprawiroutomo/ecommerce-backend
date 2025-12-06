import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import Chat from './models/Chat.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // IMPORT INI

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', apiRoutes);

// ERROR HANDLERS (WAJIB DI BAWAH ROUTES)
app.use(notFound);
app.use(errorHandler);

// Socket.IO
const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('join_room', (userId) => {
        socket.join(userId);
    });
    socket.on('send_message', async (data) => {
        const { sender, receiver, message } = data;
        try {
            await Chat.create({ sender, receiver, message });
        } catch (error) {
            console.error(error);
        }
        io.to(receiver).emit('receive_message', data);
    });
    socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});