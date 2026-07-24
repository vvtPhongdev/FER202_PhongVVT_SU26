import { useState, useEffect, useReducer } from 'react'
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { fetchCarTypes, addCarType, deleteCarType, updateCarType, fetchCars } from '../api/carApi'
import { carTypeFormReducer, formInitialState } from '../reducer/carTypeReducer'
import { validateCarTypeName } from '../utils/validate'
import CarTypeList from '../components/CarTypeList'
import ModalConfirm from '../components/ModalConfirm'

export default function ManageCarTypes() {
  const [carTypes, setCarTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formState, formDispatch] = useReducer(carTypeFormReducer, formInitialState)
  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetName, setTargetName] = useState('')
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    fetchCarTypes()
      .then((data) => { setCarTypes(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    formDispatch({ type: 'SET_VALIDATED', payload: true })
    if (!form.checkValidity()) return
    // TODO-10A: validate tên, gọi addCarType API, cập nhật danh sách, reset form
    const name = formState.newName.trim()
    const error = validateCarTypeName(name, carTypes)
    if (error) {
      formDispatch({ type: 'SET_UNIQUE_ERROR', payload: true })
      return
    }
    try {
      const created = await addCarType({ name })
      setCarTypes((prev) => [...prev, created])
      formDispatch({ type: 'RESET' })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteClick = async (id, name) => {
    setTargetId(id)
    setTargetName(name)
    // TODO-10B: Gọi fetchCars(), kiểm tra có phòng nào dùng carTypeId này không
    // Nếu có → setDeleteError với thông báo chứa tên carType
    // Nếu không → setDeleteError(null)
    try {
      const allCars = await fetchCars()
      const inUse = allCars.some((car) => String(car.carTypeId) === String(id))
      if (inUse) {
        setDeleteError(`Cannot delete car type "${name}" because it is currently in use by one or more cars.`)
      } else {
        setDeleteError(null)
      }
    } catch (err) {
      setDeleteError(`Failed to verify status of car type "${name}".`)
    }
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO-10B: gọi deleteCarType API, cập nhật danh sách, đóng modal
    if (!targetId) return
    try {
      await deleteCarType(targetId)
      setCarTypes((prev) => prev.filter((item) => item.id !== targetId))
      setShowModal(false)
    } catch (err) {
      setError(err.message || 'Failed to delete car type.')
    }
  }

  const handleUpdate = (updated) => {
    setCarTypes((prev) => prev.map((rt) => (rt.id === updated.id ? updated : rt)))
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h2 className="mb-3">Manage Car Types</h2>
      <Card className="shadow-sm p-3 mb-4">
        <Form noValidate validated={formState.validated} onSubmit={handleAdd}>
          <Form.Group className="mb-2">
            <Form.Label>New Car Type Name</Form.Label>
            <Form.Control
              required
              value={formState.newName}
              onChange={(e) => formDispatch({ type: 'SET_NAME', payload: e.target.value })}
              isInvalid={formState.uniqueError}
              placeholder="e.g. Pickup"
            />
            <Form.Control.Feedback type="invalid">
              {formState.uniqueError ? 'Car type name already exists.' : 'Name is required.'}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">Add Car Type</Button>
        </Form>
      </Card>
      <CarTypeList
        carTypes={carTypes}
        onDelete={(id) => {
          const rt = carTypes.find((r) => r.id === id)
          handleDeleteClick(id, rt?.name ?? '')
        }}
        onUpdate={handleUpdate}
      />
      {/* TODO-10B: ModalConfirm — body hiển thị deleteError nếu có, hoặc xác nhận xoá */}
      <ModalConfirm
        show={showModal}
        title={deleteError ? 'Cannot Delete' : 'Confirm Delete'}
        body={deleteError ? (
          <div>{deleteError}</div>
        ) : (
          'Are you sure you want to delete this car type?'
        )}
        onConfirm={deleteError ? () => setShowModal(false) : handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
        confirmVariant={deleteError ? 'secondary' : 'danger'}
        confirmLabel={deleteError ? 'OK' : 'Delete'}
      />
    </div>
  )
}
