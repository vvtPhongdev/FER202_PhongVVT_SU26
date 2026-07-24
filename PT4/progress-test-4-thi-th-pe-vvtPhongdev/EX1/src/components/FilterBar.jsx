import { Form, Row, Col } from 'react-bootstrap'

export default function FilterBar({ nameFilter, setNameFilter, carTypeFilter, setCarTypeFilter, carTypes }) {
  return (
    <Row className="mb-3 g-2">
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Car name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Col>
      <Col md={6}>
        <Form.Select value={carTypeFilter} onChange={(e) => setCarTypeFilter(e.target.value)}>
          <option value="">-- Filter by car type --</option>
          {carTypes.map((rt) => (
            <option key={rt.id} value={rt.id}>{rt.name}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  )
}
