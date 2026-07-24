# ĐỀ THI THỰC HÀNH — Car Rental App (BaiMau2)
## FER202 — ReactJS | Thời gian: 90 phút

---

## MÔ TẢ ỨNG DỤNG

Bạn sẽ hoàn thiện một ứng dụng **Car Rental App** — hệ thống quản lý xe cho thuê, gồm 2 collection chính:

- **cars**: danh sách xe (id, name, carTypeId, seats, transmission, priceWeekday, priceWeekend, lastServiced)
- **carTypes**: loại xe (id, name)
- **users**: tài khoản đăng nhập (id, username, password, role, fullName, **email**)

Ứng dụng đã được cung cấp sẵn cấu trúc, API, reducer, context và các trang cơ bản. Nhiệm vụ của bạn là **hoàn thành các TODO** được đánh dấu trong mã nguồn.

> **Biến thể BaiMau2** so với đề gốc (BaiMau): TODO-01 đổi thành phân quyền theo role (Admin / User), TODO-03 đổi từ Logout (đã cho sẵn) sang dropdown sắp xếp Name/Seats/Price, TODO-07 đổi từ Price Range sang chỉ hiện Price Weekday.

---

## DỮ LIỆU MẪU (db.json)

- 3 users (1 Admin, 2 User) — mỗi user có trường **email**
- 3 carTypes (Economy, SUV, Luxury)
- 15 cars — **5 xe mỗi loại**

```json
"users": [
  { "id": "1", "username": "admin", "password": "admin123", "role": "Admin", "fullName": "Rental Manager", "email": "admin@carrental.com" },
  { "id": "2", "username": "user1", "password": "user123",  "role": "User",  "fullName": "Nguyen Van A",   "email": "user1@carrental.com" },
  { "id": "3", "username": "agent", "password": "agent123", "role": "User", "fullName": "Tran Thi B", "email": "agent@carrental.com" }
],
"carTypes": [
  { "id": "1", "name": "Economy" },
  { "id": "2", "name": "SUV" },
  { "id": "3", "name": "Luxury" }
]
```

**Lưu ý quan trọng:** cả 3 tài khoản (Admin và 2 User) đều **đăng nhập thành công** — không còn giới hạn "chỉ Admin mới login được" như đề gốc. Sự khác biệt giữa Admin và User nằm ở **quyền thao tác** (Admin thấy đủ nút Add/Delete, User chỉ xem danh sách read-only) — xem TODO-01.

---

## HƯỚNG DẪN CHẠY ỨNG DỤNG

```bash
# Chạy đồng thời JSON Server (port 3001) + React Dev Server (port 5173)
npm start

# Chạy tests
npm test
```

> **Lưu ý:** `npm start` sẽ tự động mở trình duyệt tới trang chạy ứng dụng (Vite `server.open: true`). Nếu trình duyệt không tự mở, hãy vào thủ công địa chỉ Vite in ra trong terminal (mặc định `http://localhost:5173`) — trang gốc `/` yêu cầu đăng nhập nên sẽ tự động chuyển đến trang **Login**.

---

## TODO LIST VÀ ĐIỂM SỐ

| TODO | Mô tả | Điểm |
|------|-------|------|
| TODO-01 | Login + CarList — đăng nhập không còn chặn role User; ẩn nút Add/Delete khi role != Admin (test rendering theo role) | 1.0 |
| TODO-02 | Navbar — hiển thị user.email (bold) + user.role (Badge) | 1.0 |
| TODO-03 | CarList — dropdown sắp xếp Name / Seats / Price (tăng/giảm), cập nhật phân trang tương ứng. *(Logout đã được cho sẵn, không còn là TODO)* | 1.0 |
| TODO-04 | AddCar — useEffect fetch CarType, đổ dữ liệu vào dropdown | 1.0 |
| TODO-05 | CarDetail — useEffect fetch, Spinner, Alert, Back, Card | 1.0 |
| TODO-06 | CarRow — Delete với ModalConfirm | 1.0 |
| TODO-07 | CarRow — chỉ hiển thị cột Price Weekday đúng định dạng (không còn Price Range) | 0.5 |
| TODO-08 | AppFooter — hiển thị logo, copyright, version, appName | 0.5 |
| TODO-09 | NotFound — Thiết kế trang 404 chuẩn | 1.0 |
| TODO-10A | CarTypeDetail — fetch dữ liệu (Promise.all), redirect 404 khi id không hợp lệ, hiển thị danh sách xe | 1.0 |
| TODO-10B | ManageCarTypes — kiểm tra CarType đang được sử dụng trước khi xóa | 1.0 |
| **Tổng** | | **10.0** |

