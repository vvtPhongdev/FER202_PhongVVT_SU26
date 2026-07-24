import { useEffect, useState } from 'react'
import { Alert, Container, Spinner } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddFeedbackForm from '../components/AddFeedbackForm'
import FeedbackTable from '../components/FeedbackTable'
import EditFeedbackModal from '../components/EditFeedbackModal'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'

function HomePage() {
  const { user } = useAuth()
  const { items, loading, error, fetchFeedbacks } = useFeedback()
  const [editTarget, setEditTarget] = useState(null)

  useEffect(() => {
    if (user) fetchFeedbacks(user.id)
  }, [user])

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <Container className="my-3 flex-grow-1">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && (
          <>
            <AddFeedbackForm />
            <FeedbackTable
              feedbacks={items}
              onEdit={setEditTarget}
            />
          </>
        )}
      </Container>
      <Footer />

      <EditFeedbackModal
        show={!!editTarget}
        feedback={editTarget}
        onHide={() => setEditTarget(null)}
      />
    </div>
  )
}

export default HomePage
