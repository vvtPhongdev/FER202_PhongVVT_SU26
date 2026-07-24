# Guide_SV — Hướng Dẫn Lab5 (PE SP26) (useContext + useReducer)

> **Đề:** Student Feedback & Course Review | **Thời gian:** 85 phút  
> **Stack:** React 18 · Vite · React-Bootstrap · Axios · useContext + useReducer · JSON Server

---

## Phân bổ điểm & thời gian

| Phần | Điểm | Thời gian gợi ý |
|------|------|----------------|
| Setup JSON Server | 1.0 | 3 phút |
| Project Structure | 0.5 | 2 phút |
| Authentication (/login) | 2.5 | 15 phút |
| Feedback Dashboard (/home) | 6.0 | 50 phút |
| **Tổng** | **10.0** | **70 phút** (dư 15 phút test) |

> ✅ Dùng **useContext + useReducer** đạt đủ 10 điểm (tương đương Redux Toolkit).

---

## Cấu trúc thư mục cần tạo

```
fer202-01/
├── db.json                     ← copy từ Given folder
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx                ← bọc toàn app bằng 2 Provider
    ├── App.jsx
    ├── api/
    │   ├── authApi.js          ← loginUser()
    │   └── feedbackApi.js      ← get / create / update / remove
    ├── context/
    │   ├── AuthContext.jsx     ← AuthProvider + useAuth()
    │   └── FeedbackContext.jsx ← FeedbackProvider + useFeedback()
    ├── reducer/
    │   ├── authReducer.js      ← AUTH_ACTIONS + authReducer
    │   └── feedbackReducer.js  ← FEEDBACK_ACTIONS + feedbackReducer
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── AddFeedbackForm.jsx
    │   ├── FeedbackTable.jsx
    │   ├── EditFeedbackModal.jsx
    │   └── DeleteConfirmModal.jsx  ← modal xác nhận xóa
    ├── pages/
    │   ├── LoginPage.jsx
    │   └── HomePage.jsx
    ├── routes/
    │   ├── AppRoutes.jsx
    │   └── PrivateRoute.jsx
    └── utils/
        ├── validate.js
        └── format.js
```

---

## BƯỚC 1 — Khởi tạo & cài packages (5 phút)

```bash
npm create vite@latest fer202-01 -- --template react
cd fer202-01
npm install react-router-dom axios react-bootstrap bootstrap concurrently
npm install -D json-server
```

Cập nhật `package.json` — thêm scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "server": "json-server --watch db.json --port 3001",
  "start": "concurrently \"npm run server\" \"npm run dev\""
}
```

Copy `db.json` từ Given folder vào thư mục gốc project, rồi chạy:

```bash
npm start
```

✅ **Checklist:**
- [ ] React app tại `http://localhost:5173`
- [ ] JSON Server tại `http://localhost:3001`
- [ ] `http://localhost:3001/users` → 2 users
- [ ] `http://localhost:3001/feedbacks` → 4 feedbacks

---

## BƯỚC 2 — Utils (3 phút)

### `src/utils/validate.js`

```js
export const validateLogin = (email, password) => {
  if (!email.trim() || !password.trim()) {
    return 'Email and password are required'
  }
  if (!email.includes('@')) {
    return 'Email must contain @'
  }
  return null
}

export const validateFeedback = ({ course, rating }) => {
  if (!course || !course.trim()) return 'Course name is required'
  const r = Number(rating)
  if (!rating || isNaN(r) || r < 1 || r > 5) return 'Rating must be between 1 and 5'
  return null
}
```

### `src/utils/format.js`

```js
// Chuyển YYYY-MM-DD → DD-MM-YYYY, giữ nguyên nếu đã đúng
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-')
    return `${d}-${m}-${y}`
  }
  return dateStr
}

// Ngày hôm nay dạng DD-MM-YYYY
export const getTodayFormatted = () => {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  return `${dd}-${mm}-${now.getFullYear()}`
}
```

✅ **Checklist:**
- [ ] `validateLogin('', '')` → `'Email and password are required'`
- [ ] `validateLogin('abc', '123')` → `'Email must contain @'`
- [ ] `validateLogin('a@b.com', '123')` → `null`
- [ ] `formatDate('2025-10-05')` → `'05-10-2025'`
- [ ] `formatDate('03-02-2026')` → `'03-02-2026'` (không đổi)

