import React, { useEffect, useRef } from 'react';
import { Canvas } from './Canvas';
import { useSocket } from '../../contexts/SocketContext';
import { useAuthStore } from '../../store/authStore';

interface DrawingCanvasProps {
  className?: string;
  roomId: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ className = '', roomId }) => {
  const socket = useSocket();
  const { user } = useAuthStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!socket || !roomId) return;

    const handleDrawing = (data: any) => {
      // Handle incoming drawing data
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw the received data (implement based on your drawing format)
      drawOnCanvas(ctx, data);
    };

    socket.on('drawing', handleDrawing);
    socket.on('clear-canvas', () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off('drawing', handleDrawing);
      socket.off('clear-canvas');
    };
  }, [socket, roomId]);

  const drawOnCanvas = (ctx: CanvasRenderingContext2D, data: any) => {
    // Basic drawing implementation - extend based on your needs
    ctx.beginPath();
    ctx.moveTo(data.startX, data.startY);
    ctx.lineTo(data.endX, data.endY);
    ctx.strokeStyle = data.color || '#000000';
    ctx.lineWidth = data.width || 2;
    ctx.stroke();
  };

  const handleDraw = (data: any) => {
    if (!socket || !roomId) return;

    socket.emit('drawing', {
      roomId,
      drawingData: {
        ...data,
        userId: user?.uid,
        username: user?.displayName || user?.email || 'Anonymous'
      }
    });
  };

  return (
    <div className={`relative ${className}`}>
      <Canvas 
        ref={canvasRef}
        className="w-full" 
        onDraw={handleDraw}
      />
    </div>
  );
};
