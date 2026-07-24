import { useState } from 'react'
import { Table, Button, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { validateCarTypeName } from '../utils/validate'
import { updateCarType } from '../api/carApi'

export default function CarTypeList({ carTypes, onDelete, onUpdate }) {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editError, setEditError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetName, setTargetName] = useState('')

  const startEdit = (rt) => {
    setEditingId(rt.id)
    setEditValue(rt.name)
    setEditError(null)
  }

  const handleEditSave = async (id) => {
    const err = validateCarTypeName(editValue, carTypes, id)
    if (err) { setEditError(err); return }
    try {
      const updated = await updateCarType(id, { name: editValue.trim() })
      onUpdate(updated)
      setEditingId(null)
    } catch (e) {
      setEditError('Failed to update. Please try again.')
    }
  }

  const handleDeleteClick = (rt) => {
    setTargetId(rt.id)
    setTargetName(rt.name)
    setShowModal(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(targetId)
    setShowModal(false)
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carTypes.map((rt, idx) => (
            <tr key={rt.id}>
              <td>{idx + 1}</td>
              <td>
                {editingId === rt.id ? (
                  <>
                    <Form.Control
                      value={editValue}
                      onChange={(e) => { setEditValue(e.target.value); setEditError(null) }}
                      isInvalid={!!editError}
                    />
                    {editError && <Form.Control.Feedback type="invalid">{editError}</Form.Control.Feedback>}
                  </>
                ) : rt.name}
              </td>
              <td className="d-flex gap-2 flex-wrap">
                <Button size="sm" variant="info" onClick={() => navigate(`/car-types/${rt.id}`)}>View Details</Button>
                {editingId === rt.id ? (
                  <>
                    <Button size="sm" variant="success" onClick={() => handleEditSave(rt.id)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button size="sm" variant="warning" onClick={() => startEdit(rt)}>Edit</Button>
                )}
                <Button size="sm" variant="danger" onClick={() => handleDeleteClick(rt)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        body="Are you sure you want to delete this car type?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}