---

## BƯỚC 3 — API layer (5 phút)

### `src/api/authApi.js`

```js
import axios from 'axios'

const BASE = 'http://localhost:3001'

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(`${BASE}/users`, { params: { email, password } })
  return res.data[0] || null   // null nếu không tìm thấy
}
```

### `src/api/feedbackApi.js`

```js
import axios from 'axios'

const BASE = 'http://localhost:3001'

export const getFeedbacksByUser = async (userId) => {
  const res = await axios.get(`${BASE}/feedbacks`, { params: { userId } })
  return res.data
}

export const createFeedback = async (data) => {
  const res = await axios.post(`${BASE}/feedbacks`, data)
  return res.data
}

export const updateFeedback = async (id, data) => {
  const res = await axios.put(`${BASE}/feedbacks/${id}`, data)
  return res.data
}

export const removeFeedback = async (id) => {
  await axios.delete(`${BASE}/feedbacks/${id}`)
}
```

✅ **Checklist:**
- [ ] `loginUser` dùng `params` — không ghép URL thủ công
- [ ] Tất cả service functions đều `async/await`
- [ ] `createFeedback` và `updateFeedback` trả về `response.data`

---

## BƯỚC 4 — Reducers (7 phút)

> Reducer là pure function: nhận `(state, action)` → trả về state mới. **Không gọi API ở đây.**

### `src/reducer/authReducer.js`

```js
export const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

export const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null }

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, loading: false, user: action.payload }

    case AUTH_ACTIONS.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('user')
      return { ...state, user: null }

    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null }

    default:
      return state
  }
}
```

### `src/reducer/feedbackReducer.js`

```js
export const FEEDBACK_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
}

export const initialFeedbackState = {
  items: [],
  loading: false,
  error: null,
}

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case FEEDBACK_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null }

    case FEEDBACK_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload }

    case FEEDBACK_ACTIONS.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }

    case FEEDBACK_ACTIONS.ADD:
      return { ...state, items: [...state.items, action.payload] }

    case FEEDBACK_ACTIONS.EDIT:
      return {
        ...state,
        items: state.items.map((f) =>
          f.id === action.payload.id ? action.payload : f
        ),
      }

    case FEEDBACK_ACTIONS.DELETE:
      return {
        ...state,
        items: state.items.filter((f) => f.id !== action.payload),
      }

    default:
      return state
  }
}
```

✅ **Checklist:**
- [ ] Không có `axios` trong reducer
- [ ] `LOGIN_SUCCESS` lưu vào `localStorage`
- [ ] `LOGOUT` xóa `localStorage`
- [ ] `EDIT` dùng `.map()` — thay đúng phần tử theo `id`
- [ ] `DELETE` dùng `.filter()` — loại phần tử theo `id`
- [ ] Mọi case đều `return { ...state, ... }` (không mutate trực tiếp)

---

## BƯỚC 5 — Context (10 phút)

> Context = nơi kết nối reducer với API, rồi expose ra cho toàn app qua custom hook.

### `src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useReducer } from 'react'
import { authReducer, initialAuthState, AUTH_ACTIONS } from '../reducer/authReducer'
import { loginUser } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })
    try {
      const user = await loginUser(credentials)
      if (!user) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAIL, payload: 'Invalid email or password' })
        return false
      }
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user })
      return true            // ← LoginPage dùng giá trị này để navigate
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAIL, payload: err.message })
      return false
    }
  }

  const logout = () => dispatch({ type: AUTH_ACTIONS.LOGOUT })
  const clearError = () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

### `src/context/FeedbackContext.jsx`

