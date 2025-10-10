import React from 'react';
import { Canvas } from './Canvas';

interface DrawingCanvasProps {
  className?: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas className="w-full" />
    </div>
  );
};
