import React from 'react';
import { DrawingCanvas } from '../components/Canvas/DrawingCanvas';
import { CanvasControls } from '../components/Canvas/CanvasControls';

export const Board: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Whiteboard
          </h1>
          <p className="text-gray-600">
            Start drawing and collaborating in real-time
          </p>
        </div>

        <div className="flex gap-6">
          {/* Canvas Controls Sidebar */}
          <div className="w-64 flex-shrink-0">
            <CanvasControls />
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <DrawingCanvas className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
