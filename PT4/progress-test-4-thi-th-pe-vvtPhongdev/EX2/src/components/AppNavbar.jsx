import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

function AppNavbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  // TODO-03: implement handleLogout
  // 1. Call logoutUser() from AuthContext
  // 2. Call navigate('/login')
  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        {/* PROVIDED */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={about.logo} alt="logo" height={28} onError={(e) => { e.target.style.display = 'none' }} />
          <span className="fw-bold">{about.appName}</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="align-items-center gap-2 me-3">
            <Nav.Link as={Link} to="/" className="text-white">Movies</Nav.Link>
            <Nav.Link as={Link} to="/genres" className="text-white">Genres</Nav.Link>
          </Nav>
          {user && (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-white">{user.fullName}</span>
              <Badge bg="secondary">{user.role}</Badge>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
