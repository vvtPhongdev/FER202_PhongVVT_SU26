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
