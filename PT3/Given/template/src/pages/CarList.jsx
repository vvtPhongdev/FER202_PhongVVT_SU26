import { useState } from 'react'
import { Table, Spinner, Alert, Pagination, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCar } from '../context/CarContext'
import { useAuth } from '../context/AuthContext'
import { deleteCar } from '../api/carApi'
import FilterBar from '../components/FilterBar'
import CarRow from '../components/CarRow'

const PAGE_SIZE = 5

export default function CarList() {
  const { state, dispatch } = useCar()
  const { cars, carTypes, loading, error } = state
  const { user } = useAuth()
  const navigate = useNavigate()
  const [nameFilter, setNameFilter] = useState('')
  const [carTypeFilter, setCarTypeFilter] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)

  // TODO-01: isAdmin = user?.role === 'Admin' - dung de an nut Add/Delete khi khong phai Admin
  const isAdmin = user?.role === 'Admin'

  const enriched = cars.map((r) => ({
    ...r,
    carType: carTypes.find((rt) => String(rt.id) === String(r.carTypeId))?.name ?? '—',
  }))

  const filtered = enriched.filter((r) => {
    const nameMatch = r.name.toLowerCase().includes(nameFilter.toLowerCase())
    const typeMatch = !carTypeFilter || String(r.carTypeId) === String(carTypeFilter)
    return nameMatch && typeMatch
  })

  // TODO-03: Sap xep `filtered` theo sortBy (name/seats/price, asc/desc) -> gan vao `sorted`
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc': return a.name.localeCompare(b.name)
      case 'name-desc': return b.name.localeCompare(a.name)
      case 'seats-asc': return Number(a.seats) - Number(b.seats)
      case 'seats-desc': return Number(b.seats) - Number(a.seats)
      case 'price-asc': return a.priceWeekday - b.priceWeekday
      case 'price-desc': return b.priceWeekday - a.priceWeekday
      default: return 0
    }
  })

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)
      dispatch({ type: 'DELETE_CAR', payload: id })
    } catch {
      alert('Failed to delete car.')
    }
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Car List</h2>
        {/* TODO-01: chi hien thi nut Add Car khi user.role === 'Admin' */}
        {isAdmin && <Button variant="primary" onClick={() => navigate('/add')}>+ Add Car</Button>}
      </div>
      <FilterBar
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setPage(1) }}
        carTypeFilter={carTypeFilter}
        setCarTypeFilter={(v) => { setCarTypeFilter(v); setPage(1) }}
        carTypes={carTypes}
      />
      {/* TODO-03: Them Form.Select (aria-label="Sort by") voi option Name/Seats/Price tang/giam,
          onChange goi setSortBy(e.target.value) va setPage(1) */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <span className="text-muted">Sort by:</span>
        <Form.Select
          aria-label="Sort by"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value)
            setPage(1)
          }}
          style={{ maxWidth: '250px' }}
        >
          <option value="">-- Sort by --</option>
          <option value="name-asc">Name (A to Z)</option>
          <option value="name-desc">Name (Z to A)</option>
          <option value="seats-asc">Seats (Low to High)</option>
          <option value="seats-desc">Seats (High to Low)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </Form.Select>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Car Type</th>
            <th>Seats</th>
            <th>Transmission</th>
            <th>Last Serviced</th>
            <th>Price (Weekday)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr><td colSpan={8} className="text-center">No cars found.</td></tr>
          ) : (
            paginated.map((r, i) => (
              <CarRow
                key={r.id}
                car={r}
                index={(page - 1) * PAGE_SIZE + i + 1}
                onDelete={handleDelete}
                canManage={isAdmin}
              />
            ))
          )}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  )
}
