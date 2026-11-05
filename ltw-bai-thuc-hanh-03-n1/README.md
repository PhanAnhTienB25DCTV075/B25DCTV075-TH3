# LTW - Bài thực hành 03 (N1): Ứng dụng Sổ Chi Tiêu Cá Nhân

## 1. Thông tin sinh viên
- **Họ và tên:** `[Điền Họ và Tên Sinh Viên]`
- **Mã sinh viên:** `[Điền Mã Sinh Viên]`
- **Lớp / Nhóm thực hành:** LTW - Nhóm N1

---

## 2. Cấu trúc Repository
Dự án được chia thành 2 thư mục độc lập theo đúng yêu cầu đề bài (không sử dụng React Router, Redux hay thư viện UI bên thứ ba):

```text
ltw-bai-thuc-hanh-03-n1/
├── README.md                 # Tài liệu hướng dẫn và trả lời câu hỏi lý thuyết
├── part-a-class/             # Phần A: Xây dựng bằng React Class Component
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # Giữ state danh sách chi tiêu (dữ liệu mẫu) & bộ lọc, cập nhật document.title
│       ├── App.css           # CSS thuần (không dùng thư viện UI)
│       └── components/
│           ├── Header.jsx        # Header hiển thị tiêu đề và nút ẩn/hiện đồng hồ
│           ├── Clock.jsx         # Đồng hồ chạy mỗi giây (componentDidMount / componentWillUnmount)
│           ├── ExpenseForm.jsx   # Form thêm khoản chi có kiểm tra hợp lệ (validate)
│           ├── ExpenseFilter.jsx # Bộ lọc theo loại chi tiêu
│           ├── ExpenseList.jsx   # Danh sách khoản chi (dùng key, xóa có xác nhận, dòng tổng tiền)
│           └── ConfirmModal.jsx  # Hộp thoại xác nhận xóa khoản chi
└── part-b-hooks/             # Phần B: Xây dựng bằng Function Component + Hooks + Yêu cầu nâng cao
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx               # Function Component kết hợp Hooks & Thống kê nâng cao
        ├── App.css               # CSS thuần hỗ trợ biến giao diện Sáng / Tối (Light / Dark)
        ├── context/
        │   └── ThemeContext.jsx  # useContext quản lý chế độ Sáng/Tối toàn cục
        ├── hooks/
        │   ├── useClock.js       # Custom hook đồng hồ thời gian thực
        │   ├── useDebounce.js    # Custom hook làm trễ từ khóa tìm kiếm (Debounce)
        │   └── useFetch.js       # Custom hook gọi MockAPI (GET, POST, DELETE) kèm loading & error
        └── components/
            ├── Header.jsx        # Header có đồng hồ (useClock) và nút chuyển đổi Sáng/Tối (useContext)
            ├── ExpenseForm.jsx   # Form thêm khoản chi + useRef tự động focus ô nhập sau khi thêm
            ├── ExpenseFilter.jsx # Bộ lọc theo loại + Ô tìm kiếm có độ trễ (useDebounce)
            ├── CategoryStats.jsx # Thống kê tổng tiền và tỷ lệ % theo từng loại (Yêu cầu nâng cao)
            ├── ExpenseList.jsx   # Danh sách khoản chi + trạng thái đang tải/lỗi + tổng tiền
            └── ConfirmModal.jsx  # Hộp thoại xác nhận xóa
```

---

## 3. Hướng dẫn cài đặt và chạy chương trình

Yêu cầu máy tính đã cài đặt **Node.js** (phiên bản 18+ khuyến nghị).

### Chạy Phần A (Class Component)
```bash
cd part-a-class
npm install
npm run dev
```
Sau đó mở trình duyệt tại địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

### Chạy Phần B (Function Component + Hooks + Nâng cao)
```bash
cd part-b-hooks
npm install
npm run dev
```
> **Lưu ý về MockAPI ở Phần B:**
> - Trong file `part-b-hooks/src/hooks/useFetch.js` (và trên giao diện ứng dụng), bạn có thể dán trực tiếp endpoint `https://<project-id>.mockapi.io/api/v1/expenses` của bạn.
> - Nếu chưa cấu hình URL MockAPI riêng hoặc khi mất kết nối mạng, hook `useFetch` có sẵn cơ chế **MockAPI Fallback thông minh** (mô phỏng độ trễ mạng thực tế `GET`, `POST`, `DELETE` và lưu trữ cục bộ) giúp giảng viên có thể chạy thử nghiệm ngay lập tức mọi tính năng (bao gồm cả trạng thái `loading` và `error`).

