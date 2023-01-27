import { useEffect, useState } from "react";

function asyncStringify(object: any): Promise<string> {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify(object));
  });
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    }
  }, [key]);

  const setValue = async (value: T | ((val: T) => T), callback?: () => void) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const data = await asyncStringify(valueToStore);
      window.localStorage.setItem(key, data);
      callback?.();

      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}

export default useLocalStorage;