---

## CHI TIẾT TỪNG TODO

---

### TODO-01 — Login & CarList: Đăng nhập không phân biệt role, ẩn nút theo quyền (1.0 điểm)
**File:** `src/pages/Login.jsx`, `src/pages/CarList.jsx`
**Cho sẵn (không sửa):** `src/api/authApi.js`, `src/components/CarRow.jsx`

**Yêu cầu:**
1. `src/pages/Login.jsx` — trong khối `catch` của `handleSubmit`, dispatch action `SET_ERROR` với `err.message` để hiển thị Alert (giữ nguyên cơ chế cũ). **Khác biệt quan trọng so với đề gốc:** cả Admin và User đều đăng nhập thành công — `authApi.js` đã được cung cấp sẵn, không còn ném lỗi "Access denied. Only Admin users can log in." Alert chỉ còn xuất hiện khi **sai username/password**.
2. `src/pages/CarList.jsx` — dùng `useAuth()` để lấy `user`, tính `isAdmin = user?.role === 'Admin'`. Nếu **không phải Admin** (role User) → **ẩn nút "+ Add Car"** và **ẩn nút Delete** trên từng dòng xe (truyền prop `canManage={isAdmin}` xuống `CarRow`, `CarRow` đã có sẵn logic ẩn/hiện Delete dựa trên prop này). User vẫn thấy nút **View** để xem chi tiết xe.

**Yêu cầu kỹ thuật:**
```jsx
// Login.jsx - trong catch
dispatch({ type: 'SET_ERROR', payload: err.message })

// CarList.jsx
const { user } = useAuth()
const isAdmin = user?.role === 'Admin'
// ...
{isAdmin && <Button onClick={() => navigate('/add')}>+ Add Car</Button>}
// ...
<CarRow car={r} index={...} onDelete={handleDelete} canManage={isAdmin} />
```

**Tình huống test:**
- Sai username/password → Alert "Invalid username or password."
- Đăng nhập `user1 / user123` (role User) → đăng nhập **thành công**, không có Alert, vào CarList nhưng **không** thấy nút Add Car / Delete
- Đăng nhập `admin / admin123` (role Admin) → đầy đủ nút Add Car / Delete như bình thường

**Checklist:**
- [ ] `dispatch({ type: 'SET_ERROR', payload: err.message })` trong catch block của Login
- [ ] Alert chỉ hiện khi sai username/password, KHÔNG hiện khi đăng nhập bằng role User
- [ ] `isAdmin` tính từ `user?.role === 'Admin'` trong CarList.jsx
- [ ] Nút "+ Add Car" chỉ hiện khi `isAdmin === true`
- [ ] Nút Delete trên mỗi dòng chỉ hiện khi `isAdmin === true` (thông qua prop `canManage`)
- [ ] Role User vẫn xem được đầy đủ danh sách xe (chỉ ẩn nút thao tác)

---

### TODO-02 — Navbar: Hiển thị email và role (1.0 điểm)
**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:** Trong phần `{isAuthenticated && user && (...)}`, hiển thị `user.email` và `user.role`.

**Yêu cầu kỹ thuật:**
- `user.email` phải có class `fw-bold` và `text-white`
- `user.role` phải nằm trong component `<Badge>` của React-Bootstrap
- Ví dụ: `<span className="text-white fw-bold">{user.email}</span>` và `<Badge bg="info">{user.role}</Badge>`

**Checklist:**
- [ ] `user.email` hiển thị với class `fw-bold`
- [ ] `user.role` hiển thị trong Badge component
- [ ] Không hiển thị khi chưa đăng nhập

---

