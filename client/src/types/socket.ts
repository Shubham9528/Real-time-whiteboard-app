export interface DrawingData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  lineWidth: number;
  userId?: string;
  username?: string;
}

export interface RoomData {
  roomId: string;
  users: Array<{
    id: string;
    username: string;
  }>;
  canvasState?: any[];
}

export interface SocketEvents {
  'join-room': (data: { roomId: string; username: string }) => void;
  'leave-room': (data: { roomId: string }) => void;
  'drawing': (data: { roomId: string; drawingData: DrawingData }) => void;
  'clear-canvas': (data: { roomId: string }) => void;
  'room-joined': (data: RoomData) => void;
  'user-joined': (data: { user: { id: string; username: string } }) => void;
  'user-left': (data: { userId: string; username: string }) => void;
  'error': (error: { message: string }) => void;
}
