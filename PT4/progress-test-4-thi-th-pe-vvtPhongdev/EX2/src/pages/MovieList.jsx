import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table, Form, Button, Row, Col, Spinner, Alert, Pagination } from 'react-bootstrap'
import { useMovie } from '../context/MovieContext'
import { deleteMovie } from '../api/movieApi'
import MovieRow from '../components/MovieRow'

// PROVIDED
const PAGE_SIZE = 5

// PROVIDED — no TODO here (search & filter are TODO-07)
function MovieList() {
  const { state, dispatch } = useMovie()
  const { movies, genres, loading, error } = state
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenreId, setSelectedGenreId] = useState('')

  // PROVIDED — pagination state (reset to 1 when implementing TODO-07 handlers)
  const [currentPage, setCurrentPage] = useState(1)

  const getGenreName = (genreId) => genres.find((g) => String(g.id) === String(genreId))?.name || ''
  const enriched = movies.map((b) => ({ ...b, genre: getGenreName(b.genreId) }))

  const filteredMovies = enriched.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenreId === '' || String(movie.genreId) === String(selectedGenreId)
    return matchesSearch && matchesGenre
  })

  // PROVIDED — pagination logic (works automatically on filteredMovies)
  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE) || 1
  const paged = filteredMovies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleDelete = async (id) => {
    await deleteMovie(id)
    dispatch({ type: 'DELETE_MOVIE', payload: id })
  }

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Movie List</h5>
        <Button variant="primary" size="sm" onClick={() => navigate('/add')}>+ Add Movie</Button>
      </div>
      <Row className="mb-3 g-2">
        <Col xs={12} md={4}>
          <Form.Select
            value={selectedGenreId}
            onChange={(e) => {
              setSelectedGenreId(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </Col>
      </Row>
      {loading && <Spinner animation="border" role="status" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <>
          <Table bordered hover>
            <thead className="table-light">
              <tr>
                <th>#</th><th>Title</th><th>Genre</th><th>Director</th>
                <th>Studio</th><th>Release Date</th><th>Ticket Price Range</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    No movies found.
                  </td>
                </tr>
              ) : (
                paged.map((b, idx) => (
                  <MovieRow
                    key={b.id}
                    movie={b}
                    index={(currentPage - 1) * PAGE_SIZE + idx}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </Table>
          {/* PROVIDED — Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-muted small">
              Showing {paged.length} of {filteredMovies.length} movies
            </span>
            {totalPages > 1 && (
              <Pagination className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                />
              </Pagination>
            )}
          </div>
        </>
      )}
    </Container>
  )
}

export default MovieList
