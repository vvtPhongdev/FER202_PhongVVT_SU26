import { useState } from 'react'
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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

    const validationError = validateLogin(email, password)
    if (validationError) {
      setLocalError(validationError)
      return
    }

    setLocalError(null)
    clearError()

    const success = await login({ email, password })
    if (success) navigate('/home')
  }

  const handleCancel = () => {
    setEmail('')
    setPassword('')
    setLocalError(null)
    clearError()
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Card style={{ width: '400px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#212529', fontSize: '2rem' }}>Login</h2>

          {(localError || error) && (
            <Alert variant="danger" className="py-2 small">{localError || error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '500', color: '#333' }}>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="student01@fpt.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: '#eef2f7',
                  border: '1px solid #ced4da',
                  padding: '10px 12px',
                  borderRadius: '6px'
                }}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label style={{ fontWeight: '500', color: '#333' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: '#eef2f7',
                  border: '1px solid #ced4da',
                  padding: '10px 12px',
                  borderRadius: '6px'
                }}
              />
            </Form.Group>
            <div className="mb-4">
              <small className="text-muted" style={{ fontSize: '0.85rem' }}>(at least 6 characters)</small>
            </div>
            <div className="d-flex justify-content-between gap-3">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '6px',
                  backgroundColor: '#0d6efd',
                  border: 'none',
                  fontWeight: '500'
                }}
              >
                {loading ? <Spinner size="sm" animation="border" /> : 'Login'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '6px',
                  backgroundColor: '#6c757d',
                  border: 'none',
                  fontWeight: '500'
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
