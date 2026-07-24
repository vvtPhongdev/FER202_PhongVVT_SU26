import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function FilterBar({ categories, onFilter }) {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter({ name, categoryId })
  }

  const handleReset = () => {
    setName('')
    setCategoryId('')
    onFilter({ name: '', categoryId: '' })
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={5}>
          <Form.Label>Search by name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Restaurant name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Filter by category</Form.Label>
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button type="submit" variant="primary">Search</Button>{' '}
          <Button type="button" variant="outline-secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
