import { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'

function EditFeedbackModal({ show, feedback, onHide }) {
  const { editFeedback } = useFeedback()
  const [form, setForm] = useState({
    course: '',
    topic: '',
    rating: '',
    comment: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (feedback) {
      setForm({
        course: feedback.course || '',
        topic: feedback.topic || '',
        rating: feedback.rating || '',
        comment: feedback.comment || '',
      })
      setErrors({})
    }
  }, [feedback])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
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

    await editFeedback(feedback.id, { ...feedback, ...form })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-2 mb-2">
            <Col md={6}>
              <Form.Label>Course</Form.Label>
              <Form.Control
                name="course"
                value={form.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Topic</Form.Label>
              <Form.Control
                name="topic"
                value={form.topic}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="g-2 mb-3">
            <Col md={6}>
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                name="rating"
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
            <Col md={6}>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                name="comment"
                value={form.comment}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditFeedbackModal
