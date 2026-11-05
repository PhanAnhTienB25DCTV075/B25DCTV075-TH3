import React, { useState, useRef } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function ExpenseForm({ onAddExpense, isSubmitting }) {
  const today = new Date().toISOString().split('T')[0];
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({});

  // Yêu cầu Phần B.3: Dùng useRef để focus ô nhập sau khi thêm
  const titleInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    const trimmed = title.trim();
    const num = Number(amount);

    if (!trimmed) {
      newErrors.title = 'Vui lòng nhập nội dung khoản chi.';
    } else if (trimmed.length < 2) {
      newErrors.title = 'Nội dung phải có ít nhất 2 ký tự.';
    }

    if (amount === '' || isNaN(num)) {
      newErrors.amount = 'Vui lòng nhập số tiền hợp lệ.';
    } else if (num <= 0) {
      newErrors.amount = 'Số tiền phải lớn hơn 0.';
    }

    if (!CATEGORIES.includes(category)) {
      newErrors.category = 'Loại chi tiêu không hợp lệ.';
    }

    if (!date) {
      newErrors.date = 'Vui lòng chọn ngày chi.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });

    setTitle('');
    setAmount('');
    setCategory('Ăn uống');
    setDate(today);
    setErrors({});

    // Focus lại vào ô nhập nội dung sau khi thêm thành công
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  return (
    <section className="card">
      <h2 className="section-title">Thêm khoản chi mới (useRef auto-focus)</h2>
      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="hook-title">Nội dung khoản chi *</label>
            <input
              ref={titleInputRef}
              id="hook-title"
              type="text"
              placeholder="VD: Mua sách tham khảo React"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hook-amount">Số tiền (VNĐ) *</label>
            <input
              id="hook-amount"
              type="number"
              min="1000"
              step="1000"
              placeholder="VD: 85000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrors((prev) => ({ ...prev, amount: undefined }));
              }}
              className={errors.amount ? 'input-error' : ''}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hook-category">Loại chi tiêu *</label>
            <select
              id="hook-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hook-date">Ngày chi *</label>
            <input
              id="hook-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : '+ Thêm khoản chi'}
          </button>
        </div>
      </form>
    </section>
  );
}
