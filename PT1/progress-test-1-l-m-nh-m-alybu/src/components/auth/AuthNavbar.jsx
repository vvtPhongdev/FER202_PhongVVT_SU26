/**
 * AuthNavbar.jsx – Thanh điều hướng hiển thị thông tin đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user và logout.
 *       Nếu user tồn tại:  hiển thị tên user và nút "Đăng xuất"
 *       Nếu chưa đăng nhập: hiển thị "Chưa đăng nhập"
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

export default function AuthNavbar() {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <Navbar.Brand>Auth System</Navbar.Brand>
        <div>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="me-3">Xin chào, {user.name}</span>
              <Button variant="outline-danger" size="sm" onClick={logout}>Đăng xuất</Button>
            </div>
          ) : (
            <span className="text-muted">Chưa đăng nhập</span>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

