import { ArrayBar } from '../types/algorithms';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateRandomArray = (length: number): ArrayBar[] => {
  return Array.from({ length }, () => ({
    value: Math.floor(Math.random() * 100) + 1,
    isComparing: false,
    isSorted: false,
    isSwapping: false
  }));
};

export async function bubbleSort(
  array: ArrayBar[],
  setArray: (arr: ArrayBar[]) => void,
  speed: number,
  signal: AbortSignal
) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (signal.aborted) return;
    for (let j = 0; j < n - i - 1; j++) {
      if (signal.aborted) return;
      
      arr[j].isComparing = true;
      arr[j + 1].isComparing = true;
      setArray([...arr]);
      await sleep(speed / 5); // Increased speed by dividing by 5

      if (arr[j].value > arr[j + 1].value) {
        arr[j].isSwapping = true;
        arr[j + 1].isSwapping = true;
        setArray([...arr]);
        await sleep(speed / 5);

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }

      arr[j].isComparing = false;
      arr[j + 1].isComparing = false;
      arr[j].isSwapping = false;
      arr[j + 1].isSwapping = false;
      setArray([...arr]);
    }
    arr[n - i - 1].isSorted = true;
    setArray([...arr]);
  }
  arr[0].isSorted = true;
  setArray([...arr]);
}

export async function quickSort(
  array: ArrayBar[],
  setArray: (arr: ArrayBar[]) => void,
  speed: number,
  signal: AbortSignal
) {
  const arr = [...array];

  async function partition(low: number, high: number): Promise<number> {
    if (signal.aborted) return low;
    
    const pivot = arr[high].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (signal.aborted) return i + 1;
      
      arr[j].isComparing = true;
      arr[high].isComparing = true;
      setArray([...arr]);
      await sleep(speed / 5);

      if (arr[j].value < pivot) {
        i++;
        arr[i].isSwapping = true;
        arr[j].isSwapping = true;
        setArray([...arr]);
        await sleep(speed / 5);

        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        arr[i].isSwapping = false;
        arr[j].isSwapping = false;
      }

      arr[j].isComparing = false;
      arr[high].isComparing = false;
      setArray([...arr]);
    }

    arr[i + 1].isSwapping = true;
    arr[high].isSwapping = true;
    setArray([...arr]);
    await sleep(speed / 5);

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    arr[i + 1].isSwapping = false;
    arr[high].isSwapping = false;
    setArray([...arr]);

    return i + 1;
  }

  async function sort(low: number, high: number) {
    if (signal.aborted) return;
    if (low < high) {
      const pi = await partition(low, high);
      arr[pi].isSorted = true;
      setArray([...arr]);
      await Promise.all([sort(low, pi - 1), sort(pi + 1, high)]);
    } else if (low === high) {
      arr[low].isSorted = true;
      setArray([...arr]);
    }
  }

  await sort(0, arr.length - 1);
}

export async function insertionSort(
  array: ArrayBar[],
  setArray: (arr: ArrayBar[]) => void,
  speed: number,
  signal: AbortSignal
) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    if (signal.aborted) return;
    
    let key = arr[i];
    let j = i - 1;

    arr[i].isComparing = true;
    setArray([...arr]);
    await sleep(speed / 5);

    while (j >= 0 && arr[j].value > key.value) {
      if (signal.aborted) return;
      
      arr[j].isComparing = true;
      arr[j + 1].isSwapping = true;
      setArray([...arr]);
      await sleep(speed / 5);

      arr[j + 1] = arr[j];
      j--;

      arr[j + 1].isComparing = false;
      arr[j + 1].isSwapping = false;
      setArray([...arr]);
    }

    arr[j + 1] = key;
    arr[i].isComparing = false;
    arr[j + 1].isSorted = true;
    setArray([...arr]);
  }

  // Mark remaining elements as sorted
  for (let i = 0; i < n; i++) {
    arr[i].isSorted = true;
  }
  setArray([...arr]);
}

export async function mergeSort(
  array: ArrayBar[],
  setArray: (arr: ArrayBar[]) => void,
  speed: number,
  signal: AbortSignal
) {
  const arr = [...array];

  async function merge(l: number, m: number, r: number) {
    if (signal.aborted) return;
    
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      if (signal.aborted) return;
      
      arr[l + i].isComparing = true;
      arr[m + 1 + j].isComparing = true;
      setArray([...arr]);
      await sleep(speed / 5);

      if (L[i].value <= R[j].value) {
        arr[k] = { ...L[i], isSwapping: true };
        i++;
      } else {
        arr[k] = { ...R[j], isSwapping: true };
        j++;
      }
      setArray([...arr]);
      await sleep(speed / 5);

      arr[k].isComparing = false;
      arr[k].isSwapping = false;
      arr[k].isSorted = true;
      k++;
      setArray([...arr]);
    }

    while (i < n1) {
      if (signal.aborted) return;
      arr[k] = { ...L[i], isSorted: true };
      i++;
      k++;
      setArray([...arr]);
      await sleep(speed / 5);
    }

    while (j < n2) {
      if (signal.aborted) return;
      arr[k] = { ...R[j], isSorted: true };
      j++;
      k++;
      setArray([...arr]);
      await sleep(speed / 5);
    }
  }

  async function sort(l: number, r: number) {
    if (signal.aborted) return;
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      await sort(l, m);
      await sort(m + 1, r);
      await merge(l, m, r);
    }
  }

  await sort(0, arr.length - 1);
}