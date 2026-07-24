import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Container>
      <div className="text-center py-5">
        <h1 className="display-4">🍜 Nhà Hàng Việt</h1>
        <p className="lead text-muted">
          Ẩm thực truyền thống Việt Nam – Đặt bàn và xem thực đơn ngay hôm nay
        </p>
      </div>

      <Row className="g-4 mt-2">
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center py-4">
              <div style={{ fontSize: '3rem' }}>🍽️</div>
              <Card.Title className="mt-3 h4">Thực Đơn</Card.Title>
              <Card.Text className="text-muted">
                Khám phá các món ăn đặc sắc. Thêm hoặc xóa món, tìm kiếm theo tên.
              </Card.Text>
              <Button as={Link} to="/menu" variant="primary">
                Xem Thực Đơn
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center py-4">
              <div style={{ fontSize: '3rem' }}>🪑</div>
              <Card.Title className="mt-3 h4">Bàn Ăn</Card.Title>
              <Card.Text className="text-muted">
                Kiểm tra trạng thái các bàn trong nhà hàng. Biết bàn nào còn trống.
              </Card.Text>
              <Button as={Link} to="/tables" variant="success">
                Xem Bàn Ăn
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-5 p-4 bg-light rounded">
        <h5>💡 Về Lab này</h5>
        <p className="mb-0 text-muted">
          Lab demo <strong>Code Splitting với React.lazy() và Suspense</strong>.
          Các trang <em>Thực Đơn</em> và <em>Bàn Ăn</em> được lazy-load — chỉ tải
          khi user điều hướng đến. Mở <em>Network tab</em> trong DevTools để thấy
          các file chunk được tải riêng biệt.
        </p>
      </div>
    </Container>
  )
}

export default HomePage