### TODO-03 — CarList: Dropdown sắp xếp Name / Seats / Price (1.0 điểm)
**File:** `src/pages/CarList.jsx`
**Cho sẵn (không sửa):** nút Logout trong `src/components/AppNavbar.jsx` đã được cài đặt đầy đủ (`handleLogout` gọi `logoutUser()` rồi `navigate('/login')`) — **không còn là TODO** ở đề này.

**Yêu cầu:** Thêm một dropdown (`Form.Select`) cho phép sắp xếp danh sách xe theo **Name**, **Seats**, hoặc **Price** (mỗi trường có 2 chiều tăng/giảm), và cập nhật lại phân trang cho đúng sau khi sắp xếp.

**Yêu cầu kỹ thuật:**
```jsx
const [sortBy, setSortBy] = useState('')

const sorted = [...filtered].sort((a, b) => {
  switch (sortBy) {
    case 'name-asc': return a.name.localeCompare(b.name)
    case 'name-desc': return b.name.localeCompare(a.name)
    case 'seats-asc': return Number(a.seats) - Number(b.seats)
    case 'seats-desc': return Number(b.seats) - Number(a.seats)
    case 'price-asc': return a.priceWeekday - b.priceWeekday
    case 'price-desc': return b.priceWeekday - a.priceWeekday
    default: return 0
  }
})
// dùng `sorted` (thay vì `filtered`) để tính totalPages/paginated
```

- `Form.Select` phải có `aria-label="Sort by"` (bắt buộc để test tìm được dropdown)
- Các option bắt buộc có giá trị (value) chính xác: `name-asc`, `name-desc`, `seats-asc`, `seats-desc`, `price-asc`, `price-desc` (option đầu là placeholder `value=""`)
- Khi đổi giá trị sort (`onChange`), phải gọi `setPage(1)` để quay về trang đầu (tránh lỗi hiển thị trang rỗng khi danh sách sau sắp xếp ngắn hơn)

**Checklist:**
- [ ] Dropdown có `aria-label="Sort by"` và đủ 6 option (name-asc/desc, seats-asc/desc, price-asc/desc)
- [ ] Chọn "Price (Low to High)" → xe rẻ nhất hiển thị ở dòng đầu
- [ ] Chọn "Seats (High to Low)" → xe nhiều ghế nhất hiển thị ở dòng đầu
- [ ] Đổi giá trị dropdown → phân trang quay về trang 1
- [ ] Logout vẫn hoạt động bình thường (đã cho sẵn, không được sửa)

---

### TODO-04 — AddCar: Dropdown danh sách CarType (1.0 điểm)
**File:** `src/pages/AddCar.jsx`

**Yêu cầu:** Trong `useEffect`, gọi `fetchCarTypes()` và cập nhật state `carTypes` để đổ dữ liệu vào dropdown chọn loại xe. CarType được lấy từ API db.json (không từ CarContext).

**Yêu cầu kỹ thuật:**
```jsx
const [carTypes, setCarTypes] = useState([])

useEffect(() => {
  fetchCarTypes().then(setCarTypes).catch(console.error)
}, [])
```

- `fetchCarTypes` đã được import từ `../api/carApi`
- Dropdown phải hiển thị đủ các loại xe từ db.json (Economy, SUV, Luxury)
- Option đầu tiên là `"-- Select car type --"` (không có giá trị)

**Checklist:**
- [ ] `useState([])` khai báo `carTypes`
- [ ] `useEffect` gọi `fetchCarTypes()` khi mount
- [ ] Kết quả được lưu vào state `carTypes` bằng `setCarTypes`
- [ ] Dropdown hiển thị đủ các option từ API
- [ ] Option placeholder `"-- Select car type --"` có `value=""`

---

### TODO-05 — CarDetail: Fetch và hiển thị chi tiết xe (1.0 điểm)
**File:** `src/pages/CarDetail.jsx`

**Yêu cầu:** Hoàn thiện `useEffect` để fetch dữ liệu xe và hiển thị đầy đủ thông tin.

**Yêu cầu kỹ thuật:**
```jsx
useEffect(() => {
  fetchCarById(id)
    .then((data) => { setCar(data); setLoading(false) })
    .catch((err) => { setError(err.message || 'Failed to load car.'); setLoading(false) })
}, [id])
```

