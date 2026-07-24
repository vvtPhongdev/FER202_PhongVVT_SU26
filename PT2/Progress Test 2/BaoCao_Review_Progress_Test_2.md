# BÁO CÁO REVIEW CHI TIẾT PROGRESS TEST 2
## Restaurant Management App — Môn học FER202 (ReactJS)

* **Thông tin sinh viên:** Võ Văn Thanh Phong
* **Mã số sinh viên (MSSV):** DE190421
* **Lớp:** FER202 — SU26
* **Ngày thực hiện báo cáo:** 02/07/2026

---

## I. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

Để chạy và kiểm tra ứng dụng, hãy thực hiện các bước sau trong terminal của VS Code (đặt thư mục làm việc tại `Progress Test 2/template`):

### 1. Cài đặt các thư viện cần thiết
```bash
npm install
```
* **Mục đích:** Cài đặt toàn bộ dependencies trong `package.json` (Vite, React, React-Bootstrap, Jest, Axios, Json-Server, v.v.).

### 2. Khởi chạy ứng dụng (Môi trường phát triển + Database)
```bash
npm start
```
* **Mục đích:** Lệnh này sử dụng thư viện `concurrently` để chạy song song:
  1. **JSON Server (Mock API Database):** Chạy tại địa chỉ `http://localhost:3001` dựa trên dữ liệu từ file `db.json`.
  2. **Vite Development Server (Giao diện web):** Chạy tại địa chỉ `http://localhost:5173` (hoặc port rảnh tiếp theo).
* **Tài khoản kiểm tra (Admin):**
  * **Username:** `admin`
  * **Password:** `admin123`

### 3. Khởi chạy Bộ Kiểm thử Tự động (Unit Tests)
```bash
# Chạy tất cả test suites một lần duy nhất (không ở chế độ watch)
npm test

# Chạy test cho một component/trang cụ thể để kiểm tra từng TODO
npm test -- --testPathPattern="[Tên_File_Test]"
```

---

## II. HƯỚNG DẪN CHỤP ẢNH BÁO CÁO (SCREENSHOT GUIDE)

Để bài thi đạt điểm tối đa và báo cáo rõ ràng, mỗi TODO cần đi kèm với hình ảnh minh chứng. Dưới đây là cách chụp hình chuẩn nhất trên Windows:

1. **Phím tắt chụp màn hình:**
   * Nhấn tổ hợp phím `Windows + Shift + S`.
   * Quét chọn vùng màn hình chứa giao diện web hoặc terminal kiểm tra.
   * Hình ảnh tự động lưu vào Clipboard, bạn chỉ cần mở file Word báo cáo và nhấn `Ctrl + V` để dán trực tiếp.
2. **Kích thước và Chất lượng ảnh:**
   * Nên chụp **tập trung vào vùng chức năng** (không cần chụp toàn bộ màn hình desktop để tránh ảnh bị nhỏ và mờ).
   * Đối với terminal, hãy kéo rộng cửa sổ terminal lên để hiển thị đầy đủ dòng chữ `PASS` màu xanh lá cây cùng số lượng test thành công.
3. **Các loại hình ảnh cần có cho mỗi TODO:**
   * **Hình 1 (UI thực tế trên Browser):** Chụp lại hành vi của ứng dụng trên trình duyệt trình bày kết quả (Alert xuất hiện, badge hiển thị, modal xác nhận...).
   * **Hình 2 (Kết quả chạy Test của Jest):** Chụp lại terminal khi chạy lệnh `npm test` tương ứng cho file đó hiển thị dòng `PASS` màu xanh lá.

---

## III. CHI TIẾT TỪNG TODOs: YÊU CẦU, CODE, CHECKLIST & HƯỚNG DẪN CHỤP HÌNH

---

