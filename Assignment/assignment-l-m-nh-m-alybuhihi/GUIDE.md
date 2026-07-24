# 📖 GUIDE — Hướng dẫn Step-by-Step từng TODO

> Đọc [README.md](./README.md) trước để nắm yêu cầu, cấu trúc dự án và quy trình Git.
> Mỗi TODO bên dưới: tạo issue → tạo branch → code theo hướng dẫn → commit → PR.

---

## TODO-01: Setup Project (0.5đ)

**Branch:** `chore/TODO-01-setup-project`

### Bước 1 — Tạo project Vite

```bash
npm create vite@latest product-management-app -- --template react
cd product-management-app
npm install
```

### Bước 2 — Cài dependencies

```bash
npm install axios react-router-dom react-bootstrap bootstrap
npm install -D json-server@0.17.4 concurrently
```

### Bước 3 — Thêm scripts vào `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001",
    "start": "concurrently \"npm run server\" \"npm run dev\"",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Bước 4 — Tạo `db.json` ở thư mục gốc

```json
{
  "products": [
    {
      "id": "1",
      "name": "Laptop LG Gram 2023 14ZD90R-G.AX52A5",
      "description": "Intel core i5-1340P, Ram 8GB, SSD 256GB, Màn Hình 14 inch WUXGA, Siêu mỏng, siêu nhẹ",
      "price": "25.990.000",
      "currentPrice": "20.990.000",
      "image": "laptop1.png"
    },
    {
      "id": "2",
      "name": "Laptop ACER Aspire 3 A315-59-51X8",
      "description": "Intel Core i5-1235U, Ram 8GB, SSD 512GB, màn hình 15.6 inch FHD, Win 11 bản quyền, màu bạc, chính hãng, bảo hành 12 tháng",
      "price": "17.990.000",
      "currentPrice": "11.990.000",
      "image": "laptop2.jpg"
    },
    {
      "id": "3",
      "name": "Laptop Dell Vostro 5630 i5P085W11GRU",
      "description": "Intel i5-1340P, Ram 8GB DDR5, SSD 512GB, Màn Hình 16 Inch FHD+, VGA Intel Iris Xe, Windows 11 Home, Office HS 2021 bản quyền, vỏ nhôm",
      "price": "23.190.000",
      "currentPrice": "19.990.000",
      "image": "laptop3.png"
    },
    {
      "id": "4",
      "name": "Laptop MSI Katana 15 B13VEK-252VN",
      "description": "i7-13620H, Ram 8GB, SSD 512GB, màn hình 15.6inch FHD 144Hz, VGA 4050 6GB, Win 11 bản quyền, bảo hành 24 tháng.",
      "price": "24.990.000",
      "currentPrice": "22.990.000",
      "image": "laptop4.png"
    },
    {
      "id": "5",
      "name": "Laptop ASUS TUF Gaming F15 FX507ZC4-HN099W",
      "description": "i7-12700H, Ram 8GB, SSD 512GB, RTX 3050 4GB, Màn hình 15.6 FHD 144Hz IPS, Win 11, Hàng chính hãng, Bảo hành 24 tháng.",
      "price": "26.990.000",
      "currentPrice": "23.490.000",
      "image": "laptop5.jpg"
    },
    {
      "id": "6",
      "name": "LAPTOP ASUS VIVOBOOK A1505VA-L1114W",
      "description": "Core i5 13500H, Ram 16GB, 512GB SSD, màn hình 15.6inch FHD OLED, Windows 11 Home bản quyền, màu đen.",
      "price": "20.990.000",
      "currentPrice": "17.190.000",
      "image": "laptop6.png"
    },
    {
      "id": "7",
      "name": "Laptop Acer Predator Helios Neo PHN16-71-7460",
      "description": "Intel i7-13700HX, RAM 8GB, SSD 512GB, RTX 4050 6GB, Màn Hình 16inch QHD 165Hz 100% sRGB, Windows 11",
      "price": "38.990.000",
      "currentPrice": "38.490.000",
      "image": "laptop7.jpg"
    },
    {
      "id": "8",
      "name": "Laptop MSI Modern 14 C7M 220VN",
      "description": "AMD R5 7530U, Ram 8GB, SSD 512GB, Màn Hình 14.0inch FHD IPS, Windows 11, Đen",
      "price": "12.990.000",
      "currentPrice": "10.990.000",
      "image": "laptop8.jpg"
    },
    {
      "id": "9",
      "name": "Laptop Gaming Acer Nitro 5 Tiger AN515-58-773Y",
      "description": "i7-12700H, Ram 8GB, SSD 512GB, RTX 3050Ti 4GB, 15.6 inch FHD, Windows 11",
      "price": "31.990.000",
      "currentPrice": "25.490.000",
      "image": "laptop9.png"
    },
    {
      "id": "10",
      "name": "Laptop Acer Swift 3 SF314-512-56QN",
      "description": "Core i5-1240P, Ram 16GB, SSD 512GB, màn hình 14 inch QHD IPS, Win 11 bản quyền, màu bạc",
      "price": "21.990.000",
      "currentPrice": "17.490.000",
      "image": "laptop10.png"
    }
  ]
}
```