**Khi loading:** Trả về `<Spinner animation="border" className="d-block mx-auto mt-5" />`
**Khi error:** Trả về `<Alert variant="danger" role="alert">{error}</Alert>`
**Khi có data:** Hiển thị Card với:
- Nút Back: `<Button onClick={() => navigate(-1)}>← Back</Button>`
- Car Type trong `<Badge bg="primary">`
- Seats, Transmission
- Price Weekday: `formatVND(car.priceWeekday)`
- Price Weekend: `formatVND(car.priceWeekend)`
- Last Serviced: `formatDateDisplay(car.lastServiced)`

**Checklist:**
- [ ] `useEffect` gọi `fetchCarById(id)`
- [ ] Spinner hiển thị khi loading (`.spinner-border`)
- [ ] Alert danger khi có lỗi
- [ ] Nút Back điều hướng về trang trước
- [ ] Card hiển thị Car Type, Seats, Transmission, Price Weekday, Price Weekend, Last Serviced

---

### TODO-06 — CarRow: Delete với ModalConfirm (1.0 điểm)
**File:** `src/components/CarRow.jsx`

**Yêu cầu:** Khi click Delete, hiển thị `ModalConfirm`. Khi xác nhận → gọi `onDelete(car.id)` và đóng modal.

**Yêu cầu kỹ thuật:**
- State `showModal` đã được khai báo
- Nút Delete: `onClick={() => setShowModal(true)}` (nút này đã được bọc sẵn trong điều kiện `canManage` — xem TODO-01, không cần sửa phần đó)
- `handleDeleteConfirm`: gọi `onDelete(car.id)` rồi `setShowModal(false)`
- ModalConfirm body có thể là: `"Are you sure you want to delete this car?"`

**Checklist:**
- [ ] Click Delete → Modal xuất hiện
- [ ] Confirm → `onDelete(car.id)` được gọi
- [ ] Cancel → `onDelete` KHÔNG được gọi
- [ ] Modal đóng sau khi confirm hoặc cancel

---

### TODO-07 — CarRow: Cột Price Weekday (0.5 điểm)
**File:** `src/components/CarRow.jsx`

**Yêu cầu:** Thay thế ô giá `—` bằng `formatVND(car.priceWeekday)`. **Khác biệt so với đề gốc:** cột này **chỉ hiển thị giá weekday**, KHÔNG còn hiển thị cả khoảng giá weekday-weekend (không dùng `formatPriceRange` nữa).

**Yêu cầu kỹ thuật:**
- `formatVND` đã được import từ `../utils/format` (thay cho `formatPriceRange`)
- Kết quả ví dụ: `"500.000 ₫"` (định dạng vi-VN, chỉ một giá trị)
- Ký hiệu `₫` phải xuất hiện trong cell
- Giá weekend (`car.priceWeekend`) **không** được hiển thị trong cột này

**Checklist:**
- [ ] `formatVND(car.priceWeekday)` được gọi (không dùng `formatPriceRange`)
- [ ] Giá weekday hiển thị đúng, có ký hiệu `₫`
- [ ] Giá weekend KHÔNG xuất hiện trong cột này

---

### TODO-08 — AppFooter: Hiển thị thông tin app (0.5 điểm)
**File:** `src/components/AppFooter.jsx`

**Yêu cầu:** Trong thẻ `<footer>`, hiển thị logo, appName, copyright, version, course từ `about.js`.

**Yêu cầu kỹ thuật:**
- Phải dùng thẻ HTML `<footer>`
- `<img src={about.logo} alt="logo" width="24" height="24" />`
- Hiển thị `about.appName`, `about.copyright`, `about.version`, `about.course`
- Giá trị lấy từ `import about from '../data/about'` (không hardcode)

**Giá trị trong about.js:**
```js
logo: '/images/logo.jpg'
copyright: '© 2026 Car Rental App'
version: 'v1.0.0'
course: 'FER202 — ReactJS'
appName: 'Car Rental App'
```

> **Lưu ý:** File ảnh thực tế nằm ở `public/images/logo.jpg`. Với Vite, mọi file trong thư mục `public/` được phục vụ tại đường dẫn gốc `/`, nên `src` phải là `/images/logo.jpg`.

