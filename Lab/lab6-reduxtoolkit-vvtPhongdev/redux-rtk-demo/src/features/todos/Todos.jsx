import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Form, Button, InputGroup, ListGroup } from 'react-bootstrap'
import { addTodo, toggleTodo, removeTodo, selectTodos } from './todosSlice'

export default function Todos() {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    dispatch(addTodo(text.trim()))
    setText('')
  }

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>2. Todos</Card.Title>

        <Form onSubmit={submit}>
          <InputGroup className="mb-3">
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Thêm việc cần làm..."
            />
            <Button type="submit" variant="primary">Thêm</Button>
          </InputGroup>
        </Form>

        <ListGroup>
          {todos.map((t) => (
            <ListGroup.Item key={t.id} className="d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch(toggleTodo(t.id))}
              />
              <span
                className="flex-grow-1"
                style={{ textDecoration: t.done ? 'line-through' : 'none' }}
              >
                {t.text}
              </span>
              <Button size="sm" variant="outline-danger" onClick={() => dispatch(removeTodo(t.id))}>
                Xoá
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
