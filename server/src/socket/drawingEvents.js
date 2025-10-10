import { SOCKET_EVENTS, DRAWING_TYPES } from '../types/socket.js';

class DrawingEvents {
  constructor(socketHandler) {
    this.socketHandler = socketHandler;
  }

  handleDrawingStart(socket, data) {
    const { roomId, drawingData } = data;
    
    if (!roomId || !drawingData) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Invalid drawing data' });
      return;
    }

    const validatedData = this.validateDrawingData(drawingData);
    if (!validatedData) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Invalid drawing parameters' });
      return;
    }

    socket.to(roomId).emit(SOCKET_EVENTS.START_DRAWING, {
      ...validatedData,
      userId: socket.id,
      timestamp: new Date()
    });
  }

  handleDrawing(socket, data) {
    const { roomId, drawingData } = data;
    
    if (!roomId || !drawingData) return;

    socket.to(roomId).emit(SOCKET_EVENTS.DRAWING, {
      ...drawingData,
      userId: socket.id,
      timestamp: new Date()
    });
  }

  handleDrawingStop(socket, data) {
    const { roomId } = data;
    
    if (!roomId) return;

    socket.to(roomId).emit(SOCKET_EVENTS.STOP_DRAWING, {
      userId: socket.id,
      timestamp: new Date()
    });
  }

  handleClearCanvas(socket, data) {
    const { roomId } = data;
    
    if (!roomId) return;

    socket.to(roomId).emit(SOCKET_EVENTS.CLEAR_CANVAS, {
      userId: socket.id,
      timestamp: new Date()
    });
  }

  handleUndo(socket, data) {
    const { roomId } = data;
    
    if (!roomId) return;

    socket.to(roomId).emit(SOCKET_EVENTS.UNDO, {
      userId: socket.id,
      timestamp: new Date()
    });
  }

  handleRedo(socket, data) {
    const { roomId } = data;
    
    if (!roomId) return;

    socket.to(roomId).emit(SOCKET_EVENTS.REDO, {
      userId: socket.id,
      timestamp: new Date()
    });
  }

  validateDrawingData(drawingData) {
    const requiredFields = ['type', 'x', 'y'];
    
    for (const field of requiredFields) {
      if (drawingData[field] === undefined) {
        return null;
      }
    }

    if (!Object.values(DRAWING_TYPES).includes(drawingData.type)) {
      return null;
    }

    return {
      type: drawingData.type,
      x: parseFloat(drawingData.x),
      y: parseFloat(drawingData.y),
      color: drawingData.color || '#000000',
      width: parseInt(drawingData.width) || 2,
      ...(drawingData.endX && { endX: parseFloat(drawingData.endX) }),
      ...(drawingData.endY && { endY: parseFloat(drawingData.endY) }),
      ...(drawingData.text && { text: String(drawingData.text) }),
      ...(drawingData.fontSize && { fontSize: parseInt(drawingData.fontSize) })
    };
  }
}

export default DrawingEvents;
