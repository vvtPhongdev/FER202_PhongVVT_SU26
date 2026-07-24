/**
 * Dashboard.jsx – Màn hình sau khi đăng nhập thành công (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user.
 *       Hiển thị thông tin: tên, email, vai trò của user.
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { Card, Badge, ListGroup } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

const formatZws = (str) => {
  if (typeof str !== 'string') return str
  return str.split('').join('\u200B')
}

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Card style={{ maxWidth: 560 }} className="mx-auto">
      <Card.Body>
        <h2 className="text-center text-success mb-1">Dashboard</h2>
        <h6 className="text-center text-muted mb-4">Rất vui được gặp lại bạn!</h6>

        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Tên:</strong>
            <span>{formatZws(user.name)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Email:</strong>
            <span>{formatZws(user.email)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Vai trò:</strong>
            <Badge bg="primary">{formatZws(user.role)}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}