```jsx
import { createContext, useContext, useReducer } from 'react'
import { feedbackReducer, initialFeedbackState, FEEDBACK_ACTIONS } from '../reducer/feedbackReducer'
import { getFeedbacksByUser, createFeedback, updateFeedback, removeFeedback } from '../api/feedbackApi'

const FeedbackContext = createContext(null)

export function FeedbackProvider({ children }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialFeedbackState)

  const fetchFeedbacks = async (userId) => {
    dispatch({ type: FEEDBACK_ACTIONS.FETCH_START })
    try {
      const data = await getFeedbacksByUser(userId)
      dispatch({ type: FEEDBACK_ACTIONS.FETCH_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: FEEDBACK_ACTIONS.FETCH_FAIL, payload: err.message })
    }
  }

  const addFeedback = async (data) => {
    const newItem = await createFeedback(data)
    dispatch({ type: FEEDBACK_ACTIONS.ADD, payload: newItem })
  }

  const editFeedback = async (id, data) => {
    const updated = await updateFeedback(id, data)
    dispatch({ type: FEEDBACK_ACTIONS.EDIT, payload: updated })
  }

  const deleteFeedback = async (id) => {
    await removeFeedback(id)
    dispatch({ type: FEEDBACK_ACTIONS.DELETE, payload: id })
  }

  return (
    <FeedbackContext.Provider
      value={{ ...state, fetchFeedbacks, addFeedback, editFeedback, deleteFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
```

✅ **Checklist:**
- [ ] `AuthProvider` dùng `useReducer(authReducer, initialAuthState)`
- [ ] Hàm `login` trong context gọi API rồi `dispatch` — không gọi API trong reducer
- [ ] `login` trả về `true`/`false` để LoginPage biết có navigate không
- [ ] `FeedbackProvider` expose đủ 4 hàm: fetch, add, edit, delete
- [ ] Mỗi Context file export cả `Provider` lẫn custom hook (`useAuth`, `useFeedback`)

---

## BƯỚC 6 — main.jsx & App.jsx (3 phút)

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { FeedbackProvider } from './context/FeedbackContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FeedbackProvider>
          <App />
        </FeedbackProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

### `src/App.jsx`

```jsx
import AppRoutes from './routes/AppRoutes'

function App() {
  return <AppRoutes />
}

export default App
```

✅ **Checklist:**
- [ ] Thứ tự bọc: `BrowserRouter` → `AuthProvider` → `FeedbackProvider` → `App`
- [ ] `'bootstrap/dist/css/bootstrap.min.css'` được import

---

## BƯỚC 7 — Routes (4 phút)

### `src/routes/PrivateRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()       // lấy từ context
  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
```

### `src/routes/AppRoutes.jsx`

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import PrivateRoute from './PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
```

✅ **Checklist:**
- [ ] Truy cập `/home` khi chưa login → redirect `/login`
- [ ] Truy cập bất kỳ path lạ → redirect `/login`
- [ ] `PrivateRoute` dùng `useAuth()` — không đọc `localStorage` trực tiếp

---

## BƯỚC 8 — Components (20 phút)

### `src/components/Header.jsx`

```jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>🎓 Course Management System</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <Navbar.Text className="me-3 text-white">
                Signed in as <strong>{user.fullName}</strong>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
```

### `src/components/Footer.jsx`

```jsx
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-light border-top mt-5 py-3">
      <Container className="text-center text-muted">
        <small>© 2026 Course Management System — FPT University</small>
      </Container>
    </footer>
  )
}

export default Footer
```

### `src/components/AddFeedbackForm.jsx`

> Lỗi validate hiển thị **ngay dưới từng field** bằng `Form.Control.Feedback`, không dùng `Alert`.  
> Cần thêm `noValidate` vào `<Form>` và `isInvalid` vào `<Form.Control>` để Bootstrap kích hoạt style đỏ.  
> Toast success **tự động tắt sau 3 giây** nhờ `useEffect` + `setTimeout`.

