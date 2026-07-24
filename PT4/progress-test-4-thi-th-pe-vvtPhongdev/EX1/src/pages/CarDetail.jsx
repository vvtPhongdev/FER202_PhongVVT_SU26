import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchCarById } from '../api/carApi'
import { useCar } from '../context/CarContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useCar()
  const { carTypes } = state
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO-05: Gọi fetchCarById(id), cập nhật state car/loading/error
    fetchCarById(id)
      .then((data) => {
        setCar(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load car.')
        setLoading(false)
      })
  }, [id])

  // TODO-05: Nếu loading → trả về Spinner
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  // TODO-05: Nếu error → trả về Alert variant="danger"
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!car) return null

  const carTypeName = carTypes.find((rt) => String(rt.id) === String(car.carTypeId))?.name ?? '—'

  return (
    <div>
      {/* TODO-05: Nút Back navigate(-1) */}
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        ← Back
      </Button>
      <Card className="shadow-sm">
        <Card.Header as="h4">{car.name}</Card.Header>
        <Card.Body>
          {/* TODO-05: ListGroup với Car Type (Badge), Brand, Transmission,
              Price Weekday (formatVND), Price Weekend (formatVND), Last Serviced (formatDateDisplay) */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Car Type:</strong> <Badge bg="primary">{carTypeName}</Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Brand:</strong> {car.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Transmission:</strong> {car.transmission}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price Weekday:</strong> {formatVND(car.priceWeekday)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price Weekend:</strong> {formatVND(car.priceWeekend)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Serviced:</strong> {formatDateDisplay(car.lastServiced)}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
