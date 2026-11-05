import React from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function CategoryStats({ expenses }) {
  const grandTotal = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <section className="card">
      <h2 className="section-title">Thống kê tổng tiền theo từng loại (Nâng cao)</h2>
      <div className="stats-grid">
        {CATEGORIES.map((category) => {
          const sum = expenses
            .filter((item) => item.category === category)
            .reduce((acc, item) => acc + Number(item.amount || 0), 0);
          const percent = grandTotal > 0 ? Math.round((sum / grandTotal) * 100) : 0;

          return (
            <div key={category} className="stat-card">
              <div className="stat-card-header">
                <span>{category}</span>
                <span>{percent}%</span>
              </div>
              <div className="stat-card-amount">
                {sum.toLocaleString('vi-VN')} đ
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
