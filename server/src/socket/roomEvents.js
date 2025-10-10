import { SOCKET_EVENTS } from '../types/socket.js';

class RoomEvents {
  constructor(socketHandler) {
    this.socketHandler = socketHandler;
  }

  handleJoinRoom(socket, data) {
    const { roomId, username, password } = data;
    
    if (!roomId) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Room ID is required' });
      return;
    }

    if (!username || username.trim().length === 0) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Username is required' });
      return;
    }

    // Validate room ID format
    if (!this.isValidRoomId(roomId)) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Invalid room ID format' });
      return;
    }

    // Check if room exists and handle password
    const room = this.socketHandler.getRoomInfo(roomId);
    if (room && room.password && room.password !== password) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Invalid room password' });
      return;
    }

    // Proceed with joining room
    this.socketHandler.handleUserConnection(socket);
  }

  handleLeaveRoom(socket, data) {
    const { roomId } = data;
    
    if (!roomId) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Room ID is required' });
      return;
    }

    this.socketHandler.leaveRoom(socket, roomId);
  }

  handleCreateRoom(socket, data) {
    const { roomName, maxUsers = 10, isPublic = true, password } = data;
    
    if (!roomName || roomName.trim().length === 0) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Room name is required' });
      return;
    }

    if (maxUsers < 2 || maxUsers > 50) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Max users must be between 2 and 50' });
      return;
    }

    const roomId = this.generateRoomId();
    
    socket.emit('room-created', {
      roomId,
      roomName: roomName.trim(),
      maxUsers,
      isPublic,
      hasPassword: !!password
    });

    return roomId;
  }

  handleGetRoomInfo(socket, data) {
    const { roomId } = data;
    
    if (!roomId) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Room ID is required' });
      return;
    }

    const room = this.socketHandler.getRoomInfo(roomId);
    if (!room) {
      socket.emit(SOCKET_EVENTS.ROOM_NOT_FOUND, { message: 'Room not found' });
      return;
    }

    socket.emit('room-info', {
      roomId,
      userCount: room.users.size,
      maxUsers: room.maxUsers,
      canvasState: room.canvasState
    });
  }

  handleGetActiveRooms(socket) {
    const activeRooms = this.socketHandler.getActiveRooms();
    
    const roomList = activeRooms.map(roomId => {
      const room = this.socketHandler.getRoomInfo(roomId);
      return {
        roomId,
        userCount: room.users.size,
        maxUsers: room.maxUsers
      };
    });

    socket.emit('active-rooms', roomList);
  }

  isValidRoomId(roomId) {
    // Simple validation: alphanumeric, 4-20 characters
    return /^[a-zA-Z0-9-]{4,20}$/.test(roomId);
  }

  generateRoomId() {
    // Generate a random 6-character room ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  sanitizeRoomData(room) {
    return {
      roomId: room.roomId,
      userCount: room.users.size,
      maxUsers: room.maxUsers,
      canvasState: room.canvasState,
      isPublic: room.isPublic,
      hasPassword: !!room.password
    };
  }
}

export default RoomEvents;
