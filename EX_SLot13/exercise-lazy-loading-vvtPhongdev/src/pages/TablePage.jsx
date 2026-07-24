import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap'
import { fetchTables } from '../services/restaurantService'

const STATUS_CONFIG = {
  available: { label: 'Trống', variant: 'success' },
  occupied:  { label: 'Có khách', variant: 'danger' },
  reserved:  { label: 'Đã đặt', variant: 'warning' },
}

function TablePage() {
  const [tables, setTables]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetchTables()
      .then(data => setTables(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error)   return <Alert variant="danger" className="m-4">{error}</Alert>

  return (
    <Container>
      <h2 className="mb-4">🪑 Bàn Ăn</h2>
      <Row xs={1} sm={2} md={4} className="g-3">
        {tables.map(table => {
          const cfg = STATUS_CONFIG[table.status] || { label: table.status, variant: 'secondary' }
          return (
            <Col key={table.id}>
              <Card className="text-center h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '2.5rem' }}>🪑</div>
                  <Card.Title className="mt-2">Bàn {table.number}</Card.Title>
                  <Card.Text className="text-muted small">
                    Sức chứa: {table.capacity} người
                  </Card.Text>
                  <Badge bg={cfg.variant}>{cfg.label}</Badge>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default TablePage