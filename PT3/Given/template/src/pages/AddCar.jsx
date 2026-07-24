import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCar } from '../context/CarContext'
import { addCar, fetchCarTypes } from '../api/carApi'
import { validateCarName } from '../utils/validate'

export default function AddCar() {
  const { state, dispatch } = useCar()
  const { cars } = state
  const navigate = useNavigate()
  const [carTypes, setCarTypes] = useState([])
  const [form, setForm] = useState({
    name: '', carTypeId: '', seats: '', transmission: '', lastServiced: '', priceWeekday: '', priceWeekend: ''
  })
  const [validated, setValidated] = useState(false)
  const [nameError, setNameError] = useState(null)
  const [serverError, setServerError] = useState(null)

  // TODO-04: Gọi fetchCarTypes() trong useEffect và cập nhật state carTypes
  useEffect(() => {
    // TODO-04: implement fetchCarTypes và setCarTypes
    fetchCarTypes().then(setCarTypes).catch(console.error)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') setNameError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    const nameErr = validateCarName(form.name, cars)
    if (nameErr) { setNameError(nameErr); return }
    if (!e.currentTarget.checkValidity()) return
    try {
      const newCar = await addCar({
        ...form,
        carTypeId: Number(form.carTypeId),
        priceWeekday: Number(form.priceWeekday),
        priceWeekend: Number(form.priceWeekend),
      })
      dispatch({ type: 'ADD_CAR', payload: newCar })
      navigate('/')
    } catch {
      setServerError('Failed to add car. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="mb-3">Add New Car</h2>
      {serverError && <Alert variant="danger">{serverError}</Alert>}
      <Card className="shadow-sm p-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control required name="name" value={form.name} onChange={handleChange}
              isInvalid={!!nameError} placeholder="e.g. Toyota Vios" />
            <Form.Control.Feedback type="invalid">{nameError || 'Car name is required.'}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Car Type</Form.Label>
            <Form.Select required name="carTypeId" value={form.carTypeId} onChange={handleChange}>
              <option value="">-- Select car type --</option>
              {carTypes.map((rt) => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Car type is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seats</Form.Label>
            <Form.Control required name="seats" value={form.seats} onChange={handleChange} placeholder="e.g. 5" />
            <Form.Control.Feedback type="invalid">Seats is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Transmission</Form.Label>
            <Form.Control required name="transmission" value={form.transmission} onChange={handleChange} placeholder="e.g. Automatic" />
            <Form.Control.Feedback type="invalid">Transmission is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Serviced (dd/MM/yyyy)</Form.Label>
            <Form.Control required name="lastServiced" value={form.lastServiced} onChange={handleChange} placeholder="e.g. 15/03/2022" />
            <Form.Control.Feedback type="invalid">Last serviced date is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekday (VND)</Form.Label>
            <Form.Control required type="number" min="0" name="priceWeekday" value={form.priceWeekday} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Price weekday is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekend (VND)</Form.Label>
            <Form.Control required type="number" min="0" name="priceWeekend" value={form.priceWeekend} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Price weekend is required.</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">Add Car</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
