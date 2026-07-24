# ĐỀ THI THỰC HÀNH — Cinema Management App
## FER202 ReactJS | Thời gian: 90 phút

---

## Mô tả ứng dụng

**Cinema Management App** là hệ thống quản lý rạp chiếu phim, cho phép Admin đăng nhập và quản lý danh sách phim (movies) và thể loại (genres).

**Công nghệ:** React 18 + Vite + React-Bootstrap 2.x + axios + json-server

**Entities:**
- **Movie**: id, title, director, studio, genreId, ticketPrice (giá vé VND), vipPrice (giá vé VIP VND), releaseDate (dd/MM/yyyy)
- **Genre**: id, name

**Dữ liệu mẫu (db.json):**
- 3 users (1 Admin, 2 User)
- 5 genres (Action, Sci-Fi, Drama, Animation, Comedy)
- 10 movies — **2 phim mỗi genre**

```json
"genres": [
  { "id": "1", "name": "Action" },
  { "id": "2", "name": "Sci-Fi" },
  { "id": "3", "name": "Drama" },
  { "id": "4", "name": "Animation" },
  { "id": "5", "name": "Comedy" }
],
"movies": [
  { "id": "1",  "title": "Mad Max: Fury Road",       "director": "George Miller",    "studio": "Warner Bros",         "genreId": 1, "ticketPrice": 5000,  "vipPrice": 50000,  "releaseDate": "15/05/2015" },
  { "id": "2",  "title": "Die Hard",                 "director": "John McTiernan",   "studio": "20th Century Fox",    "genreId": 1, "ticketPrice": 5000,  "vipPrice": 50000,  "releaseDate": "15/07/1988" },

  { "id": "3",  "title": "Inception",                "director": "Christopher Nolan","studio": "Legendary Pictures",  "genreId": 2, "ticketPrice": 8000,  "vipPrice": 80000,  "releaseDate": "16/07/2010" },
  { "id": "4",  "title": "Interstellar",             "director": "Ridley Scott",     "studio": "Scott Free",          "genreId": 2, "ticketPrice": 7500,  "vipPrice": 75000,  "releaseDate": "01/10/2015" },

  { "id": "5",  "title": "The Shawshank Redemption", "director": "Frank Darabont",   "studio": "Castle Rock",         "genreId": 3, "ticketPrice": 7000,  "vipPrice": 70000,  "releaseDate": "23/09/1994" },
  { "id": "6",  "title": "Forrest Gump",             "director": "Robert Zemeckis",  "studio": "Paramount Pictures",  "genreId": 3, "ticketPrice": 8000,  "vipPrice": 80000,  "releaseDate": "06/07/1994" },

  { "id": "7",  "title": "Spirited Away",            "director": "Hayao Miyazaki",   "studio": "Studio Ghibli",       "genreId": 4, "ticketPrice": 10000, "vipPrice": 100000, "releaseDate": "20/07/2001" },
  { "id": "8",  "title": "Toy Story",                "director": "John Lasseter",    "studio": "Pixar",               "genreId": 4, "ticketPrice": 9000,  "vipPrice": 90000,  "releaseDate": "22/11/1995" },

  { "id": "9",  "title": "The Grand Budapest Hotel", "director": "Wes Anderson",     "studio": "Fox Searchlight",     "genreId": 5, "ticketPrice": 6000,  "vipPrice": 60000,  "releaseDate": "28/03/2014" },
  { "id": "10", "title": "Home Alone",               "director": "Chris Columbus",   "studio": "Hughes Entertainment","genreId": 5, "ticketPrice": 6500,  "vipPrice": 65000,  "releaseDate": "16/11/1990" }
]
```

---

## Cách chạy ứng dụng

```bash
cd template/          # hoặc solution/
npm install
npm start             # chạy đồng thời json-server (port 3001) + Vite (port 5173)
npm test              # chạy visible tests
```

Tài khoản đăng nhập:
- Admin: `admin / admin123`
- User (không được đăng nhập): `user1 / user123`

> **Session persistence:** Sau khi đăng nhập, session được lưu vào `localStorage` — reload trang vẫn giữ trạng thái đăng nhập. Click Logout sẽ xóa session khỏi `localStorage`.

