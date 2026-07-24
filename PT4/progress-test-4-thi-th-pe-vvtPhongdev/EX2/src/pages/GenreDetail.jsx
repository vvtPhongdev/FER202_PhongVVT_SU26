import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Spinner, Table, Badge } from 'react-bootstrap'
import { fetchGenres, fetchMovies } from '../api/movieApi'

function GenreDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [genre, setGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // TODO-09: Use Promise.all([fetchGenres(), fetchMovies()]) to fetch both concurrently.
      //          Find genre: genres.find(g => String(g.id) === String(id))
      //          If not found → navigate('/not-found', { replace: true }) then return.
      //          Filter movies: allMovies.filter(b => String(b.genreId) === String(id))
      //          On success: setGenre(found), setMovies(filtered).
      //          Finally: setLoading(false).
    }
    load()
  }, [id])

  // TODO-09: if loading → return <Container className="mt-4"><Spinner animation="border" role="status" /></Container>
  if (loading) return null

  // TODO-09: if !genre → return null  (safety while navigating)
  if (!genre) return null

  return (
    <Container className="mt-4" style={{ maxWidth: 700 }}>
      {/* TODO-09: <Button> onClick={() => navigate('/genres')} — text "← Back to Genres" */}

      {/* TODO-09: <Card> showing:
            Card.Header: "Genre Detail"
            Card.Body:
              <p><strong>Name:</strong> <Badge bg="primary">{genre.name}</Badge></p>
              <p><strong>Total Movies:</strong> {movies.length}</p>
      */}

      {/* TODO-09: <Table bordered hover size="sm">
            Columns: #, Title, Director, Studio, Release Date
            If movies.length === 0 → colSpan row "No movies in this genre"
            Else → movies.map(...)
      */}
    </Container>
  )
}

export default GenreDetail
