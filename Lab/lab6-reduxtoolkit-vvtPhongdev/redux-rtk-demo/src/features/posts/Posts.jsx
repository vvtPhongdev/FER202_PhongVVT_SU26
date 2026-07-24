import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, ListGroup, Spinner, Alert } from 'react-bootstrap'
import { fetchPosts, selectPosts } from './postsSlice'

export default function Posts() {
  const { items, status, error } = useSelector(selectPosts)
  const dispatch = useDispatch()
  const loading = status === 'loading'

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>3. Posts (async / API)</Card.Title>

        <Button variant="primary" className="mb-3" disabled={loading} onClick={() => dispatch(fetchPosts())}>
          {loading ? (
            <>
              <Spinner as="span" size="sm" animation="border" className="me-2" />
              Đang tải...
            </>
          ) : 'Tải bài viết'}
        </Button>

        {status === 'failed' && <Alert variant="danger">Lỗi: {error}</Alert>}

        <ListGroup variant="flush">
          {items.map((p) => (
            <ListGroup.Item key={p.id}><b>{p.title}</b></ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
