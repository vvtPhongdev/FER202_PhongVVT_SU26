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