**Checklist:**
- [ ] Thẻ `<footer>` tồn tại trong DOM
- [ ] Logo `<img>` hiển thị trong footer, `src` đúng bằng `about.logo`
- [ ] `about.copyright` hiển thị
- [ ] `about.version` hiển thị
- [ ] `about.course` hiển thị

---

### TODO-09 — NotFound: Thiết kế trang 404 (1.0 điểm)
**File:** `src/pages/NotFound.jsx`

**Yêu cầu:** Thiết kế trang 404 chuẩn — hiển thị mã lỗi, thông báo rõ ràng và nút điều hướng về trang chủ.

**Yêu cầu kỹ thuật:**
- Route `*` trong `AppRoutes.jsx` phải trỏ đến `<NotFound />` (đã được cấu hình sẵn)
- Trang phải hiển thị **"404"**
- Phải có thông báo mô tả lỗi (ví dụ: `"Page Not Found"`)
- Phải có nút/link **"Back to Home"** sử dụng `<Link to="/">` hoặc `useNavigate()`

**Checklist:**
- [ ] Text "404" hiển thị trên trang
- [ ] Thông báo lỗi mô tả rõ ràng
- [ ] Nút/link về trang chủ (`to="/"`)
- [ ] Route `*` trỏ đến `<NotFound />`

---

### TODO-10A — CarTypeDetail (1.0 điểm)
**File:** `src/pages/CarTypeDetail.jsx`

**Yêu cầu:** Dùng `Promise.all` để fetch dữ liệu. Nếu `id` không hợp lệ → redirect đến trang 404. Hiển thị danh sách các xe thuộc loại này.

**Yêu cầu kỹ thuật:**
```jsx
const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
const found = carTypes.find((rt) => String(rt.id) === String(id))
if (!found) {
  navigate('/not-found', { replace: true })
  return
}
setCarType(found)
setCars(allCars.filter((r) => String(r.carTypeId) === String(id)))
setLoading(false)
```

**Checklist:**
- [ ] `Promise.all([fetchCarTypes(), fetchCars()])` được gọi
- [ ] id không tìm thấy → `navigate('/not-found', { replace: true })`
- [ ] Spinner khi loading, Alert khi lỗi network
- [ ] Nút "← Back to Car Types" điều hướng về `/car-types`
- [ ] Table chỉ hiển thị xe của loại đang xem

---

### TODO-10B — ManageCarTypes: Kiểm tra CarType đang sử dụng (1.0 điểm)
**File:** `src/pages/ManageCarTypes.jsx`

**Yêu cầu:** Trước khi xóa CarType, gọi `fetchCars()` để kiểm tra có xe nào đang dùng loại này không. Nếu có → hiển thị thông báo lỗi có chứa tên CarType, không cho phép xóa.

**Checklist:**
- [ ] `fetchCars()` được gọi khi click Delete
- [ ] Nếu CarType đang dùng → modal body chứa tên CarType
- [ ] Nếu đang dùng → `deleteCarType` KHÔNG được gọi
- [ ] Nếu không dùng → xóa bình thường và cập nhật danh sách

---

## BẢNG ĐIỂM TỔNG KẾT

| TODO | File | Điểm |
|------|------|------|
| TODO-01: Login + CarList — role rendering | `src/pages/Login.jsx`, `src/pages/CarList.jsx` | 1.0 |
| TODO-02: Navbar email + Badge | `src/components/AppNavbar.jsx` | 1.0 |
| TODO-03: CarList sort dropdown | `src/pages/CarList.jsx` | 1.0 |
| TODO-04: AddCar CarType dropdown | `src/pages/AddCar.jsx` | 1.0 |
| TODO-05: CarDetail fetch + display | `src/pages/CarDetail.jsx` | 1.0 |
| TODO-06: CarRow Delete Modal | `src/components/CarRow.jsx` | 1.0 |
| TODO-07: CarRow Price Weekday | `src/components/CarRow.jsx` | 0.5 |
| TODO-08: AppFooter about info | `src/components/AppFooter.jsx` | 0.5 |
| TODO-09: NotFound 404 page | `src/pages/NotFound.jsx` | 1.0 |
| TODO-10A: CarTypeDetail | `src/pages/CarTypeDetail.jsx` | 1.0 |
| TODO-10B: ManageCarTypes in-use check | `src/pages/ManageCarTypes.jsx` | 1.0 |
| **TỔNG** | | **10.0** |

