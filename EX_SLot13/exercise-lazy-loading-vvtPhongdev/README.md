[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/eHwhbxxk)
# Lab: Code Splitting – Lazy Loading với Restaurant API
họ tên            |MSSV    |Email                   |linkgithub  
Võ Văn Thanh Phong|DE190421|vophongthank25@gmail.com|https://github.com/vvtPhongdev/FER202_PhongVVT_SU26
> **Môn:** FER202 – Front-End với React  
> **Chủ đề Slot 15:** Code Splitting Using Lazy Components and Suspense  
> **Stack:** React 18 · Vite · React-Bootstrap 2.x · Axios · React Router 6 · json-server

---

## Mô tả bài tập

Bài lab xây dựng ứng dụng quản lý nhà hàng đơn giản gồm 3 trang:

- **Trang chủ** (`/`) – giới thiệu và điều hướng
- **Thực Đơn** (`/menu`) – CRUD món ăn, tìm kiếm
- **Bàn Ăn** (`/tables`) – xem trạng thái bàn

Hai trang cuối được **lazy-load** bằng `React.lazy()` + `<Suspense>`, giúp giảm bundle size ban đầu và chỉ tải code khi cần thiết.

---

## Cài đặt và chạy

```bash
# 1. Cài dependencies
npm install

# 2. Chạy cả API (port 3001) và React app (port 5173) cùng lúc
npm run dev:full

# Hoặc chạy riêng lẻ:
npm run server   # json-server
npm run dev      # Vite
```

---

## Bảng TODO

| #     | File | Nội dung | Test | Điểm |
|-------|------|----------|------|------|
| TODO-01 | `components/MenuCard.jsx`         | Render card món ăn | MenuCard.test.jsx | 10 |
| TODO-02 | `services/restaurantService.js`   | GET /menus (fetchMenus) | restaurantService.test.js | 10 |
| TODO-03 | `components/MenuList.jsx`         | Render danh sách | MenuList.test.jsx | 10 |
| TODO-04 | `components/AddMenuForm.jsx`      | Form thêm món (controlled) | AddMenuForm.test.jsx | 15 |
| TODO-05 | `services/restaurantService.js`   | POST /menus (addMenu) | restaurantService.test.js | 10 |
| TODO-06 | `services/restaurantService.js`   | DELETE /menus/:id (deleteMenu) | restaurantService.test.js | 10 |
| TODO-07 | `pages/MenuPage.jsx`              | State, useEffect, handleAdd, handleDelete | — | 15 |
| TODO-08 | `components/SearchBar.jsx` + `MenuPage.jsx` | Ô tìm kiếm và filter | SearchBar.test.jsx | 10 |
| TODO-09 | `App.jsx`                         | Lazy load pages với React.lazy + Suspense | — | 10 |
| **Tổng** | | | | **100** |

---

## Hướng dẫn từng TODO

### TODO-01 — MenuCard (10đ)
**File:** `src/components/MenuCard.jsx`

Render Card hiển thị 1 món ăn:
- Tên món (`Card.Title`)
- Giá định dạng: `menu.price.toLocaleString('vi-VN') + ' ₫'`
- Danh mục
- Badge: `available = true` → "Còn món" (success), `false` → "Hết món" (secondary)
- Button "Xóa" → gọi `onDelete(menu.id)` khi click

```jsx
// Gợi ý cấu trúc
<Card>
  <Card.Body>
    <Card.Title>{menu.name}</Card.Title>
    <Card.Text>
      {menu.price.toLocaleString('vi-VN')} ₫ · {menu.category}
    </Card.Text>
    <Badge bg={menu.available ? 'success' : 'secondary'}>
      {menu.available ? 'Còn món' : 'Hết món'}
    </Badge>
    <Button variant="danger" onClick={() => onDelete(menu.id)}>Xóa</Button>
  </Card.Body>
</Card>
```

---

### TODO-02 — fetchMenus (10đ)
**File:** `src/services/restaurantService.js`

```js
export const fetchMenus = async () => {
  const response = await axios.get(`${API_URL}/menus`)
  return response.data   // ← KHÔNG return cả response object
}
```

---

### TODO-03 — MenuList (10đ)
**File:** `src/components/MenuList.jsx`

```jsx
function MenuList({ menus, onDelete }) {
  if (menus.length === 0)
    return <p className="text-center text-muted mt-4">Không có món ăn nào...</p>
  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {menus.map(menu => (
        <Col key={menu.id}>
          <MenuCard menu={menu} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  )
}
```

---

### TODO-04 — AddMenuForm (15đ)
**File:** `src/components/AddMenuForm.jsx`

