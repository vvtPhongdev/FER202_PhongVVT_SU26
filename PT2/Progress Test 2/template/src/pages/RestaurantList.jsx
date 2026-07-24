import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Table, Pagination, Spinner, Alert, Button } from 'react-bootstrap'
import { useRestaurant } from '../context/RestaurantContext'
import { deleteRestaurant } from '../api/restaurantApi'
import RestaurantRow from '../components/RestaurantRow'
import FilterBar from '../components/FilterBar'

const PAGE_SIZE = 5

export default function RestaurantList() {
  const { state, dispatch } = useRestaurant()
  const { loading, error, restaurants, categories } = state

  const [filters, setFilters] = useState({ name: '', categoryId: '' })
  const [currentPage, setCurrentPage] = useState(1)

  // Enrich restaurants with category name
  const enriched = useMemo(
    () =>
      restaurants.map((r) => ({
        ...r,
        category:
          categories.find((c) => String(c.id) === String(r.categoryId))?.name ||
          'Unknown',
      })),
    [restaurants, categories]
  )

  // Apply filters
  const filtered = useMemo(() => {
    return enriched.filter((r) => {
      const nameMatch = r.name
        .toLowerCase()
        .includes(filters.name.toLowerCase())
      const catMatch =
        !filters.categoryId ||
        String(r.categoryId) === String(filters.categoryId)
      return nameMatch && catMatch
    })
  }, [enriched, filters])

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleDelete = async (id) => {
    await deleteRestaurant(id)
    dispatch({ type: 'DELETE_RESTAURANT', payload: id })
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Restaurant List</h3>
        <Button as={Link} to="/add" variant="success">
          + Add Restaurant
        </Button>
      </div>

      <FilterBar categories={categories} onFilter={handleFilter} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Open Date</th>
            {/* TODO-07: Thêm <th>Price Range</th> */}
            <th>Price Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-muted">
                No restaurants found.
              </td>
            </tr>
          ) : (
            paged.map((r, i) => (
              <RestaurantRow
                key={r.id}
                restaurant={r}
                index={(currentPage - 1) * PAGE_SIZE + i}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  )
}
