# BÀI THI TEST SAMPLE — FER202 su26
## Restaurant Management App

> **Thời gian:** 90 phút  
> **Tổng điểm:** 10 điểm  
> **Công cụ:** VS Code, trình duyệt, tài liệu được phép mở trên máy 

---

## Giới thiệu bài thi 

Bạn nhận được một project **Restaurant Management App** đã được dựng sẵn cấu trúc. Project sử dụng:

- React 18 + Vite
- React-Bootstrap 2.x
- axios + json-server (port 3001)
- React Router v6
- Context API + useReducer

**Khởi động project:**

```bash
npm install
npm start        # chạy đồng thời json-server + Vite dev server
```

Tài khoản test: `admin / admin123` (role: Admin)

---

## Cấu trúc thư mục quan trọng

```
src/
├── api/
│   ├── authApi.js          # hàm login() — đã xử lý kiểm tra role Admin
│   └── restaurantApi.js    # fetch/add/update/delete cho restaurants & categories
├── components/
│   ├── AppNavbar.jsx       # thanh điều hướng
│   ├── AppFooter.jsx       # footer
│   ├── CategoryList.jsx    # bảng danh sách category (với inline edit — đã có sẵn)
│   ├── ModalConfirm.jsx    # modal xác nhận dùng lại được
│   └── RestaurantRow.jsx   # một dòng trong bảng danh sách nhà hàng
├── context/
│   ├── AuthContext.jsx     # export AuthContext (named) + AuthProvider + useAuth
│   └── RestaurantContext.jsx # export RestaurantContext (named) + RestaurantProvider + useRestaurant
├── data/
│   └── about.js            # { appName, logo, version, course, year, copyright, ... }
├── pages/
│   ├── Login.jsx           # trang đăng nhập
│   ├── RestaurantList.jsx  # trang chủ — danh sách nhà hàng
│   ├── RestaurantDetail.jsx# chi tiết nhà hàng
│   ├── ManageCategories.jsx# quản lý category
│   └── CategoryDetail.jsx  # chi tiết category + danh sách nhà hàng
└── utils/
    ├── format.js           # formatVND(), formatPriceRange(), formatDateDisplay()
    └── validate.js         # validateCategoryName(), validateUsername(), ...
```

---

## Cách chạy test

Mở terminal trong thư mục project và chạy:

```bash
# Chạy tất cả visible tests
npm test

# Chạy test cho một file cụ thể
npm test -- --testPathPattern="Login"
npm test -- --testPathPattern="AppNavbar"
npm test -- --testPathPattern="AppFooter"
npm test -- --testPathPattern="RestaurantRow"
npm test -- --testPathPattern="RestaurantDetail"
npm test -- --testPathPattern="CategoryDetail"
npm test -- --testPathPattern="ManageCategories"

# Chạy một lần (không watch)
npm test -- --watchAll=false
```

---

## Bảng điểm tổng quan

| TODO | Chức năng | File | Điểm |
|------|-----------|------|------|
| TODO-01 | Alert khi đăng nhập không phải Admin | `Login.jsx` | 1,0 |
| TODO-02 | Hiển thị thông tin người dùng trên Navbar | `AppNavbar.jsx` | 1,0 |
| TODO-03 | Nút Logout chuyển về trang Login | `AppNavbar.jsx` | 1,0 |
| TODO-04 | Click tên ứng dụng về trang chủ | `AppNavbar.jsx` | 0,5 |
| TODO-05 | View Detail nhà hàng + nút Back | `RestaurantDetail.jsx` | 1,0 |
| TODO-06 | Xóa nhà hàng với ModalConfirm | `RestaurantRow.jsx` | 1,0 |
| TODO-07 | Cột Price Range trong danh sách nhà hàng | `RestaurantList.jsx` + `RestaurantRow.jsx` | 0,5 |
| TODO-08 | Footer lấy dữ liệu từ `about.js` | `AppFooter.jsx` | 1,0 |
| TODO-09 | Trang chi tiết Category + danh sách | `CategoryDetail.jsx` | 1,0 |
| TODO-10A | Thêm Category (form) | `ManageCategories.jsx` | 1,0 |
| TODO-10B | Xóa Category (hộp thoại) | `ManageCategories.jsx` | 1,0 |
| **Tổng** | | | **10,0** |

---

## Chi tiết từng TODO

---

