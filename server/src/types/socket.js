// Socket event types
export const SOCKET_EVENTS = {
  // Connection events
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  
  // Room events
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  ROOM_JOINED: 'room-joined',
  ROOM_LEFT: 'room-left',
  
  // Drawing events
  START_DRAWING: 'start-drawing',
  DRAWING: 'drawing',
  STOP_DRAWING: 'stop-drawing',
  CLEAR_CANVAS: 'clear-canvas',
  UNDO: 'undo',
  REDO: 'redo',
  
  // User events
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  USER_LIST: 'user-list',
  
  // Canvas events
  CANVAS_STATE: 'canvas-state',
  CANVAS_UPDATE: 'canvas-update',
  CANVAS_SYNC: 'canvas-sync',
  
  // Error events
  ERROR: 'error',
  ROOM_FULL: 'room-full',
  ROOM_NOT_FOUND: 'room-not-found'
};

// Drawing data types
export const DRAWING_TYPES = {
  LINE: 'line',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  FREEHAND: 'freehand',
  ERASER: 'eraser',
  TEXT: 'text'
};
