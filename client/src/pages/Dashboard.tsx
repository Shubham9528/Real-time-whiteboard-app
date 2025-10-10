import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 15);
    navigate(`/board?room=${roomId}`);
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
                  className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
                >
                  Create New Room
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