---

## 4. Giải thích: Hooks đã giúp khắc phục các thách thức của Class Component ở những chỗ nào trong bài?

Qua quá trình xây dựng cùng một bài toán **Sổ chi tiêu cá nhân** bằng cả hai phương pháp (Phần A với Class Component và Phần B với Function Component + Hooks), React Hooks đã giải quyết triệt để 4 thách thức lớn của Class Component:

1. **Gom nhóm logic theo mối quan tâm thay vì bị phân mảnh theo vòng đời (Lifecycle Methods):**
   - **Ở Phần A (Class):** Logic của đồng hồ phải tách làm hai nơi: khởi tạo `setInterval` trong `componentDidMount` và dọn dẹp `clearInterval` trong `componentWillUnmount`. Tương tự, việc cập nhật tiêu đề tab (`document.title`) với tổng chi tiêu phải viết lặp lại ở cả `componentDidMount` (lần đầu) và `componentDidUpdate` (mỗi khi `expenses` thay đổi kèm điều kiện `if (prevState.expenses !== this.state.expenses)`).
   - **Ở Phần B (Hooks):** Một hàm `useEffect` duy nhất cho phép đặt cả phần khởi tạo lẫn hàm cleanup (`return () => clearInterval(...)`) ở cùng một chỗ. Việc cập nhật `document.title` cũng chỉ cần một `useEffect(() => { ... }, [totalAmount])` ngắn gọn, tự động chạy cả lần đầu và khi tổng chi thay đổi.

2. **Tái sử dụng logic có trạng thái (Stateful Logic) dễ dàng qua Custom Hooks:**
   - **Ở Phần A (Class):** Rất khó tách riêng logic bộ đếm thời gian của đồng hồ hay logic gọi API kèm trạng thái `loading`/`error` để dùng lại cho component khác nếu không dùng kỹ thuật phức tạp như Higher-Order Components (HOC) hoặc Render Props.
   - **Ở Phần B (Hooks):** Chúng ta tách biệt hoàn toàn logic thành các Custom Hooks độc lập:
     - `useClock()`: đóng gói state thời gian và bộ đếm `setInterval`.
     - `useFetch(apiUrl)`: đóng gói toàn bộ quy trình `GET / POST / DELETE` tới MockAPI cùng các state `data`, `loading`, `error`.
     - `useDebounce(searchTerm, 400)`: đóng gói kỹ thuật trì hoãn giá trị tìm kiếm.

3. **Loại bỏ sự phức tạp của từ khóa `this` và khởi tạo `constructor`:**
   - **Ở Phần A (Class):** Phải liên tục truy cập qua `this.state`, `this.props`, `this.setState`, và phải chú ý ngữ cảnh `this` trong các hàm xử lý sự kiện (`handleChange`, `handleSubmit`, `handleDelete`).
   - **Ở Phần B (Hooks):** Sử dụng `useState` trả về trực tiếp biến trạng thái và hàm cập nhật, kết hợp `useRef` (`titleInputRef.current.focus()`) trực quan, giúp mã nguồn ngắn gọn, dễ đọc và ít lỗi hơn.

4. **Chia sẻ trạng thái toàn cục mượt mà với `useContext`:**
   - **Ở Phần A (Class):** Nếu muốn truyền chế độ Sáng/Tối xuống nhiều cấp component mà không truyền qua từng tầng `props` (prop drilling), việc dùng `Context.Consumer` lồng nhau khiến JSX trở nên rối rắm.
   - **Ở Phần B (Hooks):** Chỉ cần gọi `const { theme, toggleTheme } = useTheme()` (dựa trên `useContext(ThemeContext)`) ở bất kỳ component nào (`Header`, `App`, `ExpenseList`) là có thể đọc và đổi chế độ Sáng/Tối ngay lập tức.