---

## Cấu trúc file cần hoàn thành

```
src/
├── components/
│   ├── AppNavbar.jsx     ← TODO-02, TODO-03
│   ├── AppFooter.jsx     ← TODO-04
│   └── MovieRow.jsx       ← TODO-06
├── pages/
│   ├── Login.jsx         ← TODO-01
│   ├── MovieDetail.jsx    ← TODO-05
│   ├── MovieList.jsx      ← TODO-07
│   ├── ManageGenres.jsx  ← TODO-10
│   ├── GenreDetail.jsx   ← TODO-09
│   └── NotFound.jsx      ← TODO-08
└── routes/
    └── AppRoutes.jsx     ← TODO-08
```

---

## Bảng điểm

| TODO    | Mô tả                                                   | Điểm |
|---------|---------------------------------------------------------|------|
| TODO-01 | Login — hiện Alert khi đăng nhập thất bại               | 1.0  |
| TODO-02 | Navbar — hiện fullName + role Badge                     | 0.5  |
| TODO-03 | Navbar — Logout                                         | 0.5  |
| TODO-04 | AppFooter — logo + info từ about.js                     | 1.0  |
| TODO-05 | MovieDetail — fetch + Spinner + UI                       | 1.0  |
| TODO-06 | MovieRow — Delete với ModalConfirm                       | 1.0  |
| TODO-07 | MovieList — Search theo title + Filter theo Genre        | 2.0  |
| TODO-08 | NotFound page + cấu hình route catch-all trong AppRoutes | 1.0  |
| TODO-09 | GenreDetail — Promise.all + navigate /not-found         | 1.0  |
| TODO-10 | ManageGenres — Delete genre (kiểm tra đang được dùng)  | 1.0  |
| **Tổng** |                                                        | **10.0** |

---

## Chi tiết từng TODO

---

### TODO-01 — Login: Hiện Alert khi đăng nhập thất bại (1.0đ)

**File:** `src/pages/Login.jsx`

**Yêu cầu:**
Trong `handleSubmit`, block `catch(err)` hiện tại đang trống. Sinh viên phải dispatch action `SET_ERROR` với `err.message` để `serverError` được cập nhật và Alert hiện ra.

**Yêu cầu kỹ thuật:**
- Dùng `dispatch({ type: 'SET_ERROR', payload: err.message })`
- `serverError` được render trong `<Alert variant="danger">` — đã có sẵn trong JSX
- Alert phải hiện khi: (1) sai username/password, (2) user có role !== 'Admin'

**Checklist sinh viên:**
- ✅ Điền `dispatch({ type: 'SET_ERROR', payload: err.message })` vào catch block
- ✅ Chạy app: đăng nhập với `user1/user123` → thấy Alert đỏ
- ✅ Chạy app: đăng nhập sai password → thấy Alert đỏ
- ✅ `npm test Login` → 3/3 tests pass

**Test liên quan:** `Login.test.jsx`

---

### TODO-02 — Navbar: Hiển thị fullName và role (0.5đ)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:**
Trong phần `{user && (...)}`, hiện `user.fullName` (bold, màu trắng) và `user.role` bên trong `<Badge>`.

**Yêu cầu kỹ thuật:**
- `user.fullName` phải xuất hiện trong DOM (text node hoặc span có chứa text)
- `user.role` phải xuất hiện trong `<Badge>` component
- Dùng `className="fw-bold"` hoặc `<strong>` để in đậm fullName

**Checklist sinh viên:**
- ✅ Sau login, thấy "Cinema Admin" hiện trên navbar
- ✅ Thấy Badge với text "Admin"
- ✅ `npm test AppNavbar` → tests TODO-02 pass

---

### TODO-03 — Navbar: Logout (0.5đ)

**File:** `src/components/AppNavbar.jsx`

**Yêu cầu:**
Hoàn thiện hàm `handleLogout`:
1. Gọi `logoutUser()` từ AuthContext
2. Gọi `navigate('/login')`

Nút Logout đã có sẵn trong JSX (`onClick={handleLogout}`).