- 3 controlled inputs: `name`, `price`, `category`
- Validate: `name.trim()` không rỗng AND `Number(price) > 0`
- Submit hợp lệ → gọi `onAdd({ name, price: Number(price), category, available: true })`
- Reset form về `INITIAL_FORM` sau submit

---

### TODO-05 — addMenu (10đ)
**File:** `src/services/restaurantService.js`

```js
export const addMenu = async (menuData) => {
  const response = await axios.post(`${API_URL}/menus`, menuData)
  return response.data   // object món ăn vừa tạo, có id từ server
}
```

---

### TODO-06 — deleteMenu (10đ)
**File:** `src/services/restaurantService.js`

```js
export const deleteMenu = async (id) => {
  const response = await axios.delete(`${API_URL}/menus/${id}`)
  return response.data
}
```

---

### TODO-07 — MenuPage (15đ)
**File:** `src/pages/MenuPage.jsx`

State cần khai báo:
```js
const [menus,      setMenus]      = useState([])
const [loading,    setLoading]    = useState(true)
const [error,      setError]      = useState(null)
const [searchTerm, setSearchTerm] = useState('')
```

useEffect fetch data:
```js
useEffect(() => {
  fetchMenus()
    .then(data => setMenus(data))
    .catch(err  => setError(err.message))
    .finally(()  => setLoading(false))
}, [])
```

handleAdd và handleDelete:
```js
const handleAdd = async (menuData) => {
  const newMenu = await addMenu(menuData)
  setMenus(prev => [...prev, newMenu])
}
const handleDelete = async (id) => {
  await deleteMenu(id)
  setMenus(prev => prev.filter(m => m.id !== id))
}
```

---

### TODO-08 — SearchBar + filter (10đ)
**File:** `src/components/SearchBar.jsx` và `src/pages/MenuPage.jsx`

SearchBar:
```jsx
function SearchBar({ onSearch }) {
  return (
    <Form.Control
      type="text"
      placeholder="🔍 Tìm theo tên món..."
      className="mb-3"
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
```

Trong MenuPage (tính filtered trước khi render):
```js
const filtered = menus.filter(m =>
  m.name.toLowerCase().includes(searchTerm.toLowerCase())
)
```

---

### TODO-09 — Lazy Loading (10đ)
**File:** `src/App.jsx`

```jsx
import { lazy, Suspense } from 'react'

const MenuPage  = lazy(() => import('./pages/MenuPage'))
const TablePage = lazy(() => import('./pages/TablePage'))

function App() {
  return (
    <Router>
      <AppNavbar />
      <Suspense fallback={<LoadingSpinner message="Đang tải trang..." />}>
        <Routes>
          <Route path="/"       element={<HomePage />} />
          <Route path="/menu"   element={<MenuPage />} />
          <Route path="/tables" element={<TablePage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
```

**Cách kiểm tra:** Mở DevTools → Network → JS. Lần đầu vào `/menu` sẽ thấy file `MenuPage-[hash].js` được tải riêng.

---

## Chạy Tests

```bash
# Chạy tất cả tests 1 lần
npm test

# Chạy watch mode
npm run test:watch

# Chạy riêng 1 file test
npx jest MenuCard
npx jest restaurantService
```

Khi chưa implement TODO nào, tất cả tests sẽ **FAIL** với `Error: Not implemented`.  
Sau khi implement xong từng TODO, tests tương ứng sẽ **PASS**.

---

## Checklist Nộp Bài

Trước khi nộp, tự kiểm tra từng mục:

### Setup
- [ ] `npm install` thành công, không có lỗi
- [ ] `npm run dev:full` chạy được (cả port 3001 và 5173)
- [ ] Trang chủ hiển thị đúng khi truy cập `http://localhost:5173`

### TODO-01 – MenuCard
- [ ] Card hiển thị đúng tên, giá, danh mục
- [ ] Giá định dạng số (có dấu phân cách, có ₫)
- [ ] Badge "Còn món" / "Hết món" hiển thị đúng theo `available`
- [ ] Bấm "Xóa" gọi đúng `onDelete(id)`
- [ ] Test MenuCard.test.jsx: tất cả PASS ✅

### TODO-02 – fetchMenus
- [ ] Gọi `GET /menus` đúng URL
- [ ] Return `response.data` (không return object axios)
- [ ] Test restaurantService: describe `fetchMenus` PASS ✅

### TODO-03 – MenuList
- [ ] Render đủ MenuCard theo số phần tử trong mảng
- [ ] Hiển thị "Không có món ăn" khi mảng rỗng
- [ ] Test MenuList.test.jsx: tất cả PASS ✅