```jsx
import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL = { course: '', topic: '', rating: '', comment: '' }

function AddFeedbackForm() {
  const { user } = useAuth()
  const { addFeedback } = useFeedback()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})        // object theo từng field
  const [success, setSuccess] = useState(false)

  // Tự động tắt toast sau 3 giây
  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timer)   // cleanup nếu component unmount
  }, [success])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))  // xóa lỗi field đó
    setSuccess(false)
  }

  const validate = () => {
    const newErrors = {}
    if (!form.course.trim()) newErrors.course = 'Course name is required'
    const r = Number(form.rating)
    if (!form.rating || isNaN(r) || r < 1 || r > 5)
      newErrors.rating = 'Rating must be between 1 and 5'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    await addFeedback({
      userId: user.id,
      course: form.course.trim(),
      topic: form.topic.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: getTodayFormatted(),
    })
    setForm(INITIAL)
    setErrors({})
    setSuccess(true)
  }

  return (
    <Card className="mb-4">
      <Card.Header><strong>Add Feedback</strong></Card.Header>
      <Card.Body>
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Feedback added successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-2 align-items-start">
            <Col md={3}>
              <Form.Control
                name="course"
                placeholder="Course (e.g. FER202)"
                value={form.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control name="topic" placeholder="Topic"
                value={form.topic} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <Form.Control
                name="rating" type="number" placeholder="Rating (1-5)"
                min="1" max="5"
                value={form.rating}
                onChange={handleChange}
                isInvalid={!!errors.rating}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rating}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control name="comment" placeholder="Comment"
                value={form.comment} onChange={handleChange} />
            </Col>
            <Col md={1}>
              <Button type="submit" variant="primary" className="w-100">Add</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddFeedbackForm
```

### `src/components/DeleteConfirmModal.jsx`

> Component modal Bootstrap riêng để xác nhận xóa — thay cho `window.confirm`.

```jsx
import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmModal({ show, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this feedback? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmModal
```

### `src/components/FeedbackTable.jsx`

> Click Delete → lưu `id` vào `deleteTarget` → mở `DeleteConfirmModal`.  
> Confirm → gọi `deleteFeedback` → reset `deleteTarget`.  
> **Không dùng** `window.confirm`.

```jsx
import { useState } from 'react'
import { Card, Table, Button, Badge } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'
import { formatDate } from '../utils/format'
import DeleteConfirmModal from './DeleteConfirmModal'

function FeedbackTable({ feedbacks, onEdit }) {
  const { deleteFeedback } = useFeedback()
  const [deleteTarget, setDeleteTarget] = useState(null)   // id cần xóa

  const handleDeleteConfirm = () => {
    deleteFeedback(deleteTarget)
    setDeleteTarget(null)
  }

  const ratingColor = (r) => {
    const n = Number(r)
    if (n >= 4) return 'success'
    if (n === 3) return 'warning'
    return 'danger'
  }

  return (
    <>
      <Card className="mb-4">
        <Card.Header><strong>Feedback Management</strong></Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>#</th><th>Course</th><th>Topic</th>
                <th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-3">
                    No feedbacks yet.
                  </td>
                </tr>
              ) : (
                feedbacks.map((fb, idx) => (
                  <tr key={fb.id}>
                    <td>{idx + 1}</td>
                    <td>{fb.course}</td>
                    <td>{fb.topic}</td>
                    <td>
                      <Badge bg={ratingColor(fb.rating)}>{fb.rating} ⭐</Badge>
                    </td>
                    <td>{fb.comment}</td>
                    <td>{formatDate(fb.date)}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-1"
                        onClick={() => onEdit(fb)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => setDeleteTarget(fb.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <DeleteConfirmModal
        show={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onHide={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default FeedbackTable
```

### `src/components/EditFeedbackModal.jsx`

> Tương tự `AddFeedbackForm` — lỗi validate hiển thị inline bằng `Form.Control.Feedback`,  
> không dùng `Alert`. Errors được track theo object `{ course, rating }`.

```jsx
import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'

function EditFeedbackModal({ show, feedback, onHide }) {
  const { editFeedback } = useFeedback()
  const [form, setForm] = useState({ course: '', topic: '', rating: '', comment: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (feedback) {
      setForm({
        course: feedback.course || '',
        topic: feedback.topic || '',
        rating: feedback.rating || '',
        comment: feedback.comment || '',
      })
      setErrors({})
    }
  }, [feedback])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.course.trim()) newErrors.course = 'Course name is required'
    const r = Number(form.rating)
    if (!form.rating || isNaN(r) || r < 1 || r > 5)
      newErrors.rating = 'Rating must be between 1 and 5'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    await editFeedback(feedback.id, { ...feedback, ...form })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-2 mb-2">
            <Col md={6}>
              <Form.Label>Course</Form.Label>
              <Form.Control
                name="course" value={form.course} onChange={handleChange}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Topic</Form.Label>
              <Form.Control name="topic" value={form.topic} onChange={handleChange} />
            </Col>
          </Row>
          <Row className="g-2 mb-3">
            <Col md={6}>
              <Form.Label>Rating (1–5)</Form.Label>
              <Form.Control
                type="number" name="rating" min="1" max="5"
                value={form.rating} onChange={handleChange}
                isInvalid={!!errors.rating}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rating}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Comment</Form.Label>
              <Form.Control name="comment" value={form.comment} onChange={handleChange} />
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditFeedbackModal
```

