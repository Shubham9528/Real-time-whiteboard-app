import React from 'react';
import { useCanvasStore } from '../../store/canvasStore';

export const CanvasControls: React.FC = () => {
  const { 
    currentColor, 
    lineWidth, 
    clearCanvas,
    setCurrentColor, 
    setLineWidth 
  } = useCanvasStore();

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF',
    '#808080', '#800000', '#008000', '#000080',
    '#808000', '#800080', '#008080', '#FFA500'
  ];

  const brushSizes = [1, 2, 3, 5, 8, 10, 15, 20, 30];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="space-y-4">
        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="grid grid-cols-8 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded border-2 ${
                  currentColor === color ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
                title={color}
              />
            ))}
          </div>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="mt-2 w-full h-8 rounded border border-gray-300"
          />
        </div>

        {/* Brush Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brush Size: {lineWidth}px
          </label>
          <div className="flex gap-2 flex-wrap">
            {brushSizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 rounded text-sm ${
                  lineWidth === size
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setLineWidth(size)}
              >
                {size}px
              </button>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
};
