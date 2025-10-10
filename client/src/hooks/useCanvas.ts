import { useRef, useEffect } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCanvasRef } = useCanvasStore();

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef.current);
    }
  }, [setCanvasRef]);

  return {
    canvasRef,
    canvasState: useCanvasStore(),
  };
};