**Yêu cầu kỹ thuật:**
- `logoutUser` phải được gọi TRƯỚC `navigate`
- Navigate đến đúng path `'/login'` (không phải `/` hay `/logout`)
- Khi `user` là `null`, nút Logout không được hiện ra (đã xử lý bởi `{user && (...)}`)

**Checklist sinh viên:**
- ✅ Click Logout → trang chuyển về `/login`
- ✅ Sau logout, truy cập `/` bị redirect về `/login`
- ✅ `npm test AppNavbar` → tests TODO-03 pass

---

### TODO-04 — AppFooter: Thông tin từ about.js (1.0đ)

**File:** `src/components/AppFooter.jsx`

**Yêu cầu:**
Import `about` từ `'../data/about'` và hiện:
- `<img src={about.logo} alt="logo" height={28}>` — ảnh logo từ `public/images/logo.jpg`
- `about.appName` — tên ứng dụng (in đậm, cạnh logo)
- `about.copyright` — text bản quyền

**Cấu trúc `about.js`:**
```js
const about = {
  appName: 'Cinema Management App',
  logo: '/images/logo.jpg',
  year: 2026,
  copyright: '© 2026 Cinema Management App',
}
```

**Yêu cầu kỹ thuật:**
- Phần tử gốc PHẢI là `<footer>` (tag HTML, không phải div)
- Có `<img>` với `src={about.logo}` — đường dẫn lấy từ `about.logo`, không hardcode
- `about.appName` hiện trong DOM (text node hoặc span)
- `about.copyright` hiện trong DOM

**Checklist sinh viên:**
- ✅ Footer hiện ở cuối trang sau khi login
- ✅ Thấy logo + "Cinema Management App" + "© 2026..."
- ✅ `npm test AppFooter` → 3/3 tests pass

---

### TODO-05 — MovieDetail: Fetch + Spinner + UI (1.0đ)

**File:** `src/pages/MovieDetail.jsx`

**Yêu cầu:**
1. Trong `useEffect`: gọi `fetchMovieById(id)`, `.then(data => setMovie(data))`, `.catch(err => setError(err.message))`, `.finally(() => setLoading(false))`
2. Thay `if (loading) return null` → trả về Container có `<Spinner animation="border" role="status" />`
3. Thay `if (error) return null` → trả về Container có `<Alert variant="danger">{error}</Alert>`
4. Trong Card.Body: hiện đầy đủ thông tin phim

**Yêu cầu kỹ thuật:**
- Spinner phải có `role="status"` và class `.spinner-border`
- Alert phải có `variant="danger"` và `role="alert"` (tự động từ React-Bootstrap)
- Back button: `onClick={() => navigate('/')}`, text chứa "Back"
- Hiện: title, director, studio, genre name (từ MovieContext genres), ticketPrice (formatVND), vipPrice (formatVND), releaseDate (formatDateDisplay)
- Genre hiện trong `<Badge bg="secondary">`

**Checklist sinh viên:**
- ✅ Vào `/movies/1` → thấy Spinner lúc đầu, rồi hiện thông tin phim
- ✅ Vào `/movies/999` → thấy Alert đỏ
- ✅ Thấy nút Back to List
- ✅ `npm test MovieDetail` → 5/5 tests pass

---

### TODO-06 — MovieRow: Delete với ModalConfirm (1.0đ)

**File:** `src/components/MovieRow.jsx`

**Yêu cầu:**
1. Thêm `const [showModal, setShowModal] = useState(false)`
2. Nút Delete: `onClick={() => setShowModal(true)}`
3. `handleDeleteConfirm`: gọi `onDelete(movie.id)` rồi `setShowModal(false)`
4. Thêm `<ModalConfirm>` với props: `show={showModal}`, `title="Delete Movie"`, `message={\`Are you sure you want to delete "${movie.title}"?\`}`, `onConfirm={handleDeleteConfirm}`, `onCancel={() => setShowModal(false)}`

**Lưu ý:** `formatPriceRange` đã được import và dùng sẵn trong cột Ticket Price Range — sinh viên không cần làm gì với cột này.

**Yêu cầu kỹ thuật:**
- Import `ModalConfirm` từ `'./ModalConfirm'`
- Modal message phải chứa `movie.title` (không hardcode)
- `onDelete` phải nhận `movie.id`
- Cancel modal → `onDelete` KHÔNG được gọi
- Nút Confirm trong modal có text **"Confirm"** (không phải "Delete")

