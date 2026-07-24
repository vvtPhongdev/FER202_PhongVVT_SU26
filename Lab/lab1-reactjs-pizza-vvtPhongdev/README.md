# Lab 02 – Single Page Application với ReactJS (Pizza SPA)

Mã môn: **FER202**
Template dành cho sinh viên thực hành Lab 02. Sinh viên clone project về, viết code vào các vị trí `TODO` trong từng component, sau đó chạy test để kiểm tra kết quả.

---

## 1. Mục tiêu của Lab

Sau khi hoàn thành, sinh viên có khả năng:

1. Tạo và tổ chức một **Single Page Application** với ReactJS + Vite.
2. Xây dựng **functional component**, truyền dữ liệu qua **props**, quản lý state bằng **`useState`**.
3. Xử lý sự kiện (click button, đóng/mở Modal).
4. Sử dụng các thành phần của **react-bootstrap**: `Navbar`, `Container`, `Row`, `Col`, `Card`, `Button`, `Modal`, `Carousel`.
5. Hiển thị danh sách dữ liệu bằng `Array.map`.
6. Viết component `BannerCarousel` để hiển thị ảnh banner từ một list.

---

## 2. Yêu cầu môi trường

| Công cụ | Phiên bản tối thiểu |
|---------|---------------------|
| Node.js | 18.x                |
| npm     | 9.x                 |

---

## 3. Cài đặt & chạy project

```bash
# 1. Clone project về máy
git clone <repo-url> pizza-react-template
cd pizza-react-template

# 2. Cài đặt dependencies
npm install

# 3. Chạy dev server
npm run dev

# 4. Mở trình duyệt tại http://localhost:5173
```

Các lệnh khác:

```bash
npm run build        # build production
npm run test         # chạy toàn bộ test một lần
npm run test:watch   # chạy test ở chế độ watch (tự reload khi save file)
```

---

## 4. Cấu trúc thư mục

```
pizza-react-template/
├── .github/
│   ├── workflows/
│   │   └── classroom.yml           ← Autograding workflow (KHÔNG sửa)
│   └── classroom/
│       └── autograding.json        ← Classroom config (KHÔNG sửa)
├── public/
│   └── images/
│       ├── banners/                ← Ảnh banner (banner1.jpg … banner4.jpg)
│       └── pizzas/                 ← Ảnh pizza (1.jpg … 8.jpg)
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                     ← TODO
    ├── index.css
    ├── components/
    │   ├── NavBar.jsx              ← TODO
    │   ├── BannerCarousel.jsx      ← TODO
    │   ├── PizzaCard.jsx           ← TODO
    │   ├── PizzaDetailModal.jsx    ← TODO
    │   └── Pizzas.jsx              ← TODO
    ├── shared/
    │   ├── ListOfPizzas.js         (data, KHÔNG sửa)
    │   └── ListOfBanners.js        (data, KHÔNG sửa)
    └── tests/
        ├── setup.js
        ├── NavBar.test.jsx
        ├── BannerCarousel.test.jsx
        ├── PizzaCard.test.jsx
        ├── PizzaDetailModal.test.jsx
        ├── Pizzas.test.jsx
        └── App.test.jsx
```

> ⚠️ Sinh viên **CHỈ** chỉnh sửa các file trong `src/components/` và `src/App.jsx`.
> **Không sửa** file trong `src/shared/`, `src/tests/`, hay `.github/`.

---

## 5. Cấu trúc dữ liệu

### 5.1. `ListOfPizzas.js`

Mỗi phần tử `pizza` có dạng:

```js
{
  id: '1',
  pizzaName: 'Margherita',
  description: '...',
  category: 'Classic',      // 'Classic' | 'Gourmet' | 'Vegetarian' | 'Spicy'
  isSpecial: false,
  image: './images/pizzas/1.jpg',
  origin: 'Italy',
  topping: 'Mozzarella',
  rating: 5                 // 1 – 5
}
```

### 5.2. `ListOfBanners.js`

Mỗi phần tử `banner` có dạng:

```js
{
  id: 'b1',
  title: 'Welcome to Pizza World',
  caption: '...',
  image: './images/banners/banner1.jpg'
}
```

---

## 6. Nhiệm vụ chi tiết cho từng component

### 6.1. `src/components/NavBar.jsx`

Sử dụng `Navbar`, `Container`, `Nav` của **react-bootstrap**.

**Yêu cầu:**
1. Render một thẻ `<nav>` (do react-bootstrap `Navbar` tự sinh).
2. Hiển thị brand text là **`Pizzas`** qua `<Navbar.Brand>`.
3. Có ít nhất một `<Nav.Link>` (ví dụ: Home, About, Contact).

*Test kiểm tra:* `src/tests/NavBar.test.jsx`

---

### 6.2. `src/components/BannerCarousel.jsx`

Sử dụng `Carousel`, `Carousel.Item` của **react-bootstrap**.

**Yêu cầu:**
1. `BannersData` đã được import sẵn từ `../shared/ListOfBanners`.
2. Dùng `BannersData.map(...)` để render `<Carousel.Item>` cho từng banner.
3. Mỗi item bao gồm:
   - `<img src={banner.image} ... />`
   - `<Carousel.Caption>` chứa `banner.title` và `banner.caption`.
4. Số lượng `.carousel-item` phải bằng `BannersData.length`.

*Test kiểm tra:* `src/tests/BannerCarousel.test.jsx`

---

### 6.3. `src/components/PizzaCard.jsx`

Component nhận **props**:

| Prop           | Kiểu     | Ý nghĩa                                                       |
|----------------|----------|---------------------------------------------------------------|
| `pizza`        | object   | Object pizza hiện tại                                         |
| `onShowDetail` | function | Callback được gọi khi nhấn nút Detail, nhận tham số `pizza`  |

