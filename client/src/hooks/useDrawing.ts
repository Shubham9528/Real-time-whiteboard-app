import { useState, useCallback } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export const useDrawing = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { 
    currentColor, 
    lineWidth, 
    canvasRef,
    startDrawing: storeStartDrawing,
    continueDrawing: storeContinueDrawing,
    stopDrawing: storeStopDrawing 
  } = useCanvasStore();

  const startDrawing = useCallback((x: number, y: number) => {
    setIsDrawing(true);
    storeStartDrawing(x, y);
  }, [storeStartDrawing]);

  const draw = useCallback((x: number, y: number) => {
    if (!isDrawing || !canvasRef) return;
    
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    storeContinueDrawing(x, y);
  }, [isDrawing, canvasRef, currentColor, lineWidth, storeContinueDrawing]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    storeStopDrawing();
    
    const ctx = canvasRef?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  }, [isDrawing, storeStopDrawing, canvasRef]);

  return {
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
  };
};
