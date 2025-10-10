import { create } from 'zustand';

interface Point {
  x: number;
  y: number;
}

interface Path {
  points: Point[];
  color: string;
  lineWidth: number;
}

interface CanvasState {
  // Drawing state
  isDrawing: boolean;
  currentColor: string;
  lineWidth: number;
  currentTool: 'pen' | 'eraser' | 'shapes';
  
  // Canvas state
  canvasRef: HTMLCanvasElement | null;
  paths: Path[];
  currentPath: Point[];
  
  // Actions
  setCanvasRef: (canvas: HTMLCanvasElement | null) => void;
  setCurrentColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  setCurrentTool: (tool: 'pen' | 'eraser' | 'shapes') => void;
  
  // Drawing actions
  startDrawing: (x: number, y: number) => void;
  continueDrawing: (x: number, y: number) => void;
  stopDrawing: () => void;
  
  // Canvas management
  clearCanvas: () => void;
  addPath: (path: Path) => void;
  undo: () => void;
  redo: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  // Initial state
  isDrawing: false,
  currentColor: '#000000',
  lineWidth: 2,
  currentTool: 'pen',
  canvasRef: null,
  paths: [],
  currentPath: [],

  // Setters
  setCanvasRef: (canvas) => set({ canvasRef: canvas }),
  setCurrentColor: (color) => set({ currentColor: color }),
  setLineWidth: (width) => set({ lineWidth: width }),
  setCurrentTool: (tool) => set({ currentTool: tool }),

  // Drawing methods
  startDrawing: (x, y) => {
    set({ 
      isDrawing: true, 
      currentPath: [{ x, y }] 
    });
  },

  continueDrawing: (x, y) => {
    const state = get();
    if (!state.isDrawing || !state.canvasRef) return;

    const ctx = state.canvasRef.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = state.currentColor;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (state.currentPath.length > 0) {
      const lastPoint = state.currentPath[state.currentPath.length - 1];
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    set({ 
      currentPath: [...state.currentPath, { x, y }] 
    });
  },

  stopDrawing: () => {
    const state = get();
    if (state.isDrawing && state.currentPath.length > 0) {
      const newPath: Path = {
        points: state.currentPath,
        color: state.currentColor,
        lineWidth: state.lineWidth,
      };
      set({ 
        isDrawing: false, 
        paths: [...state.paths, newPath],
        currentPath: []
      });
    } else {
      set({ isDrawing: false });
    }
  },

  // Canvas management
  clearCanvas: () => {
    const state = get();
    if (state.canvasRef) {
      const ctx = state.canvasRef.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, state.canvasRef.width, state.canvasRef.height);
      }
    }
    set({ paths: [], currentPath: [] });
  },

  addPath: (path) => {
    set((state) => ({ paths: [...state.paths, path] }));
  },

  undo: () => {
    set((state) => ({ 
      paths: state.paths.slice(0, -1) 
    }));
  },

  redo: () => {
    // TODO: Implement redo functionality
  },
}));
