import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, Form, InputGroup, Stack, Badge } from 'react-bootstrap'
import { increment, decrement, incrementByAmount, reset, selectCount } from './counterSlice'

export default function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(2)

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>1. Counter</Card.Title>
        <h2 className="text-center my-3">
          <Badge bg="primary" pill>{count}</Badge>
        </h2>

        <Stack direction="horizontal" gap={2} className="justify-content-center mb-3">
          <Button variant="outline-secondary" onClick={() => dispatch(decrement())}>-1</Button>
          <Button variant="primary" onClick={() => dispatch(increment())}>+1</Button>
          <Button variant="outline-danger" onClick={() => dispatch(reset())}>Reset</Button>
        </Stack>

        <InputGroup>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button variant="success" onClick={() => dispatch(incrementByAmount(amount))}>
            + theo lượng
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  )
}
