import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import CategoryStats from './components/CategoryStats.jsx';
import ExpenseFilter from './components/ExpenseFilter.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import { useFetch } from './hooks/useFetch.js';
import { useDebounce } from './hooks/useDebounce.js';

export default function App() {
  const [apiUrl, setApiUrl] = useState('');
  const { data: expenses, loading, error, setError, refetch, addItem, removeItem } = useFetch(apiUrl);

  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const overallTotal = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );

  // Cập nhật tiêu đề tab trình duyệt bằng useEffect
  useEffect(() => {
    document.title = `Tổng chi: ${overallTotal.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu (Hooks)`;
  }, [overallTotal]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchCat = selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const keyword = debouncedSearch.trim().toLowerCase();
      const matchSearch = !keyword || item.title.toLowerCase().includes(keyword);
      return matchCat && matchSearch;
    });
  }, [expenses, selectedCategory, debouncedSearch]);

  const filteredTotal = useMemo(
    () => filteredExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [filteredExpenses]
  );

  const handleConfirmDelete = async (id) => {
    await removeItem(id);
    setExpenseToDelete(null);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="tab-title-banner">
        <span>Tiêu đề tab hiện tại (useEffect):</span>
        <strong>Tổng chi: {overallTotal.toLocaleString('vi-VN')} đ | Sổ Chi Tiêu (Hooks)</strong>
      </div>

      <main className="main-content">
        <section className="card">
          <h2 className="section-title">Cấu hình MockAPI (Custom hook useFetch)</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="url"
              className="search-input"
              style={{ flex: 1, minWidth: '240px' }}
              placeholder="Dán link https://<id>.mockapi.io/expenses (để trống để chạy MockAPI giả lập)"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <button type="button" className="btn-secondary" onClick={refetch}>
              Tải lại dữ liệu
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setError('Lỗi mô phỏng: Không thể kết nối tới máy chủ MockAPI (Timeout).')}
            >
              Thử trạng thái Lỗi
            </button>
          </div>
        </section>

        {loading && (
          <div className="status-banner status-loading">
            <span>⏳ Đang đồng bộ dữ liệu với MockAPI (useFetch loading)...</span>
          </div>
        )}

        {error && (
          <div className="status-banner status-error">
            <span>⚠️ {error}</span>
            <button type="button" className="btn-secondary btn-sm" onClick={() => setError(null)}>
              Đóng
            </button>
          </div>
        )}

        <ExpenseForm onAddExpense={addItem} isSubmitting={loading} />

        <CategoryStats expenses={expenses} />

        <section className="card">
          <h2 className="section-title">Danh sách khoản chi</h2>
          <ExpenseFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            debouncedSearch={debouncedSearch}
            totalCount={filteredExpenses.length}
          />
          <ExpenseList
            expenses={filteredExpenses}
            totalAmount={filteredTotal}
            onRequestDelete={setExpenseToDelete}
          />
        </section>
      </main>

      <ConfirmModal
        expense={expenseToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
}
