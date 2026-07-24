import { createContext, useContext, useReducer } from 'react'
import {
  FEEDBACK_ACTIONS,
  feedbackReducer,
  initialFeedbackState,
} from '../reducer/feedbackReducer'
import {
  createFeedback,
  getFeedbacksByUser,
  removeFeedback,
  updateFeedback,
} from '../api/feedbackApi'

const FeedbackContext = createContext(null)

export function FeedbackProvider({ children }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialFeedbackState)

  const fetchFeedbacks = async (userId) => {
    dispatch({ type: FEEDBACK_ACTIONS.FETCH_START })

    try {
      const data = await getFeedbacksByUser(userId)
      dispatch({ type: FEEDBACK_ACTIONS.FETCH_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: FEEDBACK_ACTIONS.FETCH_FAIL, payload: err.message })
    }
  }

  const addFeedback = async (data) => {
    const newItem = await createFeedback(data)
    dispatch({ type: FEEDBACK_ACTIONS.ADD, payload: newItem })
  }

  const editFeedback = async (id, data) => {
    const updated = await updateFeedback(id, data)
    dispatch({ type: FEEDBACK_ACTIONS.EDIT, payload: updated })
  }

  const deleteFeedback = async (id) => {
    await removeFeedback(id)
    dispatch({ type: FEEDBACK_ACTIONS.DELETE, payload: id })
  }

  return (
    <FeedbackContext.Provider
      value={{
        ...state,
        fetchFeedbacks,
        addFeedback,
        editFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