### TODO-01 — Alert khi đăng nhập không phải Admin
* **File:** [Login.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/Login.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="Login" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Khi submit form login, nếu login **thất bại** (nhập sai mật khẩu, tài khoản không tồn tại, hoặc tài khoản có role không phải là `'Admin'`), bắt lỗi đó từ API và hiển thị thông báo lỗi thực tế bằng một `<Alert variant="danger">` của React-Bootstrap.
* Alert này phải có thuộc tính `dismissible` (nút **×**) để khi nhấn vào sẽ tắt thông báo lỗi.
* Khi trang mới tải lên lần đầu, **không** hiển thị Alert lỗi này.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/pages/Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  dispatch({ type: 'SET_VALIDATED', payload: true })

  if (!e.currentTarget.checkValidity()) {
    e.stopPropagation()
    return
  }

  const usernameError = validateUsername(username)
  const passwordError = validatePassword(password)
  if (usernameError || passwordError) return

  try {
    const user = await login(username.trim(), password)
    dispatch({ type: 'SET_ERROR', payload: '' })
    loginUser(user)
    navigate('/')
  } catch (err) {
    // TODO-01: Bắt lỗi ném ra từ authApi.login() và cập nhật vào state serverError
    dispatch({ type: 'SET_ERROR', payload: err.message })
  }
}
```
*Đoạn mã hiển thị UI tương ứng:*
```jsx
{serverError && (
  <Alert
    variant="danger"
    dismissible
    onClose={() => dispatch({ type: 'SET_ERROR', payload: '' })}
  >
    {serverError}
  </Alert>
)}
```

#### 3. Checklist Kiểm tra
- [ ] Truy cập trang đăng nhập `/login`. Lần đầu truy cập phải đảm bảo **không có bất kỳ Alert nào**.
- [ ] Nhập tài khoản không phải Admin (Ví dụ: `user / user123`) $\rightarrow$ Bấm Login $\rightarrow$ Alert màu đỏ xuất hiện chứa lỗi thực tế từ API.
- [ ] Nhập sai username hoặc password $\rightarrow$ Bấm Login $\rightarrow$ Alert màu đỏ xuất hiện chứa lỗi thực tế.
- [ ] Nhấp vào dấu **×** của Alert $\rightarrow$ Thông báo lỗi phải biến mất ngay lập tức.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Trên trình duyệt, gõ username `user` và password `user123` rồi bấm **Login**. Khi Alert đỏ xuất hiện với nội dung `"Only Admin accounts are allowed."`, chụp khoanh vùng form đăng nhập và Alert đỏ này.
* **Ảnh 2 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="Login"` trên terminal, đợi kết quả hiển thị `PASS` cho file `Login.test.jsx`, chụp lại phần kết quả xanh lá.

---

### TODO-02 — Hiển thị thông tin người dùng trên Navbar
* **File:** [AppNavbar.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/AppNavbar.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Khi người dùng đã đăng nhập thành công (`user !== null`), hiển thị trên Navbar thông tin của họ gồm:
  1. Tên đầy đủ (`user.fullName`) dạng chữ đậm (`<strong>`), màu chữ trắng (`text-white`).
  2. Badge role của người dùng (`user.role`) sử dụng component `<Badge>` của React-Bootstrap.
* Lấy thông tin user trực tiếp từ Context (`useAuth()`), tuyệt đối không hardcode.
* Nếu chưa đăng nhập (`user === null`), ẩn toàn bộ thông tin này và ẩn nút Logout.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/components/AppNavbar.jsx
<Nav className="align-items-center">
  {/* TODO-02: Hiển thị thông tin người dùng đăng nhập */}
  <Navbar.Text className="me-3 text-white">
    Logged in as <strong>{user.fullName}</strong>{' '}
    <Badge bg="info">{user.role}</Badge>
  </Navbar.Text>

  <Button variant="outline-light" onClick={handleLogout}>
    Logout
  </Button>
</Nav>
```

#### 3. Checklist Kiểm tra
- [ ] Chưa đăng nhập $\rightarrow$ Trên thanh Navbar không hiện dòng chữ "Logged in as" hay badge của user, không có nút Logout.
- [ ] Đăng nhập bằng `admin / admin123` $\rightarrow$ Xuất hiện dòng chữ "Logged in as Vo Van Thanh Phong" in đậm màu trắng bên cạnh badge màu xanh dương nhạt chứa chữ "Admin".
- [ ] Thay đổi thông tin user trong context $\rightarrow$ Navbar tự động cập nhật đúng tên mới và role mới tương ứng.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Sau khi đăng nhập thành công, chụp góc phải phía trên của thanh Navbar hiển thị dòng chữ "Logged in as Vo Van Thanh Phong" và Badge "Admin".
* **Ảnh 2 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="AppNavbar"`, chụp màn hình kết quả `PASS` cho file `AppNavbar.test.jsx`.

---

### TODO-03 — Nút Logout chuyển về trang Login
* **File:** [AppNavbar.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/AppNavbar.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Khi nhấn vào nút **Logout** (chỉ hiển thị khi đã đăng nhập):
  1. Gọi hàm `logoutUser()` từ AuthContext để xóa session và thông tin user hiện tại.
  2. Điều hướng (Navigate) người dùng quay trở lại trang đăng nhập `/login`.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/components/AppNavbar.jsx
export default function AppNavbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO-03: Thực hiện logout và điều hướng về trang login
    logoutUser()
    navigate('/login')
  }

  return (
    // ...
    <Button variant="outline-light" onClick={handleLogout}>
      Logout
    </Button>
    // ...
  )
}
```

#### 3. Checklist Kiểm tra
- [ ] Khi đã đăng nhập, click nút **Logout** trên Navbar.
- [ ] Đảm bảo hệ thống gọi đúng hàm `logoutUser()` để đưa trạng thái `user` về `null`.
- [ ] Giao diện lập tức thay đổi, chuyển hướng thành công về trang `/login`.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Chụp màn hình trình duyệt ngay sau khi nhấn nút "Logout", cho thấy trang hiện tại đã quay về trang `/login` và thanh Navbar không còn nút Logout hay thông tin user.
* **Ảnh 2 (Terminal):** Sử dụng kết quả test của `AppNavbar.test.jsx` (đã bao gồm TODO-02, TODO-03, TODO-04). Chụp lại terminal đã PASS.

---

### TODO-04 — Click tên ứng dụng về trang chủ
* **File:** [AppNavbar.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/AppNavbar.jsx)
* **Điểm số:** 0.5 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Logo thương hiệu ứng dụng (`Navbar.Brand`) hiển thị logo từ `about.logo` và tên ứng dụng từ `about.appName`.
* Khi click vào logo hoặc tên ứng dụng này, hệ thống phải điều hướng người dùng về trang chủ `/`.
* Cần tích hợp với React Router bằng cách dùng thuộc tính `as={Link} to="/"` trên `<Navbar.Brand>` thay vì sử dụng sự kiện `onClick` điều hướng bằng code, giúp tối ưu SEO (thẻ sinh ra là thẻ `<a>` có thuộc tính `href="/"`).

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/components/AppNavbar.jsx
<Navbar.Brand as={Link} to="/">
  <img
    src={about.logo}
    alt={about.appName}
    width="30"
    height="30"
    className="d-inline-block align-top me-2"
  />
  {about.appName}
</Navbar.Brand>
```