✅ **Checklist Bước 8:**
- [ ] `Header`: `useAuth()` lấy `user` và `logout` — **không dùng** `useSelector`
- [ ] `Header`: Logout gọi `logout()` từ context rồi `navigate('/login')`
- [ ] `AddFeedbackForm`: `<Form noValidate>` + `isInvalid={!!errors.field}` + `<Form.Control.Feedback>`
- [ ] `AddFeedbackForm`: `errors` là object `{}`, không phải string đơn — xóa lỗi từng field khi user gõ
- [ ] `AddFeedbackForm`: reset form về `INITIAL` + `setErrors({})` sau submit thành công
- [ ] `AddFeedbackForm`: toast success **tự tắt sau 3 giây** — dùng `useEffect` + `setTimeout`, có `clearTimeout` trong cleanup
- [ ] `AddFeedbackForm`: `date` lấy từ `getTodayFormatted()`, không để user nhập
- [ ] `DeleteConfirmModal`: nhận `show`, `onConfirm`, `onHide` — không nhận `id`
- [ ] `FeedbackTable`: click Delete → `setDeleteTarget(fb.id)`, **không dùng** `window.confirm`
- [ ] `FeedbackTable`: `DeleteConfirmModal` render bên ngoài `<Card>`, cùng cấp trong Fragment `<>`
- [ ] `FeedbackTable`: ngày hiển thị qua `formatDate()` → DD-MM-YYYY
- [ ] `EditFeedbackModal`: `<Form noValidate>` + `isInvalid` + `Form.Control.Feedback` — **không dùng** `Alert`
- [ ] `EditFeedbackModal`: `useEffect` reset cả `errors` về `{}` khi `feedback` prop thay đổi
- [ ] `EditFeedbackModal`: gọi `editFeedback(feedback.id, {...})` — truyền đủ 2 tham số

---

## BƯỚC 9 — Pages (10 phút)

### `src/pages/LoginPage.jsx`

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validate'

