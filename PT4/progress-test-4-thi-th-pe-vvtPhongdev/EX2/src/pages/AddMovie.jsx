import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { addMovie } from '../api/movieApi'
import { useMovie } from '../context/MovieContext'

const INITIAL = { title: '', genreId: '', director: '', studio: '', releaseDate: '', ticketPrice: '', vipPrice: '' }

// PROVIDED — no TODO here
function AddMovie() {
  const { state, dispatch } = useMovie()
  const { genres } = state
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim())       newErrors.title       = 'Title is required.'
    if (!form.genreId)            newErrors.genreId     = 'Genre is required.'
    if (!form.director.trim())      newErrors.director      = 'Director is required.'
    if (!form.studio.trim())   newErrors.studio   = 'Studio is required.'
    if (!form.releaseDate.trim()) newErrors.releaseDate = 'Release date is required.'
    if (!form.ticketPrice)          newErrors.ticketPrice   = 'Ticket price is required.'
    if (!form.vipPrice)         newErrors.vipPrice  = 'VIP price is required.'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      const newMovie = await addMovie({
        title: form.title,
        genreId: Number(form.genreId),
        director: form.director,
        studio: form.studio,
        releaseDate: form.releaseDate,
        ticketPrice: Number(form.ticketPrice),
        vipPrice: Number(form.vipPrice),
      })
      dispatch({ type: 'ADD_MOVIE', payload: newMovie })
      navigate('/')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <Button variant="secondary" size="sm" className="mb-3" onClick={() => navigate('/')}>
        Back to List
      </Button>
      <h5>Add New Movie</h5>
      {serverError && <Alert variant="danger">{serverError}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title" value={form.title} onChange={handleChange}
            placeholder="Enter movie title"
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genreId" value={form.genreId} onChange={handleChange}
            isInvalid={!!errors.genreId}
          >
            <option value="">-- Select genre --</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genreId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Director</Form.Label>
          <Form.Control
            name="director" value={form.director} onChange={handleChange}
            placeholder="Enter director"
            isInvalid={!!errors.director}
          />
          <Form.Control.Feedback type="invalid">{errors.director}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Studio</Form.Label>
          <Form.Control
            name="studio" value={form.studio} onChange={handleChange}
            placeholder="Enter studio"
            isInvalid={!!errors.studio}
          />
          <Form.Control.Feedback type="invalid">{errors.studio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Release Date (dd/MM/yyyy)</Form.Label>
          <Form.Control
            name="releaseDate" value={form.releaseDate} onChange={handleChange}
            placeholder="e.g. 01/01/2024"
            isInvalid={!!errors.releaseDate}
          />
          <Form.Control.Feedback type="invalid">{errors.releaseDate}</Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Ticket Price (VND)</Form.Label>
              <Form.Control
                type="number" name="ticketPrice" value={form.ticketPrice}
                onChange={handleChange} min={0}
                isInvalid={!!errors.ticketPrice}
              />
              <Form.Control.Feedback type="invalid">{errors.ticketPrice}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>VIP Price (VND)</Form.Label>
              <Form.Control
                type="number" name="vipPrice" value={form.vipPrice}
                onChange={handleChange} min={0}
                isInvalid={!!errors.vipPrice}
              />
              <Form.Control.Feedback type="invalid">{errors.vipPrice}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">Add Movie</Button>
      </Form>
    </Container>
  )
}

export default AddMovie