**Yêu cầu:**
1. Render `<Card>` của react-bootstrap.
2. `<Card.Img variant="top" src={pizza.image} />`.
3. `<Card.Title>` hiển thị `pizza.pizzaName`.
4. `<Card.Text>` hiển thị `pizza.category`.
5. Có `<Button>` với label **`Detail`** — khi click gọi `onShowDetail(pizza)`.

*Test kiểm tra:* `src/tests/PizzaCard.test.jsx`

---

### 6.4. `src/components/PizzaDetailModal.jsx`

Component nhận **props**:

| Prop      | Kiểu     | Ý nghĩa                             |
|-----------|----------|-------------------------------------|
| `show`    | boolean  | Trạng thái hiển thị modal           |
| `pizza`   | object   | Pizza đang được chọn (có thể null)  |
| `onClose` | function | Callback gọi khi đóng modal         |

**Yêu cầu:**
1. Sử dụng `<Modal show={show} onHide={onClose}>` của react-bootstrap.
2. `<Modal.Title>` hiển thị `pizza.pizzaName` (khi `pizza` khác null).
3. `<Modal.Body>` chứa `<img src={pizza.image} />` và `<p>{pizza.description}</p>`.
4. `<Modal.Footer>` có `<Button>` **`Close`** — khi click gọi `onClose`.

*Test kiểm tra:* `src/tests/PizzaDetailModal.test.jsx`

---

### 6.5. `src/components/Pizzas.jsx`

Component cha quản lý state và phối hợp các component con.

**Yêu cầu:**
1. Khai báo 2 state bằng `useState`:
   - `show` (boolean, mặc định `false`).
   - `selectedPizza` (object | null, mặc định `null`).
2. Viết 2 hàm xử lý sự kiện:
   - `handleShow(pizza)` → set `selectedPizza = pizza`, `show = true`.
   - `handleClose()` → set `show = false`.
3. Render `<Container>` chứa `<Row>`, duyệt `PizzasData.map(...)`:
   - Mỗi `<Col md={3}>` chứa `<PizzaCard pizza={...} onShowDetail={handleShow} />`.
4. Sau Row, render `<PizzaDetailModal show={show} pizza={selectedPizza} onClose={handleClose} />`.

*Test kiểm tra:* `src/tests/Pizzas.test.jsx`

---

### 6.6. `src/App.jsx`

Kết hợp tất cả lại:

1. Render `<NavBar />`.
2. Render `<BannerCarousel />`.
3. Render `<Pizzas />`.

*Test kiểm tra:* `src/tests/App.test.jsx`

---

## 7. Chạy & đọc kết quả test

```bash
# Chạy toàn bộ test
npm run test

# Kết quả mong đợi khi hoàn thành đầy đủ:
#  Test Files  6 passed (6)
#       Tests  21 passed (21)

# Chạy test cho một file cụ thể
npx vitest run src/tests/PizzaCard.test.jsx

# Chế độ watch (tự reload khi save file)
npm run test:watch
```

---

## 8. Bảng điểm (tổng 10 điểm)

| Component                 | Điểm |
|---------------------------|------|
| `NavBar`                  | 1.0  |
| `BannerCarousel`          | 2.0  |
| `PizzaCard`               | 2.0  |
| `PizzaDetailModal`        | 2.0  |
| `Pizzas`                  | 2.0  |
| `App.jsx` (integration)   | 1.0  |
| **Tổng**                  | **10.0** |

> **Quy tắc:** Tất cả test trong một file phải **pass** mới được điểm của file đó. Nếu có bất kỳ test nào fail → **0 điểm** cho component đó.

---

## 9. Autograding – GitHub Classroom

Mỗi lần `git push`, GitHub Actions tự chạy workflow:

1. **`.github/workflows/classroom.yml`** — cài Node, chạy từng test file.
2. Mỗi step tương ứng một cột điểm riêng biệt trên tab **Actions**.
3. Step cuối **"Autograding Reporter"** tổng hợp và ghi điểm lên GitHub Classroom dashboard.

### Cách xem điểm (sinh viên)

```
GitHub repo của bạn → tab Actions
  → chọn workflow run mới nhất
  → mở job "run-autograding-tests"
  → xem từng step để biết component nào pass / fail
  → xem step "Autograding Reporter" để biết tổng điểm
```

Ví dụ hiển thị trong tab Actions:

```
✅ NavBar component (1đ)           → 1/1
✅ BannerCarousel component (2đ)   → 2/2
❌ PizzaCard component (2đ)        → 0/2
❌ PizzaDetailModal component (2đ) → 0/2
❌ Pizzas component (2đ)           → 0/2
✅ App integration (1đ)            → 1/1
─────────────────────────────────────────
Tổng: 4 / 10
```

---

## 10. Lưu ý khi làm bài

- **Không** xóa hoặc đổi tên các file test, các file trong `.github/`.
- **Không** sửa file trong `src/shared/` và `src/tests/`.
- Tên export, tên props phải **đúng chính xác** như mô tả (case-sensitive).
- Brand text NavBar phải là **`Pizzas`** (chữ thường đầu, test dùng `/pizzas/i`).
- Khi click nút **Detail**, bắt buộc truyền object `pizza` vào callback `onShowDetail`.
- Nút đóng Modal bắt buộc có chữ **`Close`**.
- Đảm bảo `import 'bootstrap/dist/css/bootstrap.min.css'` (đã có sẵn trong `main.jsx`).
- Nếu Actions không chạy: kiểm tra **Settings → Actions → Allow all actions**.

Chúc các bạn hoàn thành bài thực hành tốt! 🍕
