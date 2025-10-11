import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateRoom = async () => {
    setIsCreatingRoom(true);
    try {
      const roomName = prompt('Enter room name:', 'My Whiteboard Room');
      if (!roomName) {
        setIsCreatingRoom(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
          maxUsers: 10,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const { roomId } = await response.json();
      console.log('Navigating to board with roomId:', roomId);
      navigate(`/board?room=${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Please try again.');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleJoinRoom = () => {
    const roomId = prompt('Enter room ID:');
    if (roomId) {
      navigate(`/board?room=${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Whiteboard Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.displayName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to your Whiteboard Dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                Create a new whiteboard or join an existing one to start collaborating.
              </p>
              
              <div className="space-x-4">
                <button
                  onClick={handleCreateRoom}
                  disabled={isCreatingRoom}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isCreatingRoom ? 'Creating...' : 'Create New Room'}
                </button>
                <button
                  onClick={handleJoinRoom}
                  className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