### TODO-01 — Alert khi đăng nhập không phải Admin
**File:** `src/pages/Login.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="Login" --watchAll=false`

#### Yêu cầu

Khi người dùng submit form đăng nhập:
- Nếu login **thất bại** (sai thông tin, hoặc role không phải `'Admin'`): hiển thị `<Alert variant="danger">` với nội dung lỗi từ server.
- Nếu login **thành công** (Admin đúng): gọi `loginUser(user)` và navigate về `/`.
- Khi mới vào trang: **không** hiển thị Alert.

> **Lưu ý:** `authApi.login()` đã tự kiểm tra role — nếu không phải Admin, hàm sẽ ném lỗi. Nhiệm vụ của bạn là **bắt lỗi đó và hiển thị Alert**.

#### Yêu cầu kỹ thuật

- Phải dùng `<Alert variant="danger" dismissible onClose={...}>` — React-Bootstrap Alert tự tạo `role="alert"` và nút đóng có `aria-label="Close"`.
- Nội dung Alert = `err.message` (lấy từ error được ném ra) — **không hardcode** chuỗi như `"Only Admin accounts are allowed."`.
- Nút **×** (dismissible) phải xoá Alert khi nhấn.

#### ✅ Checklist

- [ ] Khi đăng nhập với tài khoản không phải Admin → Alert xuất hiện
- [ ] Khi đăng nhập sai username/password → Alert xuất hiện
- [ ] Nội dung Alert chứa thông báo lỗi thực (không phải chuỗi rỗng hay "Error")
- [ ] Nhấn × trên Alert → Alert biến mất
- [ ] Khi mới vào trang Login → không có Alert nào

---

### TODO-02 — Hiển thị thông tin người dùng trên Navbar
**File:** `src/components/AppNavbar.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Yêu cầu

Khi `user !== null` (đã đăng nhập), hiển thị trên Navbar:
- **Tên đầy đủ** (`user.fullName`) — dạng chữ đậm, màu trắng
- **Badge role** (`user.role`) — dùng `<Badge>` của React-Bootstrap

Khi `user === null` (chưa đăng nhập): **không hiển thị** thông tin user.

#### Yêu cầu kỹ thuật

- Dữ liệu phải lấy từ **context** (`useAuth()` hoặc `AuthContext`), **không hardcode** chuỗi.
- Khi `user = null`: không có text "Logged in as", không có nút Logout.
- Badge phải hiển thị đúng giá trị `user.role` (có thể là bất kỳ role nào, không chỉ "Admin").

#### ✅ Checklist

- [ ] Khi đăng nhập → tên đầy đủ (fullName) xuất hiện trên Navbar
- [ ] Khi đăng nhập → role xuất hiện dưới dạng Badge
- [ ] Giá trị hiển thị lấy từ context (thay user bằng name khác vẫn hiển thị đúng)
- [ ] Khi chưa đăng nhập (user=null) → không có text "Logged in as", không có nút Logout

---

### TODO-03 — Nút Logout chuyển về trang Login
**File:** `src/components/AppNavbar.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Yêu cầu

Khi user đã đăng nhập, hiển thị nút **Logout**. Khi nhấn:
1. Gọi `logoutUser()` từ AuthContext
2. Navigate đến `/login`

#### Yêu cầu kỹ thuật

- Phải là `<Button>` (hoặc phần tử có `role="button"`) với text chứa "Logout" (không phân biệt hoa/thường).
- **Phải gọi `logoutUser()`** — test mock hàm này và kiểm tra đã được gọi.
- Phải nằm trong khối `{user && ...}` — chỉ hiện khi đã đăng nhập.

#### ✅ Checklist

- [ ] Nút "Logout" xuất hiện khi đã đăng nhập
- [ ] Nhấn Logout → `logoutUser()` được gọi
- [ ] Nhấn Logout → chuyển trang về `/login`
- [ ] Khi chưa đăng nhập → không có nút Logout

---

### TODO-04 — Click tên ứng dụng về trang chủ
**File:** `src/components/AppNavbar.jsx` | **Điểm:** 0,5  
**Chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Yêu cầu

`Navbar.Brand` hiển thị logo (`about.logo`) và tên app (`about.appName`). Khi nhấn → navigate về `/`.

#### Yêu cầu kỹ thuật

