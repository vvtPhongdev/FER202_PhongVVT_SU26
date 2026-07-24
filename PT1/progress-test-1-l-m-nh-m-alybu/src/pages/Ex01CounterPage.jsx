import { Container } from 'react-bootstrap'
import { CounterProvider } from '../context/CounterContext'
import CounterDisplay from '../components/counter/CounterDisplay'
import CounterControls from '../components/counter/CounterControls'
import StatusMessage from '../components/counter/StatusMessage'

export default function Ex01CounterPage() {
  return (
    <CounterProvider>
      <Container className="py-4" style={{ maxWidth: 480 }}>
        <h2 className="text-center mb-4">Bài 1 – Counter</h2>
        <CounterDisplay />
        <CounterControls />
        <StatusMessage />
      </Container>
    </CounterProvider>
  )
}