### Bước 5 — Copy ảnh

Copy 10 file ảnh laptop (thư mục `Images` của đề bài) vào `public/images/`.

### Bước 6 — Sửa `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

Xóa `src/App.css`, `src/index.css` và các import liên quan trong `App.jsx` (dùng Bootstrap thay thế).

### Bước 7 — Kiểm tra

```bash
npm start
```

- `http://localhost:3001/products` → trả về JSON 10 sản phẩm ✅
- `http://localhost:5173` → app React chạy ✅

**Commit:**

```bash
git add . && git commit -m "chore(TODO-01): setup vite project with json-server and dependencies"
```

---

## TODO-02: Service `getProducts()` (0.5đ)

**Branch:** `feature/TODO-02-get-products-service`

### Tạo `src/services/productService.js`

```js
import axios from 'axios'

const API_URL = 'http://localhost:3001/products'

// TODO-02: GET danh sách sản phẩm
export const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
```

**Giải thích:**

- `axios.get(API_URL)` trả về Promise chứa response; dữ liệu thật nằm trong `response.data`.
- Dùng `async/await` để code dễ đọc. Lỗi (network, 404…) sẽ throw ra ngoài — component gọi hàm này sẽ `try/catch`.

**Commit:** `feat(TODO-02): add getProducts service with axios`

---

## TODO-03: Component `ProductCard` (0.75đ)

**Branch:** `feature/TODO-03-product-card`

### Tạo `src/components/ProductCard.jsx`

```jsx
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// TODO-03: Card hiển thị 1 sản phẩm
function ProductCard({ product, onDelete }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`/images/${product.image}`}
        alt={product.name}
        style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem' }}>{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="mb-2">
          <span className="text-decoration-line-through text-muted me-2">
            {product.price} đ
          </span>
          <span className="text-danger fw-bold">{product.currentPrice} đ</span>
        </div>
        <div className="d-flex gap-2">
          <Button
            as={Link}
            to={`/products/${product.id}`}
            variant="primary"
            size="sm"
            className="flex-grow-1"
          >
            View Detail
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
```

**Giải thích:**

- `product` và `onDelete` nhận qua **props** — card không tự quản lý dữ liệu.
- Giá gốc gạch ngang (`text-decoration-line-through`), giá hiện tại màu đỏ.
- Nút Delete chỉ **gọi callback** `onDelete(product.id)` — logic xóa nằm ở cha (TODO-07).
- `Button as={Link}` biến nút thành link điều hướng (dùng cho TODO-08).

**Commit:** `feat(TODO-03): create ProductCard component with price display`

---

## TODO-04: `ProductList` + fetch data + loading/error (1.25đ)

**Branch:** `feature/TODO-04-product-list-fetch`

### Bước 1 — Tạo `src/components/ProductList.jsx`

```jsx
import { Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'

// TODO-04: Render grid danh sách sản phẩm
function ProductList({ products, onDelete }) {
  if (products.length === 0) {
    return <p className="text-center text-muted">No products found.</p>
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  )
}

export default ProductList
```

### Bước 2 — Tạo `src/pages/HomePage.jsx`

```jsx
import { useState, useEffect } from 'react'
import { Container, Alert, Spinner } from 'react-bootstrap'
import { getProducts } from '../services/productService'
import ProductList from '../components/ProductList'

// TODO-04: Fetch data từ API, xử lý loading + error
function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng kiểm tra API server!')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDelete = (id) => {
    // TODO-07 sẽ hoàn thiện hàm này
    console.log('delete', id)
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading products...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">🛒 Product List</h2>
      <ProductList products={products} onDelete={handleDelete} />
    </Container>
  )
}

export default HomePage
```

### Bước 3 — Sửa `src/App.jsx` (tạm thời, TODO-08 sẽ thêm routes)

```jsx
import HomePage from './pages/HomePage'

function App() {
  return <HomePage />
}

export default App
```

### Bước 4 — Kiểm tra