- Phải render thành thẻ `<a href="/">` — test kiểm tra `.closest('a')` và `getAttribute('href') === '/'`.
- **Dùng `as={Link} to="/"`** — không dùng `onClick + navigate()` vì test tìm thuộc tính `href`.
- Tên app phải lấy từ `about.appName` — **không hardcode**.

#### ✅ Checklist

- [ ] Brand hiển thị tên app (`about.appName`) — không hardcode "Restaurant Management App"
- [ ] Brand có `href="/"` (kiểm tra: nhấn chuột phải → "Inspect" → thấy `<a href="/">`)
- [ ] Brand dùng `as={Link} to="/"` (không dùng onClick + navigate)

---

### TODO-05 — View Detail nhà hàng + nút Back
**File:** `src/pages/RestaurantDetail.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="RestaurantDetail" --watchAll=false`

#### Yêu cầu

Trang `/restaurants/:id`:
1. **Loading:** Gọi `fetchRestaurantById(id)` khi mount, hiển thị Spinner khi đang tải.
2. **Lỗi:** Hiển thị Alert nếu API thất bại.
3. **Thông tin:** Name, Category (Badge), Owner, Address, Price Min, Price Max (formatVND), Open Date (formatDateDisplay, chỉ khi có).
4. **Nút Back:** Khi nhấn, quay lại trang trước (`navigate(-1)`).

#### Yêu cầu kỹ thuật

- Spinner: dùng **`<Spinner animation="border" />`** — tạo class `.spinner-border` mà test tìm bằng `document.querySelector('.spinner-border')`. **Không dùng** `animation="grow"`.
- Alert lỗi: dùng `<Alert variant="danger">` — tạo `role="alert"`.
- Category name: lấy từ `state.categories.find(c => c.id === restaurant.categoryId)?.name` — dữ liệu từ `useRestaurant()`.
- Price: dùng `formatVND(restaurant.priceMin)` → output `"300.000 ₫"` (dấu chấm, ký hiệu ₫).
- Nút Back: text phải chứa "Back" (không phân biệt hoa/thường).
- `RestaurantContext` phải được **export named**: `export const RestaurantContext = createContext(null)`.

#### ✅ Checklist

- [ ] Spinner xuất hiện ngay khi trang load (trước khi API trả về) — dùng `animation="border"`
- [ ] Sau khi load xong → tên nhà hàng hiển thị
- [ ] Owner hiển thị đúng (không hardcode)
- [ ] Price Min và Price Max dạng `"300.000 ₫"` (dùng formatVND)
- [ ] Tên category lấy từ context.categories (không gọi API riêng)
- [ ] Khi API lỗi (404) → Alert hiển thị
- [ ] Có nút Back (text chứa "back")

---

