import React, { Component } from 'react';
import Header from './components/Header.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseFilter from './components/ExpenseFilter.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';

const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    title: 'Bún chả Hà Nội buổi trưa',
    amount: 45000,
    category: 'Ăn uống',
    date: '2026-11-01',
  },
  {
    id: 'exp-2',
    title: 'Đổ xăng xe máy tuần 1',
    amount: 70000,
    category: 'Đi lại',
    date: '2026-11-02',
  },
  {
    id: 'exp-3',
    title: 'Mua giáo trình Lập trình Web & React',
    amount: 165000,
    category: 'Học tập',
    date: '2026-11-03',
  },
  {
    id: 'exp-4',
    title: 'Vé xem phim cuối tuần cùng bạn',
    amount: 95000,
    category: 'Giải trí',
    date: '2026-11-04',
  },
  {
    id: 'exp-5',
    title: 'Cà phê muối học nhóm',
    amount: 35000,
    category: 'Ăn uống',
    date: '2026-11-05',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: INITIAL_EXPENSES,
      selectedCategory: 'Tất cả',
      expenseToDelete: null,
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
  }

  getTotalExpense(list) {
    return list.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  updateDocumentTitle() {
    const totalAll = this.getTotalExpense(this.state.expenses);
    document.title = `Tổng chi: ${totalAll.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu (Class)`;
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  // Cập nhật tiêu đề tab trình duyệt khi danh sách chi tiêu thay đổi
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  }

  handleSelectCategory(category) {
    this.setState({ selectedCategory: category });
  }

  handleRequestDelete(expense) {
    this.setState({ expenseToDelete: expense });
  }

  handleConfirmDelete(id) {
    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id),
      expenseToDelete: null,
    }));
  }

  handleCancelDelete() {
    this.setState({ expenseToDelete: null });
  }

  render() {
    const { expenses, selectedCategory, expenseToDelete } = this.state;

    const filteredExpenses =
      selectedCategory === 'Tất cả'
        ? expenses
        : expenses.filter((item) => item.category === selectedCategory);

    const filteredTotal = this.getTotalExpense(filteredExpenses);
    const overallTotal = this.getTotalExpense(expenses);

    return (
      <div className="app-container">
        <Header />

        <div className="tab-title-banner">
          <span>Tiêu đề tab hiện tại (componentDidUpdate):</span>
          <strong>
            Tổng chi: {overallTotal.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu (Class)
          </strong>
        </div>

        <main className="main-content">
          <ExpenseForm onAddExpense={this.handleAddExpense} />

          <section className="card">
            <div className="list-header">
              <h2 className="section-title">Danh sách khoản chi</h2>
            </div>

            <ExpenseFilter
              selectedCategory={selectedCategory}
              onSelectCategory={this.handleSelectCategory}
              totalCount={filteredExpenses.length}
            />

            <ExpenseList
              expenses={filteredExpenses}
              totalAmount={filteredTotal}
              onRequestDelete={this.handleRequestDelete}
            />
          </section>
        </main>

        <ConfirmModal
          expense={expenseToDelete}
          onConfirm={this.handleConfirmDelete}
          onCancel={this.handleCancelDelete}
        />
      </div>
    );
  }
}

export default App;