### TODO-04 – AddMenuForm
- [ ] Ba trường input hiển thị và controlled đúng
- [ ] Validate: tên rỗng → không submit
- [ ] Validate: giá = 0 hoặc âm → không submit
- [ ] Submit hợp lệ → gọi `onAdd` với đúng dữ liệu (`price` là number)
- [ ] Form reset về rỗng sau khi submit
- [ ] Test AddMenuForm.test.jsx: tất cả PASS ✅

### TODO-05 – addMenu
- [ ] POST đến `/menus` với body đúng
- [ ] Return đối tượng món ăn có `id` từ server
- [ ] Test restaurantService: describe `addMenu` PASS ✅

### TODO-06 – deleteMenu
- [ ] DELETE đến `/menus/:id` đúng endpoint
- [ ] Test restaurantService: describe `deleteMenu` PASS ✅

### TODO-07 – MenuPage
- [ ] Spinner hiển thị khi đang fetch
- [ ] Alert lỗi hiển thị khi API lỗi
- [ ] Danh sách món hiển thị sau khi fetch thành công
- [ ] Thêm món → món mới xuất hiện trong danh sách (không reload)
- [ ] Xóa món → món biến khỏi danh sách (không reload)

### TODO-08 – SearchBar + Filter
- [ ] Gõ vào ô tìm kiếm → danh sách lọc theo tên
- [ ] Tìm kiếm không phân biệt hoa/thường (phở = Phở)
- [ ] Xóa text → hiện lại toàn bộ danh sách
- [ ] Test SearchBar.test.jsx: tất cả PASS ✅

### TODO-09 – Lazy Loading
- [ ] `MenuPage` và `TablePage` được import bằng `React.lazy()`
- [ ] `<Routes>` được bọc trong `<Suspense fallback={...}>`
- [ ] Spinner hiển thị khi chuyển trang lần đầu
- [ ] Điều hướng `/menu` và `/tables` hoạt động đúng
- [ ] DevTools Network: thấy chunk JS riêng khi vào `/menu` lần đầu

### Tổng hợp
- [ ] `npm test` chạy xong, tất cả tests PASS
- [ ] Không có `console.error` đỏ trong browser
- [ ] Commit đúng convention: `feat(TODO-NN): mô tả ngắn`

---

## Cấu trúc thư mục

```
Lab_LazyLoading_Restaurant/
├── db.json                         ← Dữ liệu mock (menus + tables)
├── package.json
├── vite.config.js
├── jest.config.cjs
├── babel.config.cjs
├── index.html
└── src/
    ├── main.jsx
    ├── setupTests.js
    ├── App.jsx                     ← TODO-09
    ├── pages/
    │   ├── HomePage.jsx            (scaffold – không cần sửa)
    │   ├── MenuPage.jsx            ← TODO-07, TODO-08
    │   └── TablePage.jsx           (scaffold – không cần sửa)
    ├── components/
    │   ├── AppNavbar.jsx           (scaffold – không cần sửa)
    │   ├── LoadingSpinner.jsx      (scaffold – không cần sửa)
    │   ├── MenuCard.jsx            ← TODO-01
    │   ├── MenuList.jsx            ← TODO-03
    │   ├── AddMenuForm.jsx         ← TODO-04
    │   └── SearchBar.jsx          ← TODO-08
    ├── services/
    │   └── restaurantService.js    ← TODO-02, 05, 06
    └── __tests__/
        ├── restaurantService.test.js
        ├── MenuCard.test.jsx
        ├── MenuList.test.jsx
        ├── AddMenuForm.test.jsx
        └── SearchBar.test.jsx
```

---

## Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `fetchMenus` trả về object có `.data` | Return cả `response` thay vì `response.data` | Sửa thành `return response.data` |
| Spinner không biến mất | Quên `.finally(() => setLoading(false))` | Thêm `.finally` vào chain |
| Thêm món không hiện ngay | Dùng `setMenus(data)` thay vì spread | Dùng `setMenus(prev => [...prev, newMenu])` |
| Form không reset | Quên `setForm(INITIAL_FORM)` sau submit | Gọi reset sau khi gọi `onAdd` |
| Lazy loading không hoạt động | Import thường thay vì `React.lazy()` | Đổi sang `const X = lazy(() => import(...))` |
| Suspense không có fallback | Thiếu prop `fallback` | Thêm `fallback={<LoadingSpinner />}` |

> ⚠️ Bài còn có **hidden tests** kiểm tra edge cases (giá âm, tên khoảng trắng, hardcode...).
