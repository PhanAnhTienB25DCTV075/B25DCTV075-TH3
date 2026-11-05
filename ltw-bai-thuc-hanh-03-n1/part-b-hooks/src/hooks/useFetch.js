import { useState, useEffect, useCallback } from 'react';

const SEED_DATA = [
  {
    id: '1',
    title: 'Phở bò tái lăn buổi sáng',
    amount: 50000,
    category: 'Ăn uống',
    date: '2026-11-01',
  },
  {
    id: '2',
    title: 'Vé xe buýt tháng sinh viên',
    amount: 100000,
    category: 'Đi lại',
    date: '2026-11-02',
  },
  {
    id: '3',
    title: 'Đăng ký khóa học React Hooks nâng cao',
    amount: 299000,
    category: 'Học tập',
    date: '2026-11-03',
  },
  {
    id: '4',
    title: 'Thuê sân cầu lông cuối tuần',
    amount: 80000,
    category: 'Giải trí',
    date: '2026-11-04',
  },
];

/**
 * Custom hook useFetch (Phần B - Câu 2)
 * Hỗ trợ lấy (GET), thêm (POST), xóa (DELETE) dữ liệu qua MockAPI
 * Có quản lý trạng thái đang tải (loading) và lỗi (error).
 * Nếu apiUrl để trống hoặc là 'mock://expenses', hook tự động dùng bộ giả lập MockAPI
 * với độ trễ 450ms để có thể kiểm thử đầy đủ ngay cả khi không có mạng.
 */
export function useFetch(apiUrl = '') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRealHttp = apiUrl && /^https?:\/\//i.test(apiUrl.trim());

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isRealHttp) {
        const response = await fetch(apiUrl.trim());
        if (!response.ok) {
          throw new Error(`Lỗi HTTP ${response.status}: Không thể tải dữ liệu từ MockAPI`);
        }
        const json = await response.json();
        setData(Array.isArray(json) ? json : []);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 450));
        setData((prev) => (prev.length > 0 ? prev : SEED_DATA));
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, isRealHttp]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = useCallback(
    async (newItem) => {
      setLoading(true);
      setError(null);
      try {
        if (isRealHttp) {
          const response = await fetch(apiUrl.trim(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
          });
          if (!response.ok) {
            throw new Error(`Lỗi HTTP ${response.status}: Không thể thêm khoản chi`);
          }
          const created = await response.json();
          setData((prev) => [created, ...prev]);
          return created;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 350));
          const created = { ...newItem, id: String(Date.now()) };
          setData((prev) => [created, ...prev]);
          return created;
        }
      } catch (err) {
        setError(err.message || 'Không thể thêm khoản chi mới.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, isRealHttp]
  );

  const removeItem = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        if (isRealHttp) {
          const base = apiUrl.trim().replace(/\/+$/, '');
          const response = await fetch(`${base}/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error(`Lỗi HTTP ${response.status}: Không thể xóa khoản chi`);
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        setData((prev) => prev.filter((item) => String(item.id) !== String(id)));
      } catch (err) {
        setError(err.message || 'Không thể xóa khoản chi.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, isRealHttp]
  );

  return {
    data,
    loading,
    error,
    setError,
    refetch: fetchItems,
    addItem,
    removeItem,
  };
}
