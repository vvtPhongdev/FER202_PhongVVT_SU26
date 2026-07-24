import { Spinner } from 'react-bootstrap'

function LoadingSpinner({ message = 'Đang tải...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3 text-muted">{message}</p>
    </div>
  )
}

export default LoadingSpinner
