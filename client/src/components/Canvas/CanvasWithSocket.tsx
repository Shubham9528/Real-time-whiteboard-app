import React, { useRef, useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { useAuthStore } from '../../store/authStore';

interface CanvasWithSocketProps {
  roomId: string;
  width?: number;
  height?: number;
  className?: string;
}

export const CanvasWithSocket: React.FC<CanvasWithSocketProps> = ({
  roomId,
  width = 1200,
  height = 800,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useSocket();
  const { user } = useAuthStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Array<{x: number, y: number}>>([]);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rectangle' | 'circle' | 'line'>('pen');
  const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    console.log('CanvasWithSocket mounted with roomId:', roomId);
    console.log('Socket status:', socket.connected ? 'connected' : 'disconnected');

    if (!socket || !roomId) {
      console.error('CanvasWithSocket: Missing socket or roomId');
      return;
    }

    const handleDrawing = (data: any) => {
      console.log('Received drawing data:', data);
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context not available');
        return;
      }

      drawOnCanvas(ctx, data);
    };

    const handleClearCanvas = () => {
      console.log('Received clear-canvas event');
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    socket.on('drawing', handleDrawing);
    socket.on('clear-canvas', handleClearCanvas);

    console.log('CanvasWithSocket: Event listeners set up');

    return () => {
      socket.off('drawing', handleDrawing);
      socket.off('clear-canvas', handleClearCanvas);
    };
  }, [socket, roomId]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawOnCanvas = (ctx: CanvasRenderingContext2D, data: any) => {
    ctx.beginPath();
    ctx.moveTo(data.startX, data.startY);
    ctx.lineTo(data.endX, data.endY);
    ctx.strokeStyle = data.color || '#000000';
    ctx.lineWidth = data.lineWidth || 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    setIsDrawing(true);
    setCurrentPath([{ x, y }]);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { x, y } = getMousePos(e);
    setCurrentPath(prev => [...prev, { x, y }]);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1];
      
      // Draw locally
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Emit to server
      socket.emit('drawing', {
        roomId,
        drawingData: {
          startX: lastPoint.x,
          startY: lastPoint.y,
          endX: x,
          endY: y,
          color,
          lineWidth,
          userId: user?.uid || 'anonymous',
          username: user?.email || 'Anonymous'
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear-canvas', { roomId });
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `whiteboard-${roomId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg shadow-lg cursor-crosshair"
        style={{ backgroundColor: 'white' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
        <div className="flex flex-col gap-3">
          {/* Tool Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`px-3 py-1 text-sm rounded ${tool === 'pen' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              ✏️ Pen
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`px-3 py-1 text-sm rounded ${tool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              🧽 Eraser
            </button>
            <button
              onClick={() => setTool('rectangle')}
              className={`px-3 py-1 text-sm rounded ${tool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              ⬜ Rectangle
            </button>
            <button
              onClick={() => setTool('circle')}
              className={`px-3 py-1 text-sm rounded ${tool === 'circle' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              ⭕ Circle
            </button>
            <button
              onClick={() => setTool('line')}
              className={`px-3 py-1 text-sm rounded ${tool === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              📏 Line
            </button>
          </div>
          
          {/* Color and Width Controls */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 border rounded cursor-pointer"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Width:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-24"
              />
              <span className="text-sm w-8">{lineWidth}px</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
            >
              🗑️ Clear All
            </button>
            <button
              onClick={downloadCanvas}
              className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
            >
              💾 Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
