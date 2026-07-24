import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap'
import axios from 'axios'
import { formatPriceRange } from '../utils/format'

const BASE_URL = 'http://localhost:3001'

export default function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO-09: Khai báo state: category (null), restaurants ([]), loading (true), error (null)
  const [category, setCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-09: Gọi song song Promise.all:
      //   - GET /categories → tìm category theo id
      //   - GET /restaurants → lọc theo categoryId === id
      // Nếu category không tồn tại: setError('Category not found.')
      // Dùng try/catch + finally để setLoading(false)
      setLoading(true)
      setError(null)
      try {
        const [categoryResponse, restaurantResponse] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/restaurants`),
        ])
        const found = categoryResponse.data.find((c) => String(c.id) === String(id))

        if (!found) {
          setCategory(null)
          setRestaurants([])
          setError('Category not found.')
          return
        }

        setCategory(found)
        setRestaurants(
          restaurantResponse.data.filter(
            (restaurant) => String(restaurant.categoryId) === String(id)
          )
        )
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-09: Hiển thị <Spinner> khi loading, <Alert variant="danger"> khi có lỗi
  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      {/* TODO-09: Nút Back về '/categories' */}
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate('/categories')}
      >
        Back to Categories
      </Button>

      {/* TODO-09: Card hiển thị tên category trong <Badge> và số lượng nhà hàng */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            <Badge bg="info">{category?.name}</Badge>
          </Card.Title>
          <Card.Text>{restaurants.length} restaurant(s)</Card.Text>
        </Card.Body>
      </Card>

      {/* TODO-09: Table danh sách nhà hàng với cột: #, Name, Owner, Address, Price Range */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Price Range</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No restaurants found.
              </td>
            </tr>
          ) : (
            restaurants.map((restaurant, index) => (
              <tr key={restaurant.id}>
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.owner}</td>
                <td>{restaurant.address}</td>
                <td>{formatPriceRange(restaurant.priceMin, restaurant.priceMax)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
