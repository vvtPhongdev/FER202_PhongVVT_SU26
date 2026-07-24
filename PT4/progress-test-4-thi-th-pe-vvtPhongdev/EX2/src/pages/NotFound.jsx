import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="mt-5 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Back Home
      </Button>
    </Container>
  )
}

export default NotFound
