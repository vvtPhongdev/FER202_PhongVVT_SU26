/**
 * LoginForm.jsx – Form đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy login, loading, error.
 *       Local state (useState) cho email và password chỉ dùng trong component này.
 *
 *       Render:
 *         - Input email (có label, id="email")
 *         - Input password (có label, id="password")
 *         - Hiển thị error nếu có
 *         - Nút "Đăng nhập" (disabled khi loading, hiện text loading khi đang xử lý)
 *
 *       Khi submit: gọi login(email, password)
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useState } from 'react'
import { Form, Button, Card, Spinner } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import CustomAlert from '../shared/CustomAlert'

export default function LoginForm() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate email format locally before calling login
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      setLocalError('Email không hợp lệ')
      return
    }
    setLocalError('')
    login(email, password)
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 420 }}>
      <Card.Body>
        <h3 className="text-center mb-4">Đăng nhập</h3>

        {localError && <CustomAlert variant="danger">{localError}</CustomAlert>}
        {error && <CustomAlert variant="danger">{error}</CustomAlert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="nhập email của bạn"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setLocalError('') }}
              required
              isInvalid={!!localError}
            />
            <Form.Control.Feedback type="invalid">
              {localError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Đang đăng nhập...
                </>
              ) : 'Đăng nhập'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

