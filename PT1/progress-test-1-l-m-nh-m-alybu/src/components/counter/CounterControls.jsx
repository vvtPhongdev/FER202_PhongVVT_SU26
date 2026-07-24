import { Button, ButtonGroup } from 'react-bootstrap'
import { useCounter } from '../../context/CounterContext'

export default function CounterControls() {
  const { increment, decrement, reset } = useCounter()
  return (
    <div className="d-flex justify-content-center mb-3">
      <ButtonGroup>
        <Button variant="success" onClick={increment}>+</Button>
        <Button variant="danger" onClick={decrement}>−</Button>
        <Button variant="secondary" onClick={reset}>Reset</Button>
      </ButtonGroup>
    </div>
  )
}
