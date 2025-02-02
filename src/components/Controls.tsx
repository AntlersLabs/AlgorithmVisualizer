import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { AlgorithmType } from '../types/algorithms';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
}

export function Controls({
  isRunning,
  onStart,
  onReset,
  speed,
  onSpeedChange,
  selectedAlgorithm,
  onAlgorithmChange,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-8 bg-white p-4 rounded-lg shadow-sm">
      <Button
        onClick={onStart}
        variant={isRunning ? "destructive" : "default"}
        className="w-32"
      >
        {isRunning ? (
          <>
            <Pause className="mr-2 h-4 w-4" /> Pause
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" /> Start
          </>
        )}
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-32"
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Reset
      </Button>

      <Select
        value={selectedAlgorithm}
        onValueChange={(value) => onAlgorithmChange(value as AlgorithmType)}
        disabled={isRunning}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bubble">Bubble Sort</SelectItem>
          <SelectItem value="quick">Quick Sort</SelectItem>
          <SelectItem value="merge">Merge Sort</SelectItem>
          <SelectItem value="insertion">Insertion Sort</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-4 min-w-[200px]">
        <span className="text-sm font-medium">Speed:</span>
        <Slider
          value={[speed]}
          onValueChange={([value]) => onSpeedChange(value)}
          min={10}
          max={1000}
          step={10}
          className="w-32"
        />
      </div>
    </div>
  );
}