import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [types, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
        const found = types.find((rt) => String(rt.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setCarType(found)
        setCars(allCars.filter((r) => String(r.carTypeId) === String(id)))
      } catch (err) {
        setError(err.message || 'Failed to load details.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, navigate])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!carType) return null

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/car-types') */}
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/car-types')}>
        ← Back to Car Types
      </Button>
      {/* TODO-10A: Card với carType name, Badge id */}
      <Card className="shadow-sm mb-4">
        <Card.Header as="h4">
          {carType.name} <Badge bg="secondary" className="ms-2">ID: {carType.id}</Badge>
        </Card.Header>
      </Card>
      <h5>Cars in this Type</h5>
      {/* TODO-10A: Table cars (name, seats, transmission, formatPriceRange, lastServiced) */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr><td colSpan={5} className="text-center">No cars found in this type.</td></tr>
          ) : (
            cars.map((car) => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.seats}</td>
                <td>{car.transmission}</td>
                <td>{formatPriceRange(car.priceWeekday, car.priceWeekend)}</td>
                <td>{car.lastServiced}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
