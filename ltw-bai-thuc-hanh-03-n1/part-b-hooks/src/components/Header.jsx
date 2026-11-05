import React, { useState } from 'react';
import { useClock } from '../hooks/useClock.js';
import { useTheme } from '../context/ThemeContext.jsx';

function ClockBadge() {
  const { formatted } = useClock();
  return (
    <div className="clock-badge" title="Đồng hồ từ custom hook useClock">
      <span className="clock-dot"></span>
      <span className="clock-text">{formatted}</span>
    </div>
  );
}

export default function Header() {
  const [showClock, setShowClock] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="badge-part">Phần B • Function Component + Hooks</span>
        <h1>Sổ Chi Tiêu Cá Nhân</h1>
        <p className="subtitle">
          Sử dụng useState, useEffect, useRef, useContext & Custom Hooks (useFetch, useClock, useDebounce)
        </p>
      </div>

      <div className="header-clock-area">
        {showClock ? (
          <ClockBadge />
        ) : (
          <div className="clock-hidden-note">Đồng hồ đã tạm ẩn (cleanup interval)</div>
        )}
        <button
          type="button"
          className="btn-secondary btn-sm"
          onClick={() => setShowClock((prev) => !prev)}
        >
          {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>
        <button
          type="button"
          className="btn-secondary btn-sm"
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
        </button>
      </div>
    </header>
  );
}