**Checklist sinh viên:**
- ✅ Click Delete → thấy Modal với tên phim
- ✅ Click Confirm trong modal → phim bị xóa khỏi list
- ✅ Click Cancel trong modal → không có gì xảy ra
- ✅ `npm test MovieRow` → tests TODO-06 pass

---

### TODO-07 — MovieList: Search theo title + Filter theo Genre (2.0đ)

**File:** `src/pages/MovieList.jsx`

**Yêu cầu — Search (1.0đ):**
1. Thêm state: `const [searchQuery, setSearchQuery] = useState('')`
2. Thêm `<Form.Control>` với `placeholder="Search by title..."`, `value={searchQuery}`, `onChange={e => setSearchQuery(e.target.value)}`
3. Tính `filteredMovies`: filter movies theo title chứa `searchQuery` (case-insensitive)
4. Render `filteredMovies` thay vì `movies`
5. Khi `filteredMovies.length === 0`: hiện text `"No movies found."`

**Yêu cầu — Filter theo Genre (1.0đ):**
1. Thêm state: `const [selectedGenreId, setSelectedGenreId] = useState('')`
2. Thêm `<Form.Select>` với option đầu `<option value="">All Genres</option>` + map từ `genres`
3. Cập nhật `filteredMovies` để kết hợp **đồng thời** cả search và genre filter (AND logic)

**Yêu cầu kỹ thuật:**
- Search case-insensitive
- `"All Genres"` option phải có `value=""`
- Filter genre: `String(movie.genreId) === selectedGenreId`
- Khi đổi genre filter không reset searchQuery và ngược lại
- `filteredMovies.length === 0` → "No movies found."
- Pagination đã được cài sẵn (PROVIDED) — không cần thêm

**Checklist sinh viên:**
- ✅ Nhập "Die Hard" → chỉ còn 1 kết quả
- ✅ Nhập "xyz" → thấy "No movies found."
- ✅ Chọn "Sci-Fi" → chỉ hiện 2 phim Sci-Fi
- ✅ Chọn "Sci-Fi" + nhập "interstellar" → chỉ còn "Interstellar"
- ✅ `npm test MovieList` → 6/6 tests pass

---

### TODO-08 — NotFound page + AppRoutes (1.0đ)

**Files:** `src/pages/NotFound.jsx` và `src/routes/AppRoutes.jsx`

**Phần 1 — NotFound.jsx:**
Tạo trang 404 với:
- Import `useNavigate` từ `react-router-dom`
- Hiện text **"404"** nổi bật (dùng heading)
- Hiện text **"Page Not Found"**
- Nút điều hướng về `'/'` khi click
- Bọc trong `<Container className="mt-5 text-center">`

**Phần 2 — AppRoutes.jsx:**
Thêm route catch-all vào cuối `<Routes>`:
```jsx
<Route path="*" element={<NotFound />} />
```

**Yêu cầu kỹ thuật:**
- `NotFound` đã được import sẵn trong AppRoutes — chỉ cần thêm `<Route>`
- "404" phải xuất hiện trong một heading element (h1–h6)
- "Page Not Found" phải xuất hiện trong một heading element
- Nút Back phải gọi `navigate('/')` (dùng hook, không dùng `window.location`)
- Truy cập URL không tồn tại (vd: `/abc`) → tự động hiện trang 404

**Checklist sinh viên:**
- ✅ Vào `/anything-random` → thấy trang "404 — Page Not Found"
- ✅ Click nút Back → về trang chủ `/`
- ✅ GenreDetail khi genre không tồn tại → `navigate('/not-found')` → thấy trang 404
- ✅ `npm test NotFound` → 4/4 tests pass

---

### TODO-09 — GenreDetail: Promise.all + Navigate NotFound (1.0đ)

**File:** `src/pages/GenreDetail.jsx`

