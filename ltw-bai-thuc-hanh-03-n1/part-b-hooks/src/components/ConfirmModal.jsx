import React from 'react';

export default function ConfirmModal({ expense, onConfirm, onCancel }) {
  if (!expense) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <h3>Xác nhận xóa khoản chi</h3>
        <p>
          Bạn có chắc chắn muốn xóa khoản chi <strong>"{expense.title}"</strong> (
          {Number(expense.amount).toLocaleString('vi-VN')} đ) không?
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