- Chạy `npm run dev:full` → thấy grid 10 sản phẩm.
- **Tắt json-server** rồi reload → thấy Alert đỏ báo lỗi ✅ (yêu cầu bắt buộc của đề).

**Commit:** `feat(TODO-04): fetch and render product list with loading and error states`

---

## TODO-05: Form thêm sản phẩm — controlled inputs (1.0đ)

**Branch:** `feature/TODO-05-add-product-form`

### Tạo `src/components/AddProductForm.jsx`

```jsx
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

// TODO-05: Form controlled inputs + validate
function AddProductForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
  })
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      setValidated(true)
      return
    }

    onAdd({ ...formData, image: 'laptop1.png' })

    // Reset form sau khi submit
    setFormData({ name: '', description: '', price: '', currentPrice: '' })
    setValidated(false)
  }

  return (
    <Card className="mb-4">
      <Card.Header>➕ Add New Product</Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            <Form.Control.Feedback type="invalid">
              Name is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 25.990.000"
            />
            <Form.Control.Feedback type="invalid">
              Price is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Current Price</Form.Label>
            <Form.Control
              required
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              placeholder="e.g. 20.990.000"
            />
            <Form.Control.Feedback type="invalid">
              Current price is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success">
            Add Product
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddProductForm
```

**Giải thích:**

- **Controlled input:** `value` lấy từ state, `onChange` cập nhật state — React kiểm soát hoàn toàn giá trị.
- Một `handleChange` dùng chung cho 4 field nhờ `name` attribute + computed property `[name]: value`.
- Validate bằng HTML5 `required` + React-Bootstrap `validated` để hiện feedback.
- Sau submit hợp lệ: gọi `onAdd(...)` rồi **reset state về rỗng**.

**Commit:** `feat(TODO-05): create AddProductForm with controlled inputs and validation`

---

## TODO-06: POST thêm sản phẩm vào API (1.0đ)

**Branch:** `feature/TODO-06-add-product-api`

### Bước 1 — Thêm vào `src/services/productService.js`

```js
// TODO-06: POST thêm sản phẩm mới
export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product)
  return response.data
}
```

### Bước 2 — Cập nhật `src/pages/HomePage.jsx`

Thêm import và hàm `handleAdd`, render form:

```jsx
import { getProducts, addProduct } from '../services/productService'
import AddProductForm from '../components/AddProductForm'
```

```jsx
  const handleAdd = async (newProduct) => {
    try {
      const created = await addProduct(newProduct)
      // Cập nhật state — KHÔNG mutate mảng cũ, tạo mảng mới
      setProducts((prev) => [...prev, created])
    } catch (err) {
      alert('Thêm sản phẩm thất bại!')
    }
  }
```

Trong JSX của `HomePage`, đặt form phía trên danh sách:

```jsx
  return (
    <Container className="py-4">
      <h2 className="mb-4">🛒 Product List</h2>
      <AddProductForm onAdd={handleAdd} />
      <ProductList products={products} onDelete={handleDelete} />
    </Container>
  )
```

**Giải thích:**

- json-server tự sinh `id` cho object POST lên và trả về object hoàn chỉnh trong `response.data`.
- `setProducts((prev) => [...prev, created])` — dùng spread tạo mảng **mới** để React re-render (immutability).

### Kiểm tra

Điền form → Add → sản phẩm mới xuất hiện cuối danh sách, mở `db.json` thấy dữ liệu được lưu ✅

**Commit:** `feat(TODO-06): add product via POST request and update state`

---

## TODO-07: DELETE xóa sản phẩm (1.0đ)

**Branch:** `feature/TODO-07-delete-product`

### Bước 1 — Thêm vào `src/services/productService.js`

```js
// TODO-07: DELETE xóa sản phẩm theo id
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}
```

### Bước 2 — Hoàn thiện `handleDelete` trong `HomePage.jsx`

```jsx
import { getProducts, addProduct, deleteProduct } from '../services/productService'
```

```jsx
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return
    try {
      await deleteProduct(id)
      // Lọc bỏ sản phẩm vừa xóa khỏi state
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert('Xóa sản phẩm thất bại!')
    }
  }
```

**Giải thích:**

- Xóa theo **id duy nhất** (đề yêu cầu) — không xóa theo index để tránh xóa nhầm.
- `filter` tạo mảng mới không chứa sản phẩm bị xóa → React re-render.
- `window.confirm` tránh xóa nhầm do click.

### Kiểm tra

Click Delete → confirm → sản phẩm biến mất khỏi UI và `db.json` ✅