---

## CẤU TRÚC THƯ MỤC

```
template/
├── db.json                          # Dữ liệu mẫu (KHÔNG sửa)
├── vite.config.js                   # Đã cung cấp (KHÔNG sửa)
├── src/
│   ├── api/
│   │   ├── authApi.js               # Đã cung cấp (KHÔNG sửa) — cho phép cả Admin/User đăng nhập
│   │   └── carApi.js                # Đã cung cấp (KHÔNG sửa)
│   ├── context/
│   │   ├── AuthContext.jsx          # Đã cung cấp (KHÔNG sửa)
│   │   └── CarContext.jsx           # Đã cung cấp (KHÔNG sửa)
│   ├── reducer/
│   │   ├── authReducer.js           # Đã cung cấp (KHÔNG sửa)
│   │   ├── carReducer.js            # Đã cung cấp (KHÔNG sửa)
│   │   └── carTypeReducer.js        # Đã cung cấp (KHÔNG sửa)
│   ├── utils/
│   │   ├── format.js                # Đã cung cấp (KHÔNG sửa)
│   │   └── validate.js              # Đã cung cấp (KHÔNG sửa)
│   ├── data/
│   │   └── about.js                 # Đã cung cấp (KHÔNG sửa)
│   ├── routes/
│   │   ├── AppRoutes.jsx            # Đã cung cấp (KHÔNG sửa)
│   │   └── ProtectedRoute.jsx       # Đã cung cấp (KHÔNG sửa)
│   ├── components/
│   │   ├── AppNavbar.jsx            # TODO-02 (Logout đã cho sẵn, không còn TODO-03)
│   │   ├── AppFooter.jsx            # TODO-08
│   │   ├── ModalConfirm.jsx         # Đã cung cấp (KHÔNG sửa)
│   │   ├── FilterBar.jsx            # Đã cung cấp (KHÔNG sửa)
│   │   ├── CarTypeList.jsx          # Đã cung cấp (KHÔNG sửa)
│   │   └── CarRow.jsx               # TODO-06, 07 (prop canManage đã cho sẵn)
│   ├── pages/
│   │   ├── Login.jsx                # TODO-01 (phần Alert)
│   │   ├── CarList.jsx              # TODO-01 (ẩn nút theo role) + TODO-03 (sort dropdown)
│   │   ├── CarDetail.jsx            # TODO-05
│   │   ├── AddCar.jsx               # TODO-04
│   │   ├── ManageCarTypes.jsx       # TODO-10B
│   │   ├── CarTypeDetail.jsx        # TODO-10A
│   │   └── NotFound.jsx             # TODO-09
│   └── __tests__/                   # Test files (KHÔNG sửa)
```

---

## LƯU Ý QUAN TRỌNG

1. **KHÔNG sửa** các file không có TODO — sẽ bị trừ điểm nếu phá vỡ logic sẵn có
2. **Chạy ứng dụng:** `npm start` (khởi động đồng thời JSON Server + React Dev Server, tự mở trình duyệt)
3. **Tài khoản test:** `admin / admin123` (Admin — đầy đủ quyền), `user1 / user123` và `agent / agent123` (User — **đăng nhập được**, nhưng chỉ xem read-only)
4. **formatVND** trả về định dạng `"500.000 ₫"` (vi-VN locale)
5. Phiên đăng nhập dùng `sessionStorage` — đóng tab/trình duyệt sẽ đăng xuất tự động, đây là hành vi có chủ đích (không phải bug)
6. **lastServiced** lưu dạng `"dd/MM/yyyy"` — dùng `formatDateDisplay()` để hiển thị
7. Import `ModalConfirm` đã có sẵn trong `CarRow.jsx` và `ManageCarTypes.jsx`
8. Dropdown sắp xếp (TODO-03) bắt buộc dùng đúng `aria-label="Sort by"` và các value đã quy định để test có thể nhận diện được

---

## CHÚC CÁC BẠN LÀM BÀI TỐT!
