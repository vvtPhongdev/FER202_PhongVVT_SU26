import { useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL = { course: '', topic: '', rating: '', comment: '' }

function FeedbackForm({ editTarget, onClearEdit }) {
  const { user } = useAuth()
  const { addFeedback, editFeedback } = useFeedback()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (editTarget) {
      setForm({
        course: editTarget.course || '',
        topic: editTarget.topic || '',
        rating: editTarget.rating || '',
        comment: editTarget.comment || '',
      })
      setErrors({})
      setSuccess(false)
    } else {
      setForm(INITIAL)
      setErrors({})
    }
  }, [editTarget])

  useEffect(() => {
    if (!success) return
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
    if (!form.course.trim()) newErrors.course = 'Course name is required'
    const r = Number(form.rating)
    if (!form.rating || isNaN(r) || r < 1 || r > 5) {
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

    if (editTarget) {
      await editFeedback(editTarget.id, {
        ...editTarget,
        course: form.course.trim(),
        topic: form.topic.trim(),
        rating: form.rating,
        comment: form.comment.trim(),
      })
      setForm(INITIAL)
      setErrors({})
      onClearEdit()
    } else {
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
  }

  const isEdit = !!editTarget

  return (
    <Card className="mb-4" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
      <Card.Body className="p-4">
        <h4 className="mb-4" style={{ fontWeight: '600', color: '#212529' }}>
          {isEdit ? 'Edit Feedback' : 'Add Feedback'}
        </h4>
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible className="py-2 small">
            Feedback added successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Course</Form.Label>
            <Form.Control
              name="course"
              value={form.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
              style={{ borderRadius: '6px' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Topic</Form.Label>
            <Form.Control
              name="topic"
              value={form.topic}
              onChange={handleChange}
              style={{ borderRadius: '6px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500' }}>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              isInvalid={!!errors.rating}
              style={{ borderRadius: '6px' }}
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '500' }}>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={form.comment}
              onChange={handleChange}
              style={{ borderRadius: '6px' }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{
              padding: '10px 24px',
              borderRadius: '6px',
              backgroundColor: '#0d6efd',
              border: 'none',
              fontWeight: '500'
            }}
          >
            {isEdit ? 'Save' : 'Add Feedback'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default FeedbackForm
