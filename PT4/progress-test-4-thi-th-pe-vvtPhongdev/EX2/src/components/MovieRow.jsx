import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatPriceRange } from '../utils/format'
import ModalConfirm from './ModalConfirm'

function MovieRow({ movie, index, onDelete }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleDeleteConfirm = () => {
    onDelete(movie.id)
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.director}</td>
        <td>{movie.studio}</td>
        <td>{movie.releaseDate}</td>
        {/* PROVIDED */}
        <td>{formatPriceRange(movie.ticketPrice, movie.vipPrice)}</td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-1"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            View
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            Delete
          </Button>
        </td>
      </tr>
      <ModalConfirm
        show={showModal}
        title="Delete Movie"
        message={`Are you sure you want to delete "${movie.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}

export default MovieRow