**Yêu cầu:**
Trong `load()`:
1. Dùng `const [genres, allMovies] = await Promise.all([fetchGenres(), fetchMovies()])`
2. Tìm genre: `const found = genres.find(g => String(g.id) === String(id))`
3. Nếu không tìm thấy: `navigate('/not-found', { replace: true })` rồi `return`
4. Filter phim: `const filtered = allMovies.filter(b => String(b.genreId) === String(id))`
5. `setGenre(found)`, `setMovies(filtered)`
6. Xử lý `finally: setLoading(false)`

Thay `if (loading) return null` → trả về `<Container><Spinner animation="border" role="status" /></Container>`  
Thêm `if (!genre) return null` (safety guard)  
Hoàn thiện JSX: Back button, Card với genre info, Table với danh sách phim

**Yêu cầu kỹ thuật:**
- Dùng `Promise.all` (không phải 2 await riêng lẻ)
- ID không tồn tại → `navigate('/not-found', { replace: true })`
- Back button: `onClick={() => navigate('/genres')}`, text chứa "Back to Genres"
- Card: hiện `genre.name` trong `<Badge bg="primary">` và `movies.length`
- Table: các cột #, Title, Director, Studio, Release Date

**Checklist sinh viên:**
- ✅ Vào `/genres/1` → thấy "Action" và 2 phim (Mad Max: Fury Road, Die Hard)
- ✅ Vào `/genres/999` → tự động điều hướng đến trang Not Found
- ✅ Có nút Back to Genres
- ✅ `npm test GenreDetail` → 4/4 tests pass

---

### TODO-10 — ManageGenres: Delete genre với kiểm tra đang dùng (1.0đ)

**File:** `src/pages/ManageGenres.jsx`

**Ngữ cảnh:** Trang đã được cung cấp sẵn:
- `handleAdd` — thêm genre (với kiểm tra trùng tên)
- `handleDeleteRequest` — set `genreToDelete` khi click Delete
- `<ModalConfirm>` — hiện modal xác nhận
- `<Alert>` để hiện `deleteError`
- `fetchMovies` đã được gọi trong `useEffect` → state `movies` có sẵn

**Yêu cầu — hoàn thiện `handleDeleteConfirm`:**
1. `if (!genreToDelete) return`
2. Kiểm tra genre đang được dùng:
   ```js
   const inUse = movies.some(b => String(b.genreId) === String(genreToDelete.id))
   ```
3. Nếu `inUse`:
   - `setDeleteError(\`Cannot delete "${genreToDelete.name}" — it is currently assigned to movies.\`)`
   - `setGenreToDelete(null)`
   - `return`
4. Nếu không `inUse`:
   - `await deleteGenre(genreToDelete.id)`
   - `setGenres(prev => prev.filter(g => g.id !== genreToDelete.id))`
   - `setGenreToDelete(null)`

**Yêu cầu kỹ thuật:**
- So sánh ID bằng `String()` (tránh lỗi kiểu dữ liệu)
- Error message phải chứa tên genre và từ "cannot delete" (case-insensitive)
- `deleteGenre` KHÔNG được gọi nếu genre đang được dùng
- Sau khi xóa thành công, genre biến mất khỏi bảng
- `deleteError` hiện trong `<Alert variant="danger">` (đã có sẵn trong JSX)

**Checklist sinh viên:**
- ✅ Click Delete "Action" (có phim) → Confirm → thấy Alert "Cannot delete..."
- ✅ "Action" vẫn còn trong bảng sau đó
- ✅ Xóa genre không có phim → xóa thành công, genre biến mất
- ✅ `npm test ManageGenres` → tests TODO-10 pass

---

## Lưu ý quan trọng

1. **Không sửa** các file: `AddMovie.jsx`, `MovieContext.jsx`, `AuthContext.jsx`, `movieApi.js`, `authApi.js`, `ModalConfirm.jsx`, `GenreList.jsx`, và các reducer/utils — chỉ đọc để hiểu (`AuthContext` đã xử lý localStorage persistence sẵn)
2. Chạy `npm start` để chạy app, `npm test` để kiểm tra tiến độ
3. Bài thi còn có **hidden tests** kiểm tra edge cases và anti-hardcode
4. Tên placeholder trong ManageGenres phải là `"e.g. Thriller"` (giữ nguyên)
5. Nút Confirm trong `<ModalConfirm>` có text **"Confirm"** (không phải "Delete")
