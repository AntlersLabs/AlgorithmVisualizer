export type AlgorithmType = 'bubble' | 'quick' | 'merge' | 'insertion';

export interface ArrayBar {
  value: number;
  isComparing: boolean;
  isSorted: boolean;
  isSwapping: boolean;
}

export interface SortingState {
  array: ArrayBar[];
  isRunning: boolean;
  speed: number;
  selectedAlgorithm: AlgorithmType;
}