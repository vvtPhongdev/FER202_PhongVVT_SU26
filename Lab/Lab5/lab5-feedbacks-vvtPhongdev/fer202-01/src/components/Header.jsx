import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar bg="white" className="border-bottom py-3 mb-4">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '1.25rem', color: '#212529' }}>
          <img
            src="/logo.jpg"
            alt="Logo"
            height="40"
            style={{ objectFit: 'contain' }}
          />
          <span>Course Management System</span>
        </Navbar.Brand>
        <div className="ms-auto d-flex align-items-center gap-3">
          {user && (
            <>
              <span className="text-muted" style={{ fontSize: '0.95rem' }}>
                Signed in as <strong className="text-dark">{user.fullName}</strong>
              </span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
                style={{
                  color: '#dc3545',
                  borderColor: '#dc3545',
                  borderRadius: '4px',
                  padding: '4px 12px',
                  fontWeight: '500',
                  backgroundColor: 'transparent'
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
