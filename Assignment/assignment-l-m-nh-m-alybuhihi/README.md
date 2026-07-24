# 🛒 Assignment — Product Management App (ReactJS)

> **Môn:** FER202 — ReactJS | **Hình thức:** Làm việc nhóm (3–4 sinh viên) | **Tổng điểm:** 10

Xây dựng ứng dụng quản lý sản phẩm (laptop) bằng ReactJS: hiển thị danh sách sản phẩm từ API, thêm/xóa sản phẩm, xem chi tiết và chỉnh sửa sản phẩm.

📖 **Hướng dẫn code chi tiết từng TODO:** xem [GUIDE.md](./GUIDE.md)
🧪 **Hướng dẫn test API bằng Postman:** xem [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## 1. Tech Stack

| Thành phần | Công nghệ |
|-----------|-----------|
| Framework | React 18 (functional components + hooks) |
| Build tool | Vite 4.x |
| UI | React-Bootstrap 2.x + Bootstrap 5 |
| HTTP client | axios 1.x |
| Routing | react-router-dom 6.x |
| Mock API | json-server 0.17 (port **3001**) |

**Không dùng:** class components, PropTypes, Redux, TypeScript.

---

## 2. Cấu trúc dự án

```
product-management-app/
├── db.json                        # Mock database (json-server)
├── package.json
├── vite.config.js
├── public/
│   └── images/                    # laptop1.png → laptop10.png
└── src/
    ├── main.jsx                   # Entry point + BrowserRouter
    ├── App.jsx                    # Routes + state cấp App
    ├── services/
    │   └── productService.js      # getProducts, getProductById, addProduct, updateProduct, deleteProduct
    ├── components/
    │   ├── ProductCard.jsx        # Card hiển thị 1 sản phẩm
    │   ├── ProductList.jsx        # Grid danh sách sản phẩm
    │   └── AddProductForm.jsx     # Form thêm sản phẩm (controlled)
    └── pages/
        ├── HomePage.jsx           # Trang danh sách + form thêm
        ├── ProductDetailPage.jsx  # Trang chi tiết sản phẩm
        └── EditProductPage.jsx    # Trang chỉnh sửa sản phẩm
```

---

## 3. Cài đặt và chạy

```bash
npm install
npm start     # chạy đồng thời json-server (3001) + Vite (5173)
```

Hoặc chạy riêng 2 terminal:

```bash
npm run server       # json-server → http://localhost:3001/products
npm run dev          # React app  → http://localhost:5173
```

---

## 4. Danh sách TODO

### Activity 1 — Hiển thị danh sách sản phẩm từ API (3 điểm)

| # | File | Yêu cầu | Điểm |
|---|------|---------|------|
| TODO-01 | `db.json`, `package.json`, `vite.config.js` | Setup project Vite + cài dependencies + tạo db.json với 10 sản phẩm | 0.5 |
| TODO-02 | `src/services/productService.js` | Viết `getProducts()` dùng axios GET `http://localhost:3001/products` | 0.5 |
| TODO-03 | `src/components/ProductCard.jsx` | Card hiển thị: ảnh, tên, mô tả, giá gốc (gạch ngang), giá hiện tại | 0.75 |
| TODO-04 | `src/components/ProductList.jsx`, `src/pages/HomePage.jsx` | Fetch data với `useEffect`, lưu vào state, render grid. Xử lý **loading** và **error** (hiển thị thông báo lỗi khi API chết) | 1.25 |

### Activity 2 — Thêm và xóa sản phẩm (3 điểm)

| # | File | Yêu cầu | Điểm |
|---|------|---------|------|
| TODO-05 | `src/components/AddProductForm.jsx` | Form controlled inputs: name, description, price, currentPrice. Validate không rỗng, reset sau submit | 1.0 |
| TODO-06 | `src/services/productService.js`, `HomePage.jsx` | `addProduct()` POST lên API, cập nhật state để list hiển thị sản phẩm mới | 1.0 |
| TODO-07 | `src/services/productService.js`, `ProductCard.jsx`, `HomePage.jsx` | Nút **Delete** trên mỗi card → confirm → `deleteProduct(id)` DELETE → cập nhật state | 1.0 |

### Activity 3 — Trang chi tiết + chỉnh sửa sản phẩm (2 điểm)

| # | File | Yêu cầu | Điểm |
|---|------|---------|------|
| TODO-08 | `src/App.jsx`, `src/pages/ProductDetailPage.jsx` | Cấu hình React Router (`/`, `/products/:id`, `/products/:id/edit`). Click card → trang chi tiết, `getProductById(id)` hiển thị đầy đủ thông tin | 1.0 |
| TODO-09 | `src/pages/EditProductPage.jsx` | Nút **Edit** → trang edit, form pre-fill dữ liệu cũ, submit → `updateProduct()` PUT → quay về trang chi tiết với dữ liệu mới. Xử lý lỗi khi update thất bại | 1.0 |

### Teamwork — Quy trình Git/GitHub (2 điểm)

| # | Yêu cầu | Điểm |
|---|---------|------|
| TODO-10 | Mỗi TODO có **issue** đúng template, **branch** đúng chuẩn, **commit** đúng Conventional Commits, **Pull Request** được review bởi ít nhất 1 thành viên trước khi merge. Mọi thành viên đều có đóng góp code | 2.0 |

---

## 5. Quy trình làm việc nhóm (bắt buộc)
    
### 5.1. Phân công gợi ý (nhóm 4)

| Thành viên |         Tên      | Phụ trách |
|-----------|------------------|-----------|
| Leader    | Võ Văn Thanh Phong | TODO-01, TODO-04,TODO-09 review PR, quản lý board |
| Member 2  | Nguyễn Duy Hiếu| TODO-02, TODO-05, TODO-06 |
| Member 3  | Huỳnh Đăng Lý |	 TODO-03, TODO-07, TODO-08 |


### 5.2. Tạo Issue — theo template

Mỗi TODO = 1 issue. Tạo file `.github/ISSUE_TEMPLATE/todo.md`:

```markdown
---
name: TODO Task
about: Issue cho một TODO trong assignment
title: "[TODO-XX] Tên task ngắn gọn"
labels: enhancement
assignees: ""
---

## 📋 Mô tả
Mô tả ngắn gọn TODO cần làm gì.

## 📁 Files liên quan
- `src/...`

## ✅ Acceptance Criteria
- [ ] Tiêu chí 1
- [ ] Tiêu chí 2

## 🔢 Điểm: X.X
```

**Ví dụ:** `[TODO-03] Tạo component ProductCard hiển thị thông tin sản phẩm`

### 5.3. Tạo nhánh — naming convention

```
<type>/TODO-<số>-<mô-tả-ngắn>
```

| Type | Dùng khi |
|------|----------|
| `feature/` | Làm tính năng mới |
| `fix/` | Sửa bug |
| `docs/` | Sửa tài liệu |

**Ví dụ:**

```bash
git checkout main && git pull
git checkout -b feature/TODO-03-product-card
```

⚠️ **Không commit trực tiếp lên `main`.** Bật branch protection cho `main`.

### 5.4. Commit message — Conventional Commits

```
<type>(TODO-XX): <mô tả ngắn, thì hiện tại, không viết hoa chữ đầu>
```

| Type | Ý nghĩa |
|------|---------|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `docs` | Tài liệu |
| `style` | Format, CSS |
| `refactor` | Refactor code |
| `test` | Thêm/sửa test |
| `chore` | Setup, config |

**Ví dụ:**

```
feat(TODO-03): create ProductCard component with price display
fix(TODO-04): show error message when API is unreachable
chore(TODO-01): setup vite project with json-server
```

### 5.5. Pull Request

Tạo file `.github/pull_request_template.md`:

```markdown
## 🔗 Issue liên quan
Closes #<số issue>

## 📝 Thay đổi
- Thay đổi 1
- Thay đổi 2

## 📸 Screenshot / Demo
(đính kèm ảnh UI nếu có)

## ✅ Checklist
- [ ] Code chạy được, không lỗi console
- [ ] Đã test bằng Postman (nếu liên quan API)
- [ ] Commit message đúng chuẩn
- [ ] Đã tự review code trước khi tạo PR
```

**Quy tắc PR:**

1. PR phải link tới issue (`Closes #X`) — issue tự đóng khi merge.
2. Ít nhất **1 thành viên khác approve** mới được merge.
3. Người review kiểm tra: code chạy, đúng yêu cầu, đúng convention.
4. Merge bằng **Squash and merge**, xóa branch sau khi merge.

### 5.6. Quy trình chuẩn cho 1 TODO

```
Issue → Branch → Code → Commit → Push → PR → Review → Merge → Đóng issue
```

---

## 6. Checklist hoàn thành

### Chức năng

- [ ] TODO-01: Project chạy được với `npm start`
- [ ] TODO-02: `getProducts()` trả về danh sách 10 sản phẩm
- [ ] TODO-03: ProductCard hiển thị đủ ảnh, tên, mô tả, 2 loại giá
- [ ] TODO-04: Danh sách render từ API; hiển thị "Loading..." khi đang fetch; hiển thị lỗi khi tắt json-server
- [ ] TODO-05: Form validate được input rỗng, reset sau khi submit
- [ ] TODO-06: Thêm sản phẩm mới → xuất hiện ngay trên list và lưu vào db.json
- [ ] TODO-07: Xóa sản phẩm → biến mất khỏi list và db.json
- [ ] TODO-08: Click sản phẩm → `/products/:id` hiển thị chi tiết
- [ ] TODO-09: Edit → PUT thành công → quay về trang chi tiết với data mới

### Teamwork

- [ ] Mỗi TODO có issue đúng template
- [ ] Mỗi issue có branch riêng, đặt tên đúng chuẩn
- [ ] 100% commit đúng Conventional Commits
- [ ] Mỗi PR được ít nhất 1 người review + approve
- [ ] Không có commit trực tiếp lên `main`
- [ ] Mọi thành viên đều có PR được merge

### Nộp bài

- [ ] Repo GitHub (public hoặc add giảng viên làm collaborator)
- [ ] README có tên nhóm + bảng phân công
- [ ] Demo chạy được từ clone mới: `npm install && npm start`
