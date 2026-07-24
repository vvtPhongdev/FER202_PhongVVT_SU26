import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

function FilterBar({ genres = [], onFilter, onAddNew }) {
  const [genreId, setGenreId] = useState('')
  const [title, setTitle] = useState('')

  const handleFilter = () => {
    onFilter({ genreId, title })
  }

  return (
    <div className="mb-3">
      <Row className="mb-2 align-items-end g-2">
        <Col xs="auto">
          <Form.Label className="mb-1">Filter by genre:</Form.Label>
          <Form.Select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            style={{ width: 220 }}
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label className="mb-1">Movie title...</Form.Label>
          <Form.Control
            type="text"
            placeholder="Movie title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={handleFilter}>Filter</Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={onAddNew}>Add New</Button>
        </Col>
      </Row>
    </div>
  )
}

export default FilterBar
