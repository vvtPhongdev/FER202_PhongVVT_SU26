import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { fetchGenres, fetchMovies, addGenre, deleteGenre } from '../api/movieApi'
import { genreFormReducer, formInitialState } from '../reducer/genreReducer'
import ModalConfirm from '../components/ModalConfirm'
import GenreList from '../components/GenreList'

function ManageGenres() {
  const navigate = useNavigate()
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formState, formDispatch] = useReducer(genreFormReducer, formInitialState)
  const { newName } = formState
  const [addError, setAddError] = useState(null)
  const [genreToDelete, setGenreToDelete] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    Promise.all([fetchGenres(), fetchMovies()])
      .then(([genreData, movieData]) => {
        setGenres(genreData)
        setMovies(movieData)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // PROVIDED — Add genre
  const handleAdd = async (e) => {
    e.preventDefault()
    const trimmed = newName.trim()
    if (!trimmed) {
      setAddError('Genre name is required.')
      return
    }
    const isDuplicate = genres.some((g) => g.name.toLowerCase() === trimmed.toLowerCase())
    if (isDuplicate) {
      setAddError('Genre name already exists.')
      return
    }
    try {
      const created = await addGenre({ name: trimmed })
      setGenres((prev) => [...prev, created])
      formDispatch({ type: 'RESET' })
      setAddError(null)
    } catch (err) {
      setAddError(err.message)
    }
  }

  // PROVIDED
  const handleDeleteRequest = (genre) => {
    setDeleteError(null)
    setGenreToDelete(genre)
  }

  // TODO-10: handleDeleteConfirm
  // 1. if (!genreToDelete) return
  // 2. Check if genre is in use: movies.some(b => String(b.genreId) === String(genreToDelete.id))
  // 3. If in use → setDeleteError(`Cannot delete "${genreToDelete.name}" — it is currently assigned to movies.`)
  //             → setGenreToDelete(null) → return
  // 4. Otherwise → try { await deleteGenre(genreToDelete.id)
  //                       setGenres(prev => prev.filter(g => g.id !== genreToDelete.id))
  //                     } catch(err) { setError(err.message) }
  //                     finally { setGenreToDelete(null) }
  const handleDeleteConfirm = async () => {
    // TODO-10
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <Button variant="secondary" size="sm" className="mb-3" onClick={() => navigate('/')}>
        ← Back to List
      </Button>
      <h5 className="fw-bold">Manage Genres</h5>

      {error && <Alert variant="danger">{error}</Alert>}
      {deleteError && (
        <Alert variant="warning" dismissible onClose={() => setDeleteError(null)}>
          {deleteError}
        </Alert>
      )}
      {loading && <Spinner animation="border" />}

      {!loading && (
        <>
          {/* PROVIDED — Add genre form */}
          <Form onSubmit={handleAdd} className="mb-4" noValidate>
            <Form.Label className="mb-1">New Genre Name</Form.Label>
            <div className="d-flex gap-2 align-items-start">
              <div className="flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="e.g. Thriller"
                  value={newName}
                  onChange={(e) => {
                    formDispatch({ type: 'SET_NAME', payload: e.target.value })
                    if (addError) setAddError(null)
                  }}
                  isInvalid={!!addError}
                />
                <Form.Control.Feedback type="invalid">{addError}</Form.Control.Feedback>
              </div>
              <Button type="submit" variant="primary">Add</Button>
            </div>
          </Form>

          <GenreList genres={genres} onDeleteRequest={handleDeleteRequest} />
        </>
      )}

      {/* PROVIDED */}
      <ModalConfirm
        show={!!genreToDelete}
        title="Delete Genre"
        message={`Are you sure you want to delete "${genreToDelete?.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setGenreToDelete(null)}
      />
    </Container>
  )
}

export default ManageGenres
