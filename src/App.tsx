import React, { useState, useCallback, useRef } from 'react';
import { Controls } from './components/Controls';
import { Visualizer } from './components/Visualizer';
import { generateRandomArray, bubbleSort, quickSort, mergeSort, insertionSort } from './utils/sortingAlgorithms';
import { AlgorithmType, ArrayBar } from './types/algorithms';

function App() {
  const [array, setArray] = useState<ArrayBar[]>(() => generateRandomArray(50));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble');
  const abortController = useRef<AbortController | null>(null);

  const handleStart = useCallback(async () => {
    if (isRunning) {
      abortController.current?.abort();
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    abortController.current = new AbortController();

    try {
      switch (selectedAlgorithm) {
        case 'bubble':
          await bubbleSort(array, setArray, speed, abortController.current.signal);
          break;
        case 'quick':
          await quickSort(array, setArray, speed, abortController.current.signal);
          break;
        case 'merge':
          await mergeSort(array, setArray, speed, abortController.current.signal);
          break;
        case 'insertion':
          await insertionSort(array, setArray, speed, abortController.current.signal);
          break;
      }
    } finally {
      setIsRunning(false);
    }
  }, [array, selectedAlgorithm, speed, isRunning]);

  const handleReset = useCallback(() => {
    if (isRunning) {
      abortController.current?.abort();
      setIsRunning(false);
    }
    setArray(generateRandomArray(50));
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Algorithm Visualizer
          </h1>
          <p className="text-slate-600">
            Visualize and compare different sorting algorithms in real-time
          </p>
        </div>
        
        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onReset={handleReset}
          speed={speed}
          onSpeedChange={setSpeed}
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
        />

        <Visualizer array={array} />
      </div>
    </div>
  );
}

export default App;