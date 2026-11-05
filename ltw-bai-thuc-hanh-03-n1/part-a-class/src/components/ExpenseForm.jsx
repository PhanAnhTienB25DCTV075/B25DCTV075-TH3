import React, { Component } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    const errors = {};
    const trimmedTitle = this.state.title.trim();
    const numericAmount = Number(this.state.amount);

    if (!trimmedTitle) {
      errors.title = 'Vui lòng nhập nội dung khoản chi.';
    } else if (trimmedTitle.length < 2) {
      errors.title = 'Nội dung khoản chi phải có ít nhất 2 ký tự.';
    }

    if (this.state.amount === '' || isNaN(numericAmount)) {
      errors.amount = 'Vui lòng nhập số tiền hợp lệ.';
    } else if (numericAmount <= 0) {
      errors.amount = 'Số tiền phải lớn hơn 0.';
    }

    if (!CATEGORIES.includes(this.state.category)) {
      errors.category = 'Loại chi tiêu không hợp lệ.';
    }

    if (!this.state.date) {
      errors.date = 'Vui lòng chọn ngày chi.';
    }

    return errors;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: undefined,
      },
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const validationErrors = this.validate();

    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }

    const newExpense = {
      id: 'exp-' + Date.now(),
      title: this.state.title.trim(),
      amount: Number(this.state.amount),
      category: this.state.category,
      date: this.state.date,
    };

    this.props.onAddExpense(newExpense);

    const today = new Date().toISOString().split('T')[0];
    this.setState({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {},
    });
  }

  render() {
    const { title, amount, category, date, errors } = this.state;

    return (
      <section className="card">
        <h2 className="section-title">Thêm khoản chi mới</h2>
        <form className="expense-form" onSubmit={this.handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Nội dung khoản chi *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="VD: Ăn trưa cơm văn phòng"
                value={title}
                onChange={this.handleChange}
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Số tiền (VNĐ) *</label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1000"
                step="1000"
                placeholder="VD: 45000"
                value={amount}
                onChange={this.handleChange}
                className={errors.amount ? 'input-error' : ''}
              />
              {errors.amount && <span className="error-text">{errors.amount}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Loại chi tiêu *</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={this.handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Ngày chi *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={this.handleChange}
                className={errors.date ? 'input-error' : ''}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              + Thêm khoản chi
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default ExpenseForm;
