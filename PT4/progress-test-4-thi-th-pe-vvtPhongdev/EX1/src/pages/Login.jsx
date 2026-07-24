import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { login } from '../api/authApi'
import { loginReducer, loginInitialState } from '../reducer/authReducer'
import { validateUsername, validatePassword } from '../utils/validate'

export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState)
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const { username, password, serverError, validated } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    dispatch({ type: 'SET_VALIDATED', payload: true })
    if (!form.checkValidity()) return
    try {
      const user = await login(username, password)
      loginUser(user)
      navigate('/')
    } catch (err) {
      // TODO-01: dispatch SET_ERROR với err.message để hiển thị Alert lỗi
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  const handleCancel = () => dispatch({ type: 'CANCEL' })

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Admin Login
            </Card.Header>
            <Card.Body>
              {serverError && (
                <Alert
                  variant="danger"
                  role="alert"
                  dismissible
                  onClose={() => dispatch({ type: 'SET_ERROR', payload: '' })}
                >
                  {serverError}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      dispatch({ type: 'SET_USERNAME', payload: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {validateUsername(username) ?? 'Username is required.'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {validatePassword(password) ?? 'Password is required.'}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" className="flex-grow-1">
                    Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="flex-grow-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
