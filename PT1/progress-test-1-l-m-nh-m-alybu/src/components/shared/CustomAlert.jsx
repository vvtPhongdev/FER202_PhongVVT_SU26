import Alert from 'react-bootstrap/Alert'

export default function CustomAlert({ variant = 'info', children, dismissible = false, onClose, className = '' }) {
  return (
    <Alert variant={variant} dismissible={dismissible} onClose={onClose} className={className}>
      {children}
    </Alert>
  )
}
