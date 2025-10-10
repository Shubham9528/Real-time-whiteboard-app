import React, { useRef, useEffect, forwardRef } from 'react';
import { useCanvasStore } from '../../store/canvasStore';

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
  onDraw?: (data: any) => void;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({
  width = 1200,
  height = 800,
  className = '',
  onDraw,
}, ref) => {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = (ref as React.RefObject<HTMLCanvasElement>) || internalRef;
  const { 
    isDrawing,
    startDrawing,
    continueDrawing,
    stopDrawing,
    setCanvasRef,
    currentColor,
    lineWidth,
    currentPath
  } = useCanvasStore();

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef.current);
    }
  }, [setCanvasRef, canvasRef]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { x, y } = getMousePos(e);
    continueDrawing(x, y);
  };

  const handleMouseUp = () => {
    if (currentPath.length > 0) {
      const drawingData = {
        points: currentPath,
        color: currentColor,
        lineWidth: lineWidth,
      };
      if (onDraw) {
        onDraw(drawingData);
      }
    }
    stopDrawing();
  };

  const handleMouseLeave = () => {
    stopDrawing();
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
    </div>
  );
});

Canvas.displayName = 'Canvas';
