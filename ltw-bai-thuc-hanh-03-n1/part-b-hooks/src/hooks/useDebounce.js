import { useState, useEffect } from 'react';

/**
 * Custom hook useDebounce (Yêu cầu nâng cao)
 * Trì hoãn cập nhật giá trị tìm kiếm sau khoảng thời gian delay (ms).
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
