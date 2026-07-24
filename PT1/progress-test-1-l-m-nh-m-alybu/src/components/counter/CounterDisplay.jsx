import { Card } from 'react-bootstrap'
import { useCounter } from '../../context/CounterContext'

export default function CounterDisplay() {
  const { count } = useCounter()
  return (
    <Card className="text-center mb-3">
      <Card.Body>
        <Card.Title>Giá trị hiện tại</Card.Title>
        <p className="display-4 fw-bold">{count}</p>
      </Card.Body>
    </Card>
  )
}
