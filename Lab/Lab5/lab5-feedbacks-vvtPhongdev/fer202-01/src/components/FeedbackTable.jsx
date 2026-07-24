import { useState } from 'react'
import { Card, Table, Button, Badge } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'
import { formatDate } from '../utils/format'
import DeleteConfirmModal from './DeleteConfirmModal'

function FeedbackTable({ feedbacks, onEdit }) {
  const { deleteFeedback } = useFeedback()
  const [deleteTarget, setDeleteTarget] = useState(null)   // id cần xóa

  const handleDeleteConfirm = () => {
    deleteFeedback(deleteTarget)
    setDeleteTarget(null)
  }

  const ratingColor = (r) => {
    const n = Number(r)
    if (n >= 4) return 'success'
    if (n === 3) return 'warning'
    return 'danger'
  }

  return (
    <>
      <Card className="mb-4">
        <Card.Header><strong>Feedback Management</strong></Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>#</th><th>Course</th><th>Topic</th>
                <th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-3">
                    No feedbacks yet.
                  </td>
                </tr>
              ) : (
                feedbacks.map((fb, idx) => (
                  <tr key={fb.id}>
                    <td>{idx + 1}</td>
                    <td>{fb.course}</td>
                    <td>{fb.topic}</td>
                    <td>
                      <Badge bg={ratingColor(fb.rating)}>{fb.rating} ⭐</Badge>
                    </td>
                    <td>{fb.comment}</td>
                    <td>{formatDate(fb.date)}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-1"
                        onClick={() => onEdit(fb)}>Edit</Button>
                      <Button variant="danger" size="sm"
                        onClick={() => setDeleteTarget(fb.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <DeleteConfirmModal
        show={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onHide={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default FeedbackTable
