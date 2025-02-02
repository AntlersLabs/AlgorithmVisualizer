import React from 'react';
import { ArrayBar } from '../types/algorithms';

interface VisualizerProps {
  array: ArrayBar[];
}

export function Visualizer({ array }: VisualizerProps) {
  const maxValue = Math.max(...array.map(item => item.value));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-center gap-1 h-64 p-4 bg-white rounded-lg shadow-sm">
        {array.map((item, index) => {
          const height = `${(item.value / maxValue) * 100}%`;
          const width = `${100 / array.length}%`;
          
          let barColor = 'bg-blue-500';
          if (item.isComparing) barColor = 'bg-yellow-500';
          if (item.isSwapping) barColor = 'bg-red-500';
          if (item.isSorted) barColor = 'bg-green-500';

          return (
            <div
              key={index}
              className="relative group"
              style={{
                height,
                width,
                maxWidth: '40px',
                minWidth: '4px',
              }}
            >
              <div
                className={`absolute bottom-0 w-full h-full transition-all duration-150 ${barColor} hover:brightness-110`}
              />
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                Value: {item.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Sorted</span>
        </div>
      </div>
    </div>
  );
}