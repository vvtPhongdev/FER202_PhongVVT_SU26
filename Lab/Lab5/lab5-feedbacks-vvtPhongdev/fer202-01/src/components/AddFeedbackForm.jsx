import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL = { course: '', topic: '', rating: '', comment: '' }

function AddFeedbackForm() {
  const { user } = useAuth()
  const { addFeedback } = useFeedback()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return undefined

    const timer = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timer)
  }, [success])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
    setSuccess(false)
  }

  const validate = () => {
    const newErrors = {}

    if (!form.course.trim()) {
      newErrors.course = 'Course name is required'
    }

    const rating = Number(form.rating)
    if (!form.rating || isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await addFeedback({
      userId: user.id,
      course: form.course.trim(),
      topic: form.topic.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: getTodayFormatted(),
    })

    setForm(INITIAL)
    setErrors({})
    setSuccess(true)
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <strong>Add Feedback</strong>
      </Card.Header>
      <Card.Body>
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Feedback added successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-2 align-items-start">
            <Col md={3}>
              <Form.Control
                name="course"
                placeholder="Course (e.g. FER202)"
                value={form.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control
                name="topic"
                placeholder="Topic"
                value={form.topic}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                name="rating"
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={form.rating}
                onChange={handleChange}
                isInvalid={!!errors.rating}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rating}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control
                name="comment"
                placeholder="Comment"
                value={form.comment}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Button type="submit" variant="primary" className="w-100">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddFeedbackForm
