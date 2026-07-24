import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, isAuthenticated, logoutUser } = useAuth()
  const navigate = useNavigate()

  // TODO-03: handleLogout — gọi logoutUser() và navigate('/login')
  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={about.logo} alt="logo" width="30" height="30" className="me-2"
            onError={(e) => { e.target.style.display = 'none' }} />
          {about.appName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/car-types">Manage Car Types</Nav.Link>
            )}
          </Nav>
          {isAuthenticated && user && (
            <Nav className="align-items-center gap-2">
              {/* TODO-02: Hiển thị user.email (bold white) và user.role trong Badge */}
              <span className="text-white fw-bold">{user.email}</span>
              <Badge bg="info">{user.role}</Badge>
              {/* TODO-03: Nút Logout gọi handleLogout */}
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
