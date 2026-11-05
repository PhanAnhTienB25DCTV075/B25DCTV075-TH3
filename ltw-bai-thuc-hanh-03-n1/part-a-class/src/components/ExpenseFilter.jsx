import React, { Component } from 'react';

const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class ExpenseFilter extends Component {
  render() {
    const { selectedCategory, onSelectCategory, totalCount } = this.props;

    return (
      <div className="filter-bar">
        <div className="filter-buttons">
          {FILTER_OPTIONS.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={`filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        <span className="filter-summary">
          Hiển thị <strong>{totalCount}</strong> khoản chi
        </span>
      </div>
    );
  }
}

export default ExpenseFilter;
