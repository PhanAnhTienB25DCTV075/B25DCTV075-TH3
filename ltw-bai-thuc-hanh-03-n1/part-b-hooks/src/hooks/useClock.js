import { useState, useEffect } from 'react';

/**
 * Custom hook useClock (Yêu cầu nâng cao)
 * Trả về chuỗi thời gian hiện tại cập nhật mỗi giây và tự động dọn dẹp khi unmount.
 */
export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const timeString = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = now.toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return {
    now,
    timeString,
    dateString,
    formatted: `${timeString} • ${dateString}`,
  };
}
