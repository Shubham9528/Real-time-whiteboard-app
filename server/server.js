import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './src/config/database.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize SocketHandler
import SocketHandler from './src/socket/socketHandler.js';
const socketHandler = new SocketHandler(io);

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`Server is running at http://localhost:${PORT}`);
});

// API Routes for room management
app.post('/api/rooms', (req, res) => {
  const { roomName, maxUsers = 10, isPublic = true, password } = req.body;
  
  if (!roomName || roomName.trim().length === 0) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  if (maxUsers < 2 || maxUsers > 50) {
    return res.status(400).json({ error: 'Max users must be between 2 and 50' });
  }

  // Use the same room ID generation as RoomEvents
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let roomId = '';
  for (let i = 0; i < 6; i++) {
    roomId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  res.json({
    roomId,
    roomName: roomName.trim(),
    maxUsers,
    isPublic,
    hasPassword: !!password
  });
});

app.get('/api/rooms', (req, res) => {
  const activeRooms = socketHandler.getActiveRooms();
  const roomList = activeRooms.map(roomId => {
    const room = socketHandler.getRoomInfo(roomId);
    return {
      roomId,
      userCount: room ? room.users.size : 0,
      maxUsers: room ? room.maxUsers : 10
    };
  });
  res.json(roomList);
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = socketHandler.getRoomInfo(roomId);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  res.json({
    roomId,
    userCount: room.users.size,
    maxUsers: room.maxUsers,
    users: Array.from(room.users.values())
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export { app, server, io };
