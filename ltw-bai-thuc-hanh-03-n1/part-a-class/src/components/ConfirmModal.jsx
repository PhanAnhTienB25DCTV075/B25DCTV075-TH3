import React, { Component } from 'react';

class ConfirmModal extends Component {
  render() {
    const { expense, onConfirm, onCancel } = this.props;
    if (!expense) return null;

    return (
      <div className="modal-backdrop" role="dialog" aria-modal="true">
        <div className="modal-box">
          <h3>Xác nhận xóa khoản chi</h3>
          <p>
            Bạn có chắc chắn muốn xóa khoản chi{' '}
            <strong>"{expense.title}"</strong> với số tiền{' '}
            <strong>{expense.amount.toLocaleString('vi-VN')} đ</strong> không?
          </p>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => onConfirm(expense.id)}
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