### TODO-06 — Xóa nhà hàng với ModalConfirm
**File:** `src/components/RestaurantRow.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### Yêu cầu

Mỗi dòng nhà hàng có link/nút **Delete**. Khi nhấn:
1. Hiển thị `<ModalConfirm>` với title `"Confirm Delete"`.
2. Xác nhận → gọi `onDelete(restaurant.id)`, đóng modal.
3. Huỷ → đóng modal, không làm gì.

#### Yêu cầu kỹ thuật

- Phải có `useState` để quản lý `showModal`.
- Nút/link Delete: text phải match `/delete/i`.
- `<ModalConfirm>` phải nhận `show={showModal}` — khi `show=true` sẽ render modal có `role="dialog"`.
- `confirmText="Delete"` — nút confirm trong modal có text "Delete", nằm trong `.modal-footer`.
- `onConfirm`: gọi `onDelete(restaurant.id)` **trước** rồi `setShowModal(false)`.
- `onCancel`: chỉ `setShowModal(false)`, **không** gọi `onDelete`.
- `restaurant.id` phải từ props — **không hardcode** id.
- Tên nhà hàng phải xuất hiện trong message của modal.

#### ✅ Checklist

- [ ] Có link/nút với text "Delete" trong mỗi dòng
- [ ] Nhấn Delete → modal xuất hiện (có tên nhà hàng)
- [ ] Modal có nút "Delete" (confirm) và "Cancel"
- [ ] Nhấn Delete trong modal → `onDelete` được gọi với đúng `restaurant.id`
- [ ] Nhấn Cancel → modal đóng, `onDelete` KHÔNG được gọi
- [ ] Nếu thay đổi id của restaurant, `onDelete` vẫn nhận đúng id mới

---

### TODO-07 — Cột Price Range trong danh sách nhà hàng
**File:** `src/pages/RestaurantList.jsx` + `src/components/RestaurantRow.jsx` | **Điểm:** 0,5  
**Chạy test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### Yêu cầu

**RestaurantList.jsx:** Thêm header `<th>Price Range</th>` vào bảng.  
**RestaurantRow.jsx:** Thêm cột hiển thị khoảng giá dùng `formatPriceRange(restaurant.priceMin, restaurant.priceMax)`.

#### Yêu cầu kỹ thuật

- Dùng `formatPriceRange()` từ `../utils/format` — output: `"50.000 ₫ – 200.000 ₫"` (dấu chấm phân cách nghìn, ký hiệu ₫).
- Test tìm text theo regex `/50\.000|50,000/` — chấp nhận cả dấu chấm lẫn dấu phẩy.
- Khi `priceMin = 0`: phải hiển thị `"0 ₫"` — test kiểm tra `/0\s*₫|0 đ/`.
- **Không hardcode** giá trị — phải lấy từ `restaurant.priceMin` và `restaurant.priceMax`.

#### ✅ Checklist

- [ ] RestaurantList có `<th>Price Range</th>` trong header
- [ ] RestaurantRow có `<td>` hiển thị kết quả `formatPriceRange(...)`
- [ ] Kết quả có dạng `"50.000 ₫ – 200.000 ₫"` (dấu chấm VN)
- [ ] Khi priceMin = 0 → hiển thị `"0 ₫ – ..."`
- [ ] Không hardcode giá trị

---

### TODO-08 — Footer lấy dữ liệu từ `about.js`
**File:** `src/components/AppFooter.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="AppFooter" --watchAll=false`

#### Yêu cầu

Footer hiển thị: logo, copyright, phiên bản, môn học — tất cả lấy từ `about.js`.

#### Yêu cầu kỹ thuật

- Phải dùng thẻ **`<footer>`** (không phải `<div>`) — test tìm `container.querySelector('footer')`.
- **`<img>`** phải có `src={about.logo}` — test kiểm tra `img.getAttribute('src') === '/images/logo.png'`.
- Text phải chứa `about.version` (`"v2.0.0"`), `about.year` (`2026`), `"FER202"` từ `about.course`.
- **Không hardcode** năm, version, tên môn.

#### Dữ liệu `about.js`

```
appName   = 'Restaurant Management App'
logo      = '/images/logo.png'
version   = 'v2.0.0'
course    = 'FER202 — ReactJS'
year      = 2026
copyright = '© 2026 Restaurant Management App'
```

#### ✅ Checklist

- [ ] Dùng thẻ `<footer>` (không phải `<div>`)
- [ ] Có `<img src={about.logo}>` (src = `/images/logo.png`)
- [ ] Text chứa năm 2026 (từ `about.copyright` hoặc `about.year`)
- [ ] Text chứa "v2.0.0" (từ `about.version`)
- [ ] Text chứa "FER202" (từ `about.course`)
- [ ] Không hardcode bất kỳ chuỗi nào từ `about`

---

### TODO-09 — Trang chi tiết Category + danh sách nhà hàng
**File:** `src/pages/CategoryDetail.jsx` | **Điểm:** 1,0  
**Chạy test:** `npm test -- --testPathPattern="CategoryDetail" --watchAll=false`

#### Yêu cầu

Trang `/categories/:id`:
1. Gọi **song song** `GET /categories` và `GET /restaurants` bằng `Promise.all`.
2. Tìm category theo `id`, lọc restaurants thuộc category đó.
3. Hiển thị Spinner khi tải, Alert nếu category không tồn tại.
4. Hiển thị tên category trong Badge, số lượng nhà hàng.
5. Bảng nhà hàng: `#`, `Name`, `Owner`, `Address`, `Price Range`.
6. Nút **← Back to Categories** navigate về `/categories`.

#### Yêu cầu kỹ thuật

- **So sánh id phải dùng `String()`**: `String(c.id) === String(id)` — id từ URL luôn là string, id trong JSON có thể là number.
- Alert khi không tìm thấy: `setError('Category not found.')` → `<Alert variant="danger">`.
- Bảng phải có header text (không phân biệt hoa/thường): `Name`, `Owner`, `Address`, `Price`.
- Nút Back: text phải match **`/back to categories/i`**.
- Tên category phải từ API (anti-hardcode).
- Không dùng `useRestaurant()` — page tự fetch data bằng `axios`.