function LoginPage() {
  const { login, loading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validate client-side trước
    const err = validateLogin(email, password)
    if (err) { setLocalError(err); return }

    setLocalError(null)
    clearError()

    // 2. Gọi login từ context (trả về true/false)
    const success = await login({ email, password })
    if (success) navigate('/home')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}>
      <Card style={{ width: '420px' }}>
        <Card.Body className="p-4">
          <h4 className="text-center mb-1">🎓 Course Management System</h4>
          <p className="text-center text-muted mb-4">Please sign in to continue</p>

          {(localError || error) && (
            <Alert variant="danger">{localError || error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="student01@fpt.edu.vn"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
```

### `src/pages/HomePage.jsx`

```jsx
import { useEffect, useState } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddFeedbackForm from '../components/AddFeedbackForm'
import FeedbackTable from '../components/FeedbackTable'
import EditFeedbackModal from '../components/EditFeedbackModal'

function HomePage() {
  const { user } = useAuth()
  const { items, loading, error, fetchFeedbacks } = useFeedback()
  const [editTarget, setEditTarget] = useState(null)

  useEffect(() => {
    if (user) fetchFeedbacks(user.id)
  }, [user])

  return (
    <>
      <Header />
      <Container>
        {loading && (
          <div className="text-center my-5"><Spinner animation="border" /></div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && (
          <>
            <AddFeedbackForm />
            <FeedbackTable feedbacks={items} onEdit={setEditTarget} />
          </>
        )}
      </Container>
      <Footer />

      <EditFeedbackModal
        show={!!editTarget}
        feedback={editTarget}
        onHide={() => setEditTarget(null)}
      />
    </>
  )
}

export default HomePage
```

✅ **Checklist Bước 9:**
- [ ] `LoginPage`: input Email dùng `type="text"` (không phải `type="email"`)
- [ ] `LoginPage`: `login()` từ context trả về `true` → `navigate('/home')`
- [ ] `LoginPage`: hiển thị cả `localError` (validate) và `error` (từ context/API)
- [ ] `HomePage`: `useEffect` gọi `fetchFeedbacks(user.id)` đúng `userId` của user hiện tại
- [ ] `HomePage`: `editTarget` là state cục bộ — không cần đưa vào context
- [ ] `EditFeedbackModal` nhận `show={!!editTarget}` — false khi `editTarget` là null

---

## BƯỚC 10 — Kiểm tra cuối (5 phút)

### Luồng test đầy đủ

```
1.  Mở http://localhost:5173 → tự redirect /login ✓
2.  Submit form rỗng → "Email and password are required" ✓
3.  Email không có @ → "Email must contain @" ✓
4.  Đúng email, sai password → "Invalid email or password" ✓
5.  Đăng nhập: student01@fpt.edu.vn / 123456 → vào /home ✓
6.  Header: "Signed in as Nguyen Van An" ✓
7.  Bảng hiển thị 3 feedbacks của user 1 (không lẫn của user 2) ✓
8.  Tất cả ngày hiển thị dạng DD-MM-YYYY ✓
9.  Add feedback hợp lệ → xuất hiện trong bảng ngay, form reset ✓
10. Add: bỏ trống Course → "Course name is required" ✓
11. Add: Rating = 6 → "Rating must be between 1 and 5" ✓
12. Click Edit → Modal mở, dữ liệu đúng → Save → bảng cập nhật ✓
13. Click Delete → **DeleteConfirmModal** hiện ra → Cancel: đóng modal, không xóa ✓
14. Click Delete → Confirm Delete → xóa khỏi bảng, modal đóng ✓
15. Logout → redirect /login, không còn user trong context ✓
16. F5 sau khi login → vẫn ở /home (nhờ localStorage trong initialAuthState) ✓
```

✅ **Checklist cuối:**
- [ ] `npm start` chạy không lỗi
- [ ] Không có lỗi đỏ trong console trình duyệt
- [ ] Tất cả 16 test trên đều pass
- [ ] Không nộp thư mục `node_modules`
- [ ] Có file `readme.txt`

---

## Sơ đồ luồng dữ liệu

```
[LoginPage]
    │ nhập email + password
    │ gọi login() từ useAuth()
    ▼
[AuthContext]
    │ dispatch LOGIN_START
    │ gọi loginUser() từ authApi
    │ dispatch LOGIN_SUCCESS / LOGIN_FAIL
    │ lưu vào localStorage
    ▼
[authReducer]
    │ trả về state mới { user, loading, error }
    ▼
[PrivateRoute] ← đọc user từ useAuth()
    │ user tồn tại → render HomePage
    │ user null → redirect /login

[HomePage]
    │ useEffect → fetchFeedbacks(user.id) từ useFeedback()
    ▼
[FeedbackContext]
    │ dispatch FETCH_START
    │ gọi getFeedbacksByUser() từ feedbackApi
    │ dispatch FETCH_SUCCESS
    ▼
[feedbackReducer]
    │ trả về state { items, loading, error }
    ▼
[FeedbackTable] ← nhận feedbacks = items từ useFeedback()
```

---

## Lưu ý quan trọng khi thi

1. **Thứ tự Provider trong main.jsx:** `AuthProvider` bọc ngoài `FeedbackProvider` — vì FeedbackContext có thể cần AuthContext trong tương lai
2. **Không gọi API trong reducer** — reducer chỉ tính toán state mới, API gọi trong Context
3. **`login()` trả về `true/false`** — LoginPage dùng giá trị này để quyết định `navigate('/home')`
4. **`localStorage` trong `initialAuthState`** — giúp giữ session sau F5
5. **`type="text"` cho input Email** — không dùng `type="email"` để validate thủ công bằng `validateLogin`
6. **Date khi Add:** lấy từ `getTodayFormatted()`, không để user nhập
7. **Không nộp node_modules** — chỉ zip source code
