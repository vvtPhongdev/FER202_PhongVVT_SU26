import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap'
import { addRestaurant } from '../api/restaurantApi'
import { useRestaurant } from '../context/RestaurantContext'
import {
  validateRestaurantName,
  validateVND,
  validateDate,
} from '../utils/validate'

export default function AddRestaurant() {
  const navigate = useNavigate()
  const { state, dispatch } = useRestaurant()

  const [form, setForm] = useState({
    name: '',
    categoryId: '',
    owner: '',
    address: '',
    priceMin: '',
    priceMax: '',
    openDate: '',
  })
  const [validated, setValidated] = useState(false)
  /**
   * extraErrors — lỗi ngoài HTML5 (unique name, date format, price range):
   *   name     : tên đã tồn tại
   *   openDate : format không đúng dd/MM/yyyy
   *   priceMin : lỗi riêng của priceMin (required / not a number / negative / decimal)
   *   priceMax : lỗi riêng của priceMax HOẶC lỗi range (min > max)
   *   server   : lỗi API
   */
  const [extraErrors, setExtraErrors] = useState({})

  const setFieldError = (field, error) =>
    setExtraErrors((prev) => ({ ...prev, [field]: error }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (extraErrors[name]) setFieldError(name, null)
  }

  // ── onBlur handlers ────────────────────────────────────────────────────────

  const handleNameBlur = () => {
    const err = validateRestaurantName(form.name, state.restaurants)
    setFieldError('name', err)
  }

  const handlePriceMinBlur = () => {
    // Chỉ validate riêng priceMin; range error sẽ set ở priceMax
    const err = validateVND(form.priceMin, 'Price Min')
    setFieldError('priceMin', err)
  }

  const handlePriceMaxBlur = () => {
    // Validate priceMax riêng, rồi check range
    const err = validateVND(form.priceMax, 'Price Max')
    if (err) { setFieldError('priceMax', err); return }

    if (form.priceMin !== '' && !validateVND(form.priceMin, 'Price Min')) {
      // priceMin đã hợp lệ → check range
      if (Number(form.priceMin) > Number(form.priceMax)) {
        setFieldError('priceMax', 'Price Max must be greater than or equal to Price Min.')
        return
      }
    }
    setFieldError('priceMax', null)
  }

  const handleDateBlur = (e) => {
    const err = validateDate(e.target.value, 'Open Date')
    setFieldError('openDate', err)
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation()
      return
    }

    const errors = {}

    // Unique name
    const nameErr = validateRestaurantName(form.name, state.restaurants)
    if (nameErr) errors.name = nameErr

    // Open Date
    const dateErr = validateDate(form.openDate, 'Open Date')
    if (dateErr) errors.openDate = dateErr

    // Price Min
    const minErr = validateVND(form.priceMin, 'Price Min')
    if (minErr) errors.priceMin = minErr

    // Price Max + range
    const maxErr = validateVND(form.priceMax, 'Price Max')
    if (maxErr) {
      errors.priceMax = maxErr
    } else if (!minErr && Number(form.priceMin) > Number(form.priceMax)) {
      errors.priceMax = 'Price Max must be greater than or equal to Price Min.'
    }

    if (Object.values(errors).some(Boolean)) {
      setExtraErrors(errors)
      return
    }

    try {
      const nextId =
        Math.max(...state.restaurants.map((r) => Number(r.id)).filter(Number.isFinite), 0) + 1

      const newRestaurant = await addRestaurant({
        id: String(nextId),
        name:       form.name.trim(),
        categoryId: Number(form.categoryId),
        owner:      form.owner.trim(),
        address:    form.address.trim(),
        priceMin:   Number(form.priceMin),
        priceMax:   Number(form.priceMax),
        openDate:   form.openDate.trim(),
      })
      dispatch({ type: 'ADD_RESTAURANT', payload: newRestaurant })
      navigate('/')
    } catch (err) {
      setFieldError('server', err.message)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      <h3>Add Restaurant</h3>

      {extraErrors.server && (
        <Alert variant="danger" dismissible onClose={() => setFieldError('server', null)}>
          {extraErrors.server}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            {/* Name — unique check */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleNameBlur}
                placeholder="Restaurant name"
                isInvalid={!!extraErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {extraErrors.name ?? 'Name is required.'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select required name="categoryId" value={form.categoryId} onChange={handleChange}>
                <option value="">Select category...</option>
                {state.categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
            </Form.Group>

            {/* Owner */}
            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                required
                name="owner"
                value={form.owner}
                onChange={handleChange}
                placeholder="Owner name"
              />
              <Form.Control.Feedback type="invalid">Owner is required.</Form.Control.Feedback>
            </Form.Group>

            {/* Address */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <Form.Control.Feedback type="invalid">Address is required.</Form.Control.Feedback>
            </Form.Group>

            {/* Open Date */}
            <Form.Group className="mb-3">
              <Form.Label>Open Date</Form.Label>
              <Form.Control
                required
                name="openDate"
                value={form.openDate}
                onChange={handleChange}
                onBlur={handleDateBlur}
                placeholder="dd/MM/yyyy"
                isInvalid={!!extraErrors.openDate}
              />
              <Form.Control.Feedback type="invalid">
                {extraErrors.openDate ?? 'Open Date is required.'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price Range */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price Min (VND)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={0}
                    step={1}
                    name="priceMin"
                    value={form.priceMin}
                    onChange={handleChange}
                    onBlur={handlePriceMinBlur}
                    isInvalid={!!extraErrors.priceMin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {extraErrors.priceMin ?? 'Price Min is required.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price Max (VND)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={0}
                    step={1}
                    name="priceMax"
                    value={form.priceMax}
                    onChange={handleChange}
                    onBlur={handlePriceMaxBlur}
                    isInvalid={!!extraErrors.priceMax}
                  />
                  <Form.Control.Feedback type="invalid">
                    {extraErrors.priceMax ?? 'Price Max is required.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary">Save</Button>{' '}
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
