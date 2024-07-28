import {useState, useEffect} from 'react';

export const useDebounce = (value: string, delayTime: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayTime]);

  return debouncedValue;
};