#### 3. Checklist Kiểm tra
- [ ] Di chuột qua Logo/Tên ứng dụng ở góc trái Navbar $\rightarrow$ Con trỏ chuột chuyển thành hình bàn tay và hiển thị đường dẫn xem trước ở dưới là `http://localhost:5173/`.
- [ ] Nhấp chuột phải chọn **Inspect (Kiểm tra phần tử)** $\rightarrow$ Đảm bảo phần tử được bao bọc bởi thẻ `<a class="navbar-brand" href="/">`.
- [ ] Khi đang ở trang con bất kỳ (ví dụ `/categories` hoặc `/restaurants/1`), click vào tên ứng dụng $\rightarrow$ Trang quay về `/` (danh sách nhà hàng).

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Mở Inspect element (F12) trên trình duyệt, chỉ vào Logo/Tên ứng dụng trên Navbar để hiện rõ dòng code HTML sinh ra là `<a ... href="/">`. Chụp lại góc giao diện và bảng Inspect.
* **Ảnh 2 (Terminal):** Sử dụng kết quả test của `AppNavbar.test.jsx`.

---

### TODO-05 — View Detail nhà hàng + nút Back
* **File:** [RestaurantDetail.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/RestaurantDetail.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="RestaurantDetail" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Khai báo đầy đủ các state: `restaurant` (dữ liệu nhà hàng), `loading` (trạng thái tải ban đầu mặc định là `true`), và `error` (lỗi nếu có, mặc định là `null`).
* Khi trang mount, lấy `id` từ url params, gọi hàm `fetchRestaurantById(id)` để lấy thông tin chi tiết nhà hàng:
  * Nếu thành công: Lưu dữ liệu vào state `restaurant`.
  * Nếu thất bại: Bắt lỗi và lưu thông báo lỗi `e.message` vào state `error`.
  * Trong mọi trường hợp: Cập nhật state `loading` về `false`.
* Khi đang tải dữ liệu: Hiện Spinner quay của Bootstrap `<Spinner animation="border" />` (phải dùng class `.spinner-border`).
* Khi có lỗi xảy ra: Hiển thị `<Alert variant="danger">` chứa nội dung lỗi.
* Khi đã có dữ liệu: Hiển thị chi tiết nhà hàng: Name, Category Badge (lấy tên category tương ứng từ categories context), Owner, Address, Price Min, Price Max (định dạng VND bằng hàm `formatVND`), Open Date (nếu có, định dạng bằng hàm `formatDateDisplay`).
* Thêm nút **Back** ở trên cùng trang chi tiết, khi click vào sẽ thực hiện quay lại trang trước đó bằng cách gọi `navigate(-1)`.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/pages/RestaurantDetail.jsx
export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRestaurant()

  // TODO-05: Khai báo state
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO-05: Fetch dữ liệu chi tiết nhà hàng
    setLoading(true)
    setError(null)
    fetchRestaurantById(id)
      .then(setRestaurant)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  // TODO-05: Spinner tải trang & Alert báo lỗi
  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!restaurant) return null

  // Tìm tên category từ context
  const categoryName =
    state.categories.find((c) => String(c.id) === String(restaurant.categoryId))?.name || 'Unknown'

  return (
    <div>
      {/* TODO-05: Nút Back quay lại trang trước */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card>
        <Card.Header as="h5">{restaurant.name}</Card.Header>
        <Card.Body>
          <p>
            <strong>Category:</strong>{' '}
            <Badge bg="info">{categoryName}</Badge>
          </p>
          <p><strong>Owner:</strong> {restaurant.owner}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Price Min:</strong> {formatVND(restaurant.priceMin)}</p>
          <p><strong>Price Max:</strong> {formatVND(restaurant.priceMax)}</p>
          {restaurant.openDate && (
            <p><strong>Open Date:</strong> {formatDateDisplay(restaurant.openDate)}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
```

#### 3. Checklist Kiểm tra
- [ ] Click nút **View** của một nhà hàng bất kỳ từ trang chủ $\rightarrow$ Spinner quay hiển thị trong giây lát trước khi dữ liệu trả về.
- [ ] Trang chi tiết hiển thị đầy đủ thông tin nhà hàng, khoảng giá hiển thị định dạng chuẩn Việt Nam (ví dụ: `300.000 ₫`).
- [ ] Category Name hiển thị tên chuỗi rõ ràng (như `Buffet`, `Fast Food`) lấy từ Context, chứ không hiển thị dạng ID số.
- [ ] Nhập một URL với ID nhà hàng không tồn tại (Ví dụ: `/restaurants/9999`) $\rightarrow$ Xuất hiện Alert màu đỏ báo lỗi.
- [ ] Bấm nút **Back** $\rightarrow$ Trình duyệt tự quay về trang trước đó ngay lập tức.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI - Dữ liệu tải thành công):** Mở trang chi tiết nhà hàng "Ngon Villa" (ID: 1), chụp màn hình thông tin chi tiết nhà hàng bao gồm cả nút Back.
* **Ảnh 2 (UI - Lỗi 404):** Gõ thủ công đường dẫn `http://localhost:5173/restaurants/9999` lên thanh địa chỉ, chụp lại Alert đỏ báo lỗi.
* **Ảnh 3 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="RestaurantDetail"`, chụp lại kết quả `PASS` cho file `RestaurantDetail.test.jsx`.

---

### TODO-06 — Xóa nhà hàng với ModalConfirm
* **File:** [RestaurantRow.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/RestaurantRow.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Thêm cột chức năng "Actions" ở mỗi dòng của nhà hàng. Khi người dùng click vào link/nút **Delete** (text khớp regex `/delete/i`):
  1. Không được xóa trực tiếp ngay lập tức, mà phải mở hộp thoại xác nhận `<ModalConfirm>` với tiêu đề là `"Confirm Delete"`.
  2. Nội dung thông báo trong Modal phải hiển thị rõ ràng tên nhà hàng đang định xóa.
  3. Nếu người dùng chọn **Delete** (Xác nhận): Gọi hàm callback `onDelete(restaurant.id)` truyền từ prop để thực hiện gửi yêu cầu DELETE API và cập nhật state ở component cha, đồng thời đóng Modal.
  4. Nếu chọn **Cancel** (Hủy): Đóng modal, không thực hiện hành vi xóa.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/components/RestaurantRow.jsx
function RestaurantRow({ restaurant, index, onDelete }) {
  const navigate = useNavigate()
  // TODO-06: Khai báo state quản lý việc đóng/mở modal xác nhận
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <tr>
        {/* ... các cột thông tin khác ... */}
        <td>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/restaurants/' + restaurant.id) }}>
            View
          </a>{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault()
            // TODO-06: Click hiển thị modal
            setShowModal(true)
          }}>
            Delete
          </a>
        </td>
      </tr>

      {/* TODO-06: Tích hợp ModalConfirm */}
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        message={
          <p>
            Are you sure you want to delete <strong>{restaurant.name}</strong>?
          </p>
        }
        confirmText="Delete"
        onConfirm={() => {
          onDelete(restaurant.id)
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}
```

#### 3. Checklist Kiểm tra
- [ ] Click chữ **Delete** ở dòng nhà hàng bất kỳ $\rightarrow$ Hiện modal xác nhận nổi lên ở chính giữa trang web.
- [ ] Modal chứa thông điệp nhắc nhở và in đậm tên nhà hàng đúng dòng vừa chọn.
- [ ] Bấm **Cancel** trên Modal $\rightarrow$ Modal biến mất và nhà hàng vẫn giữ nguyên vị trí trong danh sách.
- [ ] Bấm **Delete** trên Modal $\rightarrow$ Modal đóng, dòng nhà hàng lập tức biến mất khỏi trang hiện tại (kiểm tra database thấy đã mất).

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI - Hiện Modal):** Bấm nút Delete của nhà hàng bất kỳ trên trang chủ để hiển thị ModalConfirm, chụp màn hình cửa sổ modal hiện lên đè trên bảng danh sách.
* **Ảnh 2 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="RestaurantRow"`, chụp lại kết quả `PASS` cho file `RestaurantRow.test.jsx` (chứa kết quả kiểm tra cho cả TODO-06 và TODO-07).

---

### TODO-07 — Cột Price Range trong danh sách nhà hàng
* **File:** [RestaurantList.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/RestaurantList.jsx) + [RestaurantRow.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/RestaurantRow.jsx)
* **Điểm số:** 0.5 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### 1. Yêu cầu chi tiết
* **Trong `RestaurantList.jsx`:** Thêm cột tiêu đề vào header của bảng: `<th>Price Range</th>`.
* **Trong `RestaurantRow.jsx`:** Thêm một ô dữ liệu `<td>` tương ứng để hiển thị khoảng giá bằng cách truyền `priceMin` và `priceMax` của nhà hàng vào hàm format helper `formatPriceRange()`.
* Chấp nhận định dạng phân cách hàng nghìn bằng dấu chấm hoặc dấu phẩy. Nếu giá trị `priceMin = 0` thì phải xuất ra dạng `"0 ₫ – [giá_max]"`.

#### 2. Mã nguồn triển khai (Code)
*Tại `RestaurantList.jsx`:*
```jsx
// src/pages/RestaurantList.jsx
<thead>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Category</th>
    <th>Owner</th>
    <th>Address</th>
    <th>Open Date</th>
    {/* TODO-07: Thêm cột Price Range */}
    <th>Price Range</th>
    <th>Actions</th>
  </tr>
</thead>
```
*Tại `RestaurantRow.jsx`:*
```jsx
// src/components/RestaurantRow.jsx
<tr>
  <td>{index + 1}</td>
  <td>{restaurant.name}</td>
  <td>{restaurant.category}</td>
  <td>{restaurant.owner}</td>
  <td>{restaurant.address}</td>
  <td>{restaurant.openDate ?? '—'}</td>
  {/* TODO-07: Hiển thị giá đã được định dạng */}
  <td>{formatPriceRange(restaurant.priceMin, restaurant.priceMax)}</td>
  <td>
    {/* ... các link View và Delete ... */}
  </td>
</tr>
```

#### 3. Checklist Kiểm tra
- [ ] Bảng danh sách nhà hàng có tiêu đề cột "Price Range" xếp đúng trước cột "Actions".
- [ ] Cột Price Range hiển thị đúng dạng chuỗi `"min VND – max VND"` đã được định dạng (Ví dụ: `50.000 ₫ – 200.000 ₫`).
- [ ] Kiểm tra nhà hàng có giá nhỏ nhất là 0 xem có hiển thị đúng chữ số đầu tiên là `"0 ₫"` hay không.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Chụp màn hình bảng danh sách nhà hàng trên trang chủ, khoanh vùng vào cột Price Range hiển thị các khoảng tiền đã được format.
* **Ảnh 2 (Terminal):** Dùng lại ảnh chạy test thành công của `RestaurantRow.test.jsx` (đã bao gồm TODO-07).

---

### TODO-08 — Footer lấy dữ liệu từ `about.js`
* **File:** [AppFooter.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/components/AppFooter.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="AppFooter" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Tạo phần Footer nằm ở dưới cùng của ứng dụng sử dụng thẻ ngữ nghĩa **`<footer>`** (không dùng thẻ `<div>`).
* Footer hiển thị thông tin lấy từ file dữ liệu tĩnh `src/data/about.js` gồm:
  1. Hình ảnh Logo với nguồn `src={about.logo}` và xử lý sự kiện `onError` để tự động ẩn ảnh đi nếu không tải được.
  2. Dòng bản quyền `about.copyright`.
  3. Dòng phiên bản `about.version`.
  4. Thông tin môn học `about.course`.
* Toàn bộ dữ liệu hiển thị phải lấy động từ import `about`, không được nhập thủ công bất kỳ chuỗi cứng nào.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/components/AppFooter.jsx
import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị footer với các thông tin lấy động từ about.js
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      <img
        src={about.logo}
        alt={about.appName}
        width="40"
        height="40"
        className="mb-2"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <div>{about.copyright}</div>
      <div>{about.version}</div>
      <div>{about.course}</div>
    </footer>
  )
}
```

#### 3. Checklist Kiểm tra
- [ ] Cuộn chuột xuống cuối trang web ở bất kỳ trang nào $\rightarrow$ Thấy logo và các thông tin chân trang (Copyright, Version, Course) căn giữa với chữ xám mờ.
- [ ] Nhấp chuột phải chọn **Inspect** chân trang $\rightarrow$ Thấy thẻ HTML ngoài cùng bắt buộc là `<footer>`.
- [ ] Thử sửa giá trị `year` trong file `src/data/about.js` $\rightarrow$ Footer ngoài trình duyệt thay đổi năm hiển thị ngay tức thì mà không bị lỗi.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI):** Cuộn trang web xuống dưới cùng, chụp lại toàn bộ phần Footer hiển thị logo cùng các thông tin bản quyền và môn học.
* **Ảnh 2 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="AppFooter"`, chụp lại terminal hiển thị `PASS` cho file `AppFooter.test.jsx`.

---

### TODO-09 — Trang chi tiết Category + danh sách nhà hàng
* **File:** [CategoryDetail.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/CategoryDetail.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="CategoryDetail" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Trang hiển thị chi tiết của một Category cùng danh sách nhà hàng tương ứng thuộc category đó (Đường dẫn: `/categories/:id`).
* Gọi **song song** 2 API: `GET /categories` và `GET /restaurants` bằng phương thức `Promise.all` của Javascript để tăng hiệu năng tối ưu tải trang.
* Thực hiện so sánh an toàn ID nhận được từ URL Parameter với ID trong dữ liệu (sử dụng hàm ép kiểu chuỗi `String(id)`).
* Nếu ID category không tồn tại trong danh sách: Lưu lỗi `'Category not found.'` và hiển thị `<Alert variant="danger">`.
* Hiển thị Spinner quay khi đang tải.
* Hiển thị Tên Category bên trong một Badge nổi bật và hiển thị số lượng nhà hàng thuộc nhóm này.
* Render một bảng (`<Table>`) hiển thị danh sách các nhà hàng thuộc category này với các cột: `#`, `Name`, `Owner`, `Address`, `Price Range`.
* Thêm nút **← Back to Categories** có text khớp regex `/back to categories/i`, click vào điều hướng người dùng quay lại `/categories`.
* Trang này sử dụng gọi Axios API riêng biệt, không sử dụng state chung từ Context của Restaurant.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/pages/CategoryDetail.jsx
export default function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO-09: Khai báo state
  const [category, setCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // TODO-09: Gọi song song Promise.all lấy danh mục và danh sách nhà hàng
        const [categoryResponse, restaurantResponse] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/restaurants`),
        ])
        
        // Tìm danh mục theo ID dạng chuỗi an toàn
        const found = categoryResponse.data.find((c) => String(c.id) === String(id))

        if (!found) {
          setCategory(null)
          setRestaurants([])
          setError('Category not found.')
          return
        }

        setCategory(found)
        // Lọc danh sách nhà hàng thuộc danh mục hiện tại
        setRestaurants(
          restaurantResponse.data.filter(
            (restaurant) => String(restaurant.categoryId) === String(id)
          )
        )
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-09: Spinner & Alert thông báo
  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      {/* Nút quay lại trang danh mục */}
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate('/categories')}
      >
        Back to Categories
      </Button>

      {/* Card thông tin Category */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            <Badge bg="info">{category?.name}</Badge>
          </Card.Title>
          <Card.Text>{restaurants.length} restaurant(s)</Card.Text>
        </Card.Body>
      </Card>

      {/* Bảng danh sách nhà hàng */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Price Range</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No restaurants found.
              </td>
            </tr>
          ) : (
            restaurants.map((restaurant, index) => (
              <tr key={restaurant.id}>
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.owner}</td>
                <td>{restaurant.address}</td>
                <td>{formatPriceRange(restaurant.priceMin, restaurant.priceMax)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
```

#### 3. Checklist Kiểm tra
- [ ] Từ trang quản lý Category, click vào liên kết xem chi tiết của một category (Ví dụ: `Buffet`) $\rightarrow$ Trang chuyển qua `/categories/1`.
- [ ] Đảm bảo Spinner hiển thị lúc đang load dữ liệu.
- [ ] Danh sách nhà hàng trong bảng chỉ liệt kê đúng những nhà hàng có `categoryId` trùng khớp với id trên URL.
- [ ] Bấm nút **Back to Categories** $\rightarrow$ Hệ thống điều hướng thành công về `/categories`.
- [ ] Gõ tay URL `/categories/999` $\rightarrow$ Alert đỏ thông báo lỗi `"Category not found."` xuất hiện rõ ràng.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI - Chi tiết Category):** Click xem chi tiết danh mục "Fast Food", chụp lại giao diện hiển thị tên danh mục trong badge, bảng danh sách nhà hàng của danh mục đó cùng nút "Back to Categories".
* **Ảnh 2 (UI - Không tìm thấy Category):** Gõ tay link `/categories/999` lên thanh địa chỉ trình duyệt, chụp lại Alert báo lỗi.
* **Ảnh 3 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="CategoryDetail"`, chụp lại terminal đã PASS.

---

### TODO-10A — Thêm Category (Form)
* **File:** [ManageCategories.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/ManageCategories.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="ManageCategories" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Thiết kế Form nhập để thêm danh mục mới:
  * Ô input text phải có thuộc tính: `required`, độ dài tối thiểu `minLength={3}`, và chuỗi placeholder chính xác là `"e.g. Buffet"`.
  * Nút bấm submit có text chính xác khớp regex `/add/i` (Ví dụ: `Add`).
* Khi submit form:
  * Kiểm tra tính hợp lệ bằng các quy tắc form mặc định.
  * Gọi hàm validate `validateCategoryName(name, categories)` để kiểm tra trùng lặp tên (không phân biệt chữ hoa chữ thường - case-insensitive).
  * Nếu tên bị trùng lặp: Ngăn cản việc gửi API, hiển thị thông điệp báo lỗi có chứa cụm từ `"already exists"` bên dưới input.
  * Nếu độ dài tên nhỏ hơn 3 ký tự: Không thực hiện gọi POST API lên server.
  * Nếu dữ liệu hợp lệ: Gọi hàm `addCategory({ name })` để gửi yêu cầu POST tới API, thêm category mới được trả về từ API response vào danh sách hiển thị hiện tại và làm trống (reset) form nhập.

#### 2. Mã nguồn triển khai (Code)
```jsx
// src/pages/ManageCategories.jsx
const handleAdd = async (e) => {
  e.preventDefault()
  formDispatch({ type: 'SET_VALIDATED', payload: true })

  if (!e.currentTarget.checkValidity()) {
    e.stopPropagation()
    return
  }

  // TODO-10A: Thực hiện validate tên trùng lặp và gửi POST API thêm mới
  const name = form.newName.trim()
  const error = validateCategoryName(name, categories)
  if (error) {
    formDispatch({ type: 'SET_UNIQUE_ERROR', payload: true })
    return
  }

  try {
    const created = await addCategory({ name })
    setCategories((prev) => [...prev, created])
    formDispatch({ type: 'RESET' })
  } catch (err) {
    setPageError(err.message)
  }
}
```
*Đoạn mã hiển thị UI Form tương ứng:*
```jsx
{/* TODO-10A: Form thêm mới danh mục */}
<h5 className="mt-2">Add New Category</h5>
<Form
  noValidate
  validated={form.validated}
  onSubmit={handleAdd}
  style={{ maxWidth: 400 }}
>
  <Form.Group className="mb-2">
    <Form.Control
      required
      minLength={3}
      type="text"
      placeholder="e.g. Buffet"
      value={form.newName}
      isInvalid={form.uniqueError}
      onChange={(e) =>
        formDispatch({ type: 'SET_NAME', payload: e.target.value })
      }
      onBlur={(e) => {
        formDispatch({
          type: 'BLUR',
          isValid: e.target.checkValidity() && !form.uniqueError,
        })
      }}
    />
    <Form.Control.Feedback type="invalid">
      {form.uniqueError
        ? 'Category name already exists.'
        : 'Name is required and must be at least 3 characters.'}
    </Form.Control.Feedback>
  </Form.Group>
  <Button type="submit" variant="primary">Add</Button>
</Form>
```

#### 3. Checklist Kiểm tra
- [ ] Giao diện form hiển thị đúng placeholder `"e.g. Buffet"`.
- [ ] Nhập tên dưới 3 ký tự (Ví dụ: `ab`) $\rightarrow$ Bấm Add $\rightarrow$ Xuất hiện thông báo lỗi yêu cầu nhập tối thiểu 3 ký tự, không có request POST gửi đi.
- [ ] Nhập tên trùng lặp (Ví dụ: `buffet` hoặc `Buffet`) $\rightarrow$ Bấm Add $\rightarrow$ Xuất hiện thông báo lỗi chứa `"already exists"`.
- [ ] Nhập tên hợp lệ mới (Ví dụ: `Sushi Bar`) $\rightarrow$ Bấm Add $\rightarrow$ Danh mục mới xuất hiện ngay lập tức ở bảng danh sách trên và ô input tự động được xóa trống.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI - Báo lỗi trùng tên):** Gõ tên danh mục đã có sẵn (ví dụ: "Buffet") vào ô input và nhấn nút Add, chụp lại thông báo lỗi màu đỏ xuất hiện dưới ô input `"Category name already exists."`.
* **Ảnh 2 (UI - Thêm thành công):** Gõ danh mục mới "Japanese Food" rồi bấm Add, chụp lại bảng danh mục có chứa dòng "Japanese Food" vừa được tạo.

---

### TODO-10B — Xóa Category với hộp thoại
* **File:** [ManageCategories.jsx](file:///d:/SU26/FER202/PT2/Progress%20Test%202/template/src/pages/ManageCategories.jsx)
* **Điểm số:** 1.0 điểm
* **Dòng lệnh chạy test:** `npm test -- --testPathPattern="ManageCategories" --watchAll=false`

#### 1. Yêu cầu chi tiết
* Trong bảng hiển thị danh sách các Category ở trang Manage Categories, thiết lập nút bấm **Delete** cho mỗi dòng.
* Khi nhấn nút Delete của một danh mục:
  1. Kích hoạt hiển thị hộp thoại xác nhận `<ModalConfirm>` (`role="dialog"`).
  2. Tên của category cần xóa phải được hiển thị in đậm bên trong thẻ `<strong>` của lời nhắn xác nhận trong Modal.
  3. Nếu người dùng chọn **Delete** (Xác nhận): Gọi DELETE API `deleteCategory(id)` tương ứng với ID của danh mục, xóa danh mục đó khỏi state danh sách hiển thị để cập nhật tức thời UI, sau đó đóng modal.
  4. Nếu chọn **Cancel** (Hủy): Đóng modal, giữ nguyên danh sách, tuyệt đối không gọi DELETE API.

#### 2. Mã nguồn triển khai (Code)
*State và Handler xử lý xác nhận xóa:*
```jsx
// src/pages/ManageCategories.jsx
// TODO-10B: Khai báo state lưu giữ category đang được chọn để xóa
const [deletingCategory, setDeletingCategory] = useState(null)

/** TODO-10B: Thực hiện gọi API xóa category và cập nhật giao diện */
const handleDeleteConfirm = async () => {
  if (!deletingCategory) return

  try {
    await deleteCategory(deletingCategory.id)
    setCategories((prev) =>
      prev.filter((category) => category.id !== deletingCategory.id)
    )
    setDeletingCategory(null)
  } catch (err) {
    setPageError(err.message)
  }
}
```
*Tích hợp ModalConfirm vào UI:*
```jsx
{/* TODO-10B: Hộp thoại xác nhận xóa category */}
<ModalConfirm
  show={!!deletingCategory}
  title="Confirm Delete"
  message={
    <p>
      Are you sure you want to delete category{' '}
      <strong>{deletingCategory?.name}</strong>?
    </p>
  }
  confirmText="Delete"
  onConfirm={handleDeleteConfirm}
  onCancel={() => setDeletingCategory(null)}
/>
```

#### 3. Checklist Kiểm tra
- [ ] Bấm nút **Delete** của danh mục `Fast Food` $\rightarrow$ Modal hiện lên chính giữa trang.
- [ ] Nội dung modal hiển thị đúng dòng chữ: *"Are you sure you want to delete category **Fast Food**?"* (chữ Fast Food phải in đậm).
- [ ] Bấm **Cancel** $\rightarrow$ Modal đóng, danh mục `Fast Food` vẫn hiển thị bình thường.
- [ ] Bấm **Delete** $\rightarrow$ Modal đóng, dòng `Fast Food` biến mất hoàn toàn khỏi bảng.

#### 4. Cách chụp ảnh báo cáo
* **Ảnh 1 (UI - Modal xác nhận xóa):** Bấm Delete của một danh mục (ví dụ: "Fast Food"), chụp màn hình ModalConfirm hiện ra ghi rõ tên danh mục in đậm.
* **Ảnh 2 (Terminal):** Chạy lệnh `npm test -- --testPathPattern="ManageCategories"`, chụp lại kết quả `PASS` cho file `ManageCategories.test.jsx` hiển thị 2 tests cho TODO-10A và TODO-10B đều pass.

---

## IV. BÁO CÁO KẾT QUẢ TEST SUITE TOÀN BỘ (JEST TEST RUNNER)

Khi hoàn thành tất cả các TODO, chạy bộ kiểm thử toàn diện để đảm bảo ứng dụng hoạt động ổn định và không gặp lỗi hồi quy.

* **Lệnh chạy toàn bộ test:**
  ```bash
  npm test
  ```
* **Kết quả kỳ vọng:**
  * **Test Suites:** `7 passed, 7 total`
  * **Tests:** `20 passed, 20 total`
  * **Snapshots:** `0 total`

#### Cách chụp hình kết quả tổng:
1. Mở Terminal trong VS Code, chạy lệnh `npm test`.
2. Kéo rộng cửa sổ terminal lên cao để hiển thị toàn bộ 7 file test đều có nhãn màu xanh lá chữ **`PASS`**.
3. Chụp lại vùng terminal này để đính kèm vào phần cuối cùng của Báo cáo.

---

## V. CÁCH CHUYỂN FILE MARKDOWN NÀY SANG FILE WORD (.DOCX)

Sau khi đọc và kiểm tra nội dung file báo cáo này, bạn có thể chuyển đổi sang định dạng Word (`.docx`) bằng các cách đơn giản sau để nộp bài:

1. **Cách 1: Copy-Paste trực tiếp vào Microsoft Word (Nhanh nhất & Đơn giản nhất):**
   * Mở file `BaoCao_Review_Progress_Test_2.md` trong VS Code.
   * Nhấn `Ctrl + Shift + V` để mở tab xem trước Markdown (Markdown Preview) trong VS Code.
   * Tại tab Preview đó, nhấn `Ctrl + A` để bôi đen toàn bộ văn bản và bảng biểu đã hiển thị đẹp mắt, sau đó nhấn `Ctrl + C`.
   * Mở một file Microsoft Word trắng mới, nhấn `Ctrl + V` để dán vào. Microsoft Word sẽ giữ nguyên các định dạng tiêu đề, danh sách, bảng biểu và code block cực kỳ đẹp mắt.
2. **Cách 2: Sử dụng Extension của VS Code:**
   * Cài đặt extension tên là **Markdown PDF** hoặc **Markdown to DOCX** trong VS Code.
   * Nhấp chuột phải vào file `.md` này và chọn **Export to DOCX** / **Export to PDF**.
3. **Cách 3: Chuyển đổi trực tuyến (Online):**
   * Truy cập các trang web chuyển đổi định dạng trực tuyến miễn phí (Ví dụ: `https://dillinger.io/` hoặc `https://pandoc.org/` hoặc các trang convert `.md` sang `.docx` online).
   * Tải file `.md` này lên và tải file Word `.docx` đã chuyển đổi về máy.
4. **Cách 4: Đính kèm hình ảnh:**
   * Sau khi đã đưa văn bản vào Word, hãy thực hiện thao tác chụp màn hình theo hướng dẫn ở mục **II** và chèn (paste) các ảnh chụp tương ứng vào bên dưới từng mục TODO trong file Word của bạn.
