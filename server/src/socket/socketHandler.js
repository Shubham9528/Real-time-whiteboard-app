import { SOCKET_EVENTS } from '../types/socket.js';

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.rooms = new Map();
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
      console.log(`User connected: ${socket.id}`);
      
      this.handleUserConnection(socket);
      this.handleRoomEvents(socket);
      this.handleDrawingEvents(socket);
      this.handleDisconnection(socket);
    });
  }

  handleUserConnection(socket) {
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (data) => {
      const { roomId, username } = data;
      
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, {
          users: new Map(),
          canvasState: [],
          maxUsers: 10
        });
      }

      const room = this.rooms.get(roomId);
      
      if (room.users.size >= room.maxUsers) {
        socket.emit(SOCKET_EVENTS.ROOM_FULL, { message: 'Room is full' });
        return;
      }

      socket.join(roomId);
      room.users.set(socket.id, {
        id: socket.id,
        username: username || `User_${socket.id.substring(0, 4)}`,
        joinedAt: new Date()
      });

      socket.emit(SOCKET_EVENTS.ROOM_JOINED, {
        roomId,
        users: Array.from(room.users.values()),
        canvasState: room.canvasState
      });

      socket.to(roomId).emit(SOCKET_EVENTS.USER_JOINED, {
        user: room.users.get(socket.id),
        userCount: room.users.size
      });

      this.updateUserList(roomId);
    });
  }

  handleRoomEvents(socket) {
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (data) => {
      const { roomId } = data;
      this.leaveRoom(socket, roomId);
    });
  }

  handleDrawingEvents(socket) {
    socket.on(SOCKET_EVENTS.START_DRAWING, (data) => {
      const { roomId, drawingData } = data;
      socket.to(roomId).emit(SOCKET_EVENTS.START_DRAWING, drawingData);
    });

    socket.on(SOCKET_EVENTS.DRAWING, (data) => {
      const { roomId, drawingData } = data;
      socket.to(roomId).emit(SOCKET_EVENTS.DRAWING, drawingData);
    });

    socket.on(SOCKET_EVENTS.STOP_DRAWING, (data) => {
      const { roomId } = data;
      socket.to(roomId).emit(SOCKET_EVENTS.STOP_DRAWING);
    });

    socket.on(SOCKET_EVENTS.CLEAR_CANVAS, (data) => {
      const { roomId } = data;
      const room = this.rooms.get(roomId);
      if (room) {
        room.canvasState = [];
      }
      socket.to(roomId).emit(SOCKET_EVENTS.CLEAR_CANVAS);
    });

    socket.on(SOCKET_EVENTS.CANVAS_UPDATE, (data) => {
      const { roomId, canvasState } = data;
      const room = this.rooms.get(roomId);
      if (room) {
        room.canvasState = canvasState;
      }
      socket.to(roomId).emit(SOCKET_EVENTS.CANVAS_UPDATE, canvasState);
    });
  }

  handleDisconnection(socket) {
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`User disconnected: ${socket.id}`);
      
      // Find and remove user from all rooms
      for (const [roomId, room] of this.rooms.entries()) {
        if (room.users.has(socket.id)) {
          this.leaveRoom(socket, roomId);
          break;
        }
      }
    });
  }

  leaveRoom(socket, roomId) {
    socket.leave(roomId);
    
    const room = this.rooms.get(roomId);
    if (room && room.users.has(socket.id)) {
      const user = room.users.get(socket.id);
      room.users.delete(socket.id);
      
      socket.to(roomId).emit(SOCKET_EVENTS.USER_LEFT, {
        userId: socket.id,
        userCount: room.users.size
      });

      this.updateUserList(roomId);

      // Clean up empty rooms
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  updateUserList(roomId) {
    const room = this.rooms.get(roomId);
    if (room) {
      this.io.to(roomId).emit(SOCKET_EVENTS.USER_LIST, {
        users: Array.from(room.users.values())
      });
    }
  }

  getRoomInfo(roomId) {
    return this.rooms.get(roomId) || null;
  }

  getActiveRooms() {
    return Array.from(this.rooms.keys());
  }
}

export default SocketHandler;
