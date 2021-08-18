import { TSocketPuzzleData } from 'application/api';

const addSomeDelayAsync = (milliseconds?: number): Promise<void> => new Promise(resolve => setTimeout(() => { resolve(); }, milliseconds || 1000));

const createPuzzleMapFromSocketMessage = (message: string): TSocketPuzzleData => {
  return message.replace('map:', '')?.trim()?.split('\n')?.map((x: string) => x?.trim()?.split(''));
};

const localStorageGetItem = (key: string): string | null => {
  return window.localStorage.getItem(key) || null;
};

const localStorageSetItem = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

export {
  addSomeDelayAsync,
  createPuzzleMapFromSocketMessage,
  localStorageGetItem,
  localStorageSetItem,
};
