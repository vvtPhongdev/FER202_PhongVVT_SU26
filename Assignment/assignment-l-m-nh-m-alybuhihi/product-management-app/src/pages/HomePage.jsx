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
