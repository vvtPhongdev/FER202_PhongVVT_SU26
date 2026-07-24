import { Alert } from 'react-bootstrap'
import { useCounter } from '../../context/CounterContext'

export default function StatusMessage() {
  const { count } = useCounter()
  const message = count > 0 ? 'Dương' : count < 0 ? 'Âm' : 'Bằng 0'
  const variant = count > 0 ? 'success' : count < 0 ? 'danger' : 'secondary'
  return <Alert variant={variant} className="text-center">{message}</Alert>
}
