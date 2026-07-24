import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { login } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import { loginReducer, loginInitialState } from '../reducer/authReducer'

function Login() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(loginReducer, loginInitialState)
  const { username, password, validated, serverError } = state
  const [loading, setLoading] = useReducer((s, a) => a, false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_VALIDATED', payload: true })
    if (!username.trim() || !password.trim()) return
    setLoading(true)
    try {
      const user = await login(username, password)
      loginUser(user)
      navigate('/')
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <Card>
        <Card.Header className="bg-dark text-white text-center fw-bold">
          Cinema Management — Login
        </Card.Header>
        <Card.Body>
          {serverError && <Alert variant="danger">{serverError}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">Username is required.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" className="flex-fill" disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Login'}
              </Button>
              <Button variant="secondary" onClick={() => dispatch({ type: 'CANCEL' })}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
