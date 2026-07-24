import { Container } from 'react-bootstrap'
import Counter from './features/counter/Counter'
import Todos from './features/todos/Todos'
import Posts from './features/posts/Posts'

export default function App() {
  return (
    <Container className="py-4" style={{ maxWidth: 680 }}>
      <h1 className="mb-4">Redux Toolkit — Lab 06</h1>
      <Counter />
      <Todos />
      <Posts />
    </Container>
  )
}
