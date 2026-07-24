import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

export default function NotFound() {
  // TODO-09: Thiết kế trang 404 — hiển thị mã lỗi 404, thông báo, và nút Back to Home
  return (
    <Container className="text-center py-5">
      {/* TODO-09: implement 404 page design */}
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead text-muted mb-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button as={Link} to="/" variant="primary">Back to Home</Button>
    </Container>
  )
}
