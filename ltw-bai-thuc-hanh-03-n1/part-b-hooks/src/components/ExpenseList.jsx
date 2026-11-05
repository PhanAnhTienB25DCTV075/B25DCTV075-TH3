import React from 'react';

export default function ExpenseList({ expenses, totalAmount, onRequestDelete }) {
  const formatCurrency = (amount) => Number(amount || 0).toLocaleString('vi-VN') + ' đ';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        Không tìm thấy khoản chi nào khớp với điều kiện lọc.
      </div>
    );
  }

  return (
    <div className="expense-table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Nội dung</th>
            <th>Loại</th>
            <th>Ngày chi</th>
            <th className="text-right">Số tiền</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={item.id}>
              <td className="font-medium">{item.title}</td>
              <td>
                <span className="category-tag">{item.category}</span>
              </td>
              <td>{formatDate(item.date)}</td>
              <td className="text-right amount-cell">{formatCurrency(item.amount)}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => onRequestDelete(item)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="3">Tổng cộng</td>
            <td className="text-right total-amount">{formatCurrency(totalAmount)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