**Commit:** `feat(TODO-07): implement delete product with confirmation`

---

## TODO-08: React Router + trang chi tiết sản phẩm (1.0đ)

**Branch:** `feature/TODO-08-product-detail-routing`

### Bước 1 — Thêm vào `src/services/productService.js`

```js
// TODO-08: GET 1 sản phẩm theo id
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
```

### Bước 2 — Cấu hình routes trong `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import EditProductPage from './pages/EditProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
    </Routes>
  )
}

export default App
```

### Bước 3 — Tạo `src/pages/ProductDetailPage.jsx`

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import { getProductById } from '../services/productService'

// TODO-08: Trang chi tiết sản phẩm
function ProductDetailPage() {
  const { id } = useParams() // Lấy id từ URL /products/:id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Không tìm thấy sản phẩm!')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/" variant="secondary">← Back to List</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        ← Back to List
      </Button>
      <Row>
        <Col md={5}>
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="img-fluid border rounded p-3"
          />
        </Col>
        <Col md={7}>
          <h3>{product.name}</h3>
          <Badge bg="secondary" className="mb-3">ID: {product.id}</Badge>
          <p className="text-muted">{product.description}</p>
          <p>
            <span className="text-decoration-line-through text-muted me-3">
              {product.price} đ
            </span>
            <span className="text-danger fs-4 fw-bold">
              {product.currentPrice} đ
            </span>
          </p>
          <Button as={Link} to={`/products/${product.id}/edit`} variant="warning">
            ✏️ Edit
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailPage
```

**Giải thích:**

- `useParams()` lấy `:id` từ URL — đây là cách truyền tham số qua route.
- `useEffect` phụ thuộc `[id]`: nếu id đổi thì fetch lại.
- Nút Edit điều hướng sang `/products/:id/edit` (TODO-09).

> Tạm thời tạo file `src/pages/EditProductPage.jsx` rỗng (return `null`) để app không lỗi import, TODO-09 sẽ hoàn thiện.

### Kiểm tra

Click "View Detail" trên card → URL đổi thành `/products/1` → hiển thị chi tiết ✅
Truy cập `/products/999` → hiển thị lỗi "Không tìm thấy sản phẩm!" ✅

**Commit:** `feat(TODO-08): setup react router and product detail page`

---

## TODO-09: Trang Edit + PUT cập nhật sản phẩm (1.0đ)

**Branch:** `feature/TODO-09-edit-product`

### Bước 1 — Thêm vào `src/services/productService.js`

```js
// TODO-09: PUT cập nhật sản phẩm
export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product)
  return response.data
}
```

### Bước 2 — Tạo `src/pages/EditProductPage.jsx`

```jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap'
import { getProductById, updateProduct } from '../services/productService'

// TODO-09: Trang chỉnh sửa sản phẩm
function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // Pre-fill form với dữ liệu hiện tại của sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setFormData(data)
        setError(null)
      } catch (err) {
        setError('Không tìm thấy sản phẩm!')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await updateProduct(id, formData)
      // Update thành công → quay về trang chi tiết
      navigate(`/products/${id}`)
    } catch (err) {
      setError('Cập nhật sản phẩm thất bại. Vui lòng thử lại!')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Button as={Link} to={`/products/${id}`} variant="outline-secondary" className="mb-4">
        ← Back to Detail
      </Button>
      <Card>
        <Card.Header>✏️ Edit Product #{id}</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Current Price</Form.Label>
              <Form.Control
                required
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EditProductPage
```

**Giải thích:**

- Fetch dữ liệu cũ → **pre-fill** vào form (đưa thẳng object vào state `formData`).
- `updateProduct(id, formData)` gửi **PUT** — thay thế toàn bộ object trên server.
- Thành công → `navigate(`/products/${id}`)` quay về trang chi tiết; trang này fetch lại nên hiển thị **dữ liệu mới** (đúng yêu cầu đề).
- Thất bại → hiển thị Alert lỗi, không rời trang (đúng yêu cầu xử lý lỗi của đề).

### Kiểm tra

1. Vào chi tiết sản phẩm → Edit → sửa tên → Save → quay về chi tiết với tên mới ✅
2. Tắt json-server → Save → hiện Alert lỗi ✅

**Commit:** `feat(TODO-09): implement edit product page with PUT request`

---

## Hoàn tất

Sau khi merge đủ 9 TODO, kiểm tra lại toàn bộ **Checklist hoàn thành** trong [README.md](./README.md) và test API theo [TESTING_GUIDE.md](./TESTING_GUIDE.md) trước khi nộp bài.
