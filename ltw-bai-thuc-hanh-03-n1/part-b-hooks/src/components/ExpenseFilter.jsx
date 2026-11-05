import React from 'react';

const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function ExpenseFilter({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  debouncedSearch,
  totalCount,
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div className="filter-bar">
        <div className="filter-buttons">
          {FILTER_OPTIONS.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="search-input"
          placeholder="Tìm theo nội dung (debounce 400ms)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-bar" style={{ marginBottom: 0 }}>
        <span className="filter-summary">
          Từ khóa sau debounce: <strong>{debouncedSearch || '(Tất cả)'}</strong>
        </span>
        <span className="filter-summary">
          Kết quả: <strong>{totalCount}</strong> khoản chi
        </span>
      </div>
    </div>
  );
}
