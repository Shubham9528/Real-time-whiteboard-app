import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import { useAuthStore } from '../store/authStore';
import { CanvasWithSocket } from '../components/Canvas/CanvasWithSocket';

export const Board: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get('room');
  const socket = useSocket();
  const { user } = useAuthStore();
  const [users, setUsers] = useState<Array<{id: string, username: string}>>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('Board mounted with roomId:', roomId);
    console.log('User:', user);
    console.log('Socket connected:', socket.connected);

    if (!roomId) {
      console.error('No roomId found in URL');
      return;
    }

    if (!user) {
      console.error('No user found');
      return;
    }

    if (!socket.connected) {
      console.log('Socket not connected, attempting to connect...');
      socket.connect();
    }

    // Join the room
    console.log('Attempting to join room:', roomId);
    socket.emit('join-room', {
      roomId,
      username: user.email || 'Anonymous User'
    });

    // Set up event listeners
    socket.on('room-joined', (data) => {
      console.log('Successfully joined room:', data);
      setUsers(data.users || []);
      setIsConnected(true);
    });

    socket.on('user-joined', (data) => {
      console.log('User joined:', data);
      setUsers(prev => [...prev, data.user]);
    });

    socket.on('user-left', (data) => {
      console.log('User left:', data);
      setUsers(prev => prev.filter(u => u.id !== data.userId));
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(`Error: ${error.message}`);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      console.log('Leaving room:', roomId);
      socket.emit('leave-room', { roomId });
      socket.off('room-joined');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('error');
      socket.off('connect_error');
    };
  }, [roomId, user, socket]);

  if (!roomId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Room ID</h1>
          <p className="text-gray-600">Please create or join a room first.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Logged In</h1>
          <p className="text-gray-600">Please log in to access the whiteboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Whiteboard - Room {roomId}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Users in room: {users.length}</span>
              <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-yellow-600'}`}>
                {isConnected ? '● Connected' : '● Connecting...'}
              </span>
              <button
                onClick={() => {
                  socket.emit('leave-room', { roomId });
                  navigate('/dashboard');
                }}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Leave Room
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* User List Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold mb-2">Users ({users.length})</h3>
              <ul className="text-sm space-y-1">
                {users.map((user) => (
                  <li key={user.id} className="text-gray-700">{user.username}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <CanvasWithSocket 
                roomId={roomId} 
                className="w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
