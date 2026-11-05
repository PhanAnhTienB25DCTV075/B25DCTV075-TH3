import React, { Component } from 'react';

class ExpenseList extends Component {
  formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  render() {
    const { expenses, totalAmount, onRequestDelete } = this.props;

    return (
      <div className="expense-table-wrapper">
        {expenses.length === 0 ? (
          <div className="empty-state">
            Không có khoản chi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
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
                    <span className={`category-tag tag-${item.category}`}>
                      {item.category}
                    </span>
                  </td>
                  <td>{this.formatDate(item.date)}</td>
                  <td className="text-right amount-cell">
                    {this.formatCurrency(item.amount)}
                  </td>
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
                <td className="text-right total-amount">
                  {this.formatCurrency(totalAmount)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    );
  }
}

export default ExpenseList;
