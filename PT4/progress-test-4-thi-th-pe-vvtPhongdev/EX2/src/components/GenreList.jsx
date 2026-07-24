import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function GenreList({ genres, onDeleteRequest }) {
  const navigate = useNavigate()

  return (
    <Table bordered hover size="sm">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Genre Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {genres.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center text-muted">No genres found</td>
          </tr>
        ) : (
          genres.map((genre, idx) => (
            <tr key={genre.id}>
              <td>{idx + 1}</td>
              <td>{genre.name}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-1"
                  onClick={() => navigate(`/genres/${genre.id}`)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDeleteRequest(genre)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default GenreList