#### ✅ Checklist

- [ ] Dùng `Promise.all` để fetch song song
- [ ] So sánh id dùng `String(c.id) === String(id)` (không dùng `===` trực tiếp)
- [ ] Tên category hiển thị đúng từ API
- [ ] Chỉ hiển thị nhà hàng thuộc đúng category (lọc đúng)
- [ ] Bảng có cột: Name, Owner, Address, Price (hoặc Price Range)
- [ ] Category id không tồn tại → Alert hiển thị
- [ ] Có nút "← Back to Categories" (text match `/back to categories/i`)

---

### TODO-10 — Thêm Category + Xóa Category
**File:** `src/pages/ManageCategories.jsx` | **Điểm:** 2,0 (10A: 1,0 + 10B: 1,0)  
**Chạy test:** `npm test -- --testPathPattern="ManageCategories" --watchAll=false`

---

#### 10A — Thêm Category (1,0 điểm)

##### Yêu cầu

Form thêm category mới (đã có sẵn trong template):
- Input tên (required, minLength=3), placeholder `"e.g. Buffet"`.
- Khi submit hợp lệ: gọi `addCategory({ name })`, thêm vào danh sách, reset form.
- Tên trùng (case-insensitive) → hiển thị lỗi.

##### Yêu cầu kỹ thuật

- Placeholder phải chính xác: **`placeholder="e.g. Buffet"`** — test tìm `getByPlaceholderText(/e\.g\. Buffet/i)`.
- Nút Add: phải có text match **`/add/i`** — `<Button type="submit">Add</Button>`.
- Sau khi thêm: category từ **API response** (`created`) phải xuất hiện — không reload, không hardcode.
- Tên trùng: phải hiển thị text chứa **`"already exists"`**.
- Tên < 3 ký tự: **không gọi POST API**.

##### ✅ Checklist 10A

- [ ] Input có `placeholder="e.g. Buffet"` (chính xác)
- [ ] Nút submit có text "Add"
- [ ] Nhập tên hợp lệ + nhấn Add → category mới xuất hiện trong danh sách
- [ ] Category mới lấy từ API response (không phải từ giá trị input)
- [ ] Form reset sau khi thêm thành công
- [ ] Tên trùng (case-insensitive) → hiển thị "already exists"
- [ ] Tên < 3 ký tự → không gọi POST API

---

#### 10B — Xóa Category với hộp thoại (1,0 điểm)

##### Yêu cầu

Nút Delete trong bảng category. Khi nhấn:
1. Hiển thị `<ModalConfirm>` xác nhận xóa với tên category.
2. Xác nhận → gọi `deleteCategory(id)`, xóa khỏi danh sách.
3. Huỷ → đóng modal, không thay đổi.

##### Yêu cầu kỹ thuật

- Nút Delete trong bảng: `<Button>Delete</Button>` — test dùng `getAllByRole('button', { name: /delete/i })`.
- Sau khi nhấn Delete: modal xuất hiện với `role="dialog"`.
- Tên category phải hiển thị trong `<strong>` bên trong message modal.
- Sau xác nhận: gọi DELETE API và category **biến mất** khỏi danh sách.
- Cancel: category giữ nguyên, DELETE API không được gọi.

##### ✅ Checklist 10B

- [ ] Bảng category có nút "Delete" cho mỗi dòng (dùng `<Button>Delete</Button>`)
- [ ] Nhấn Delete → modal xuất hiện (có tên category trong `<strong>`)
- [ ] Xác nhận → DELETE API được gọi với đúng id
- [ ] Xác nhận → category biến mất khỏi danh sách
- [ ] Cancel → category vẫn còn, DELETE API không được gọi

---

---

## Lưu ý chung

- **Không xóa** các comment `// TODO-NN` đã có trong code template.
- **Không thay đổi** cấu trúc file hoặc tên component.
- Dùng **React-Bootstrap** cho tất cả UI.
- Dữ liệu lấy từ **json-server** chạy ở port 3001 — đảm bảo server đang chạy khi test thủ công.
- **Chạy `npm test` sau mỗi TODO** để xác nhận trước khi làm TODO tiếp theo.

---

*Chúc các bạn làm bài tốt!* 🚀
