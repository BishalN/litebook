import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, storage);
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const;
  }
  return [isFirstTime, setIsFirstTime] as const;
};

// useAsyncstorage.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = async () => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};
