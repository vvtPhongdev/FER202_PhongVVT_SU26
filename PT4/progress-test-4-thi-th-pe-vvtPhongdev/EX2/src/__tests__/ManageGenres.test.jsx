import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageGenres from '../pages/ManageGenres'
import * as movieApi from '../api/movieApi'

jest.mock('../api/movieApi')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const initialGenres = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Sci-Fi' },
]
// Action (id 1) has movies — cannot be deleted
// Sci-Fi (id 2) has no movies — can be deleted
const initialMovies = [
  { id: '1', title: 'Mad Max: Fury Road', genreId: 1 },
  { id: '2', title: 'Die Hard', genreId: 1 },
]

const renderPage = () =>
  render(
    <MemoryRouter>
      <ManageGenres />
    </MemoryRouter>
  )

describe('ManageGenres — TODO-10', () => {
  beforeEach(() => {
    movieApi.fetchGenres.mockResolvedValue([...initialGenres])
    movieApi.fetchMovies.mockResolvedValue([...initialMovies])
    movieApi.addGenre.mockImplementation(({ name }) => Promise.resolve({ id: '99', name }))
    movieApi.deleteGenre.mockResolvedValue({})
    mockNavigate.mockClear()
  })

  afterEach(() => jest.clearAllMocks())

  test('form has input with placeholder "e.g. Thriller" (provided)', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByPlaceholderText('e.g. Thriller')).toBeInTheDocument()
    })
  })

  test('clicking Delete on a genre shows ModalConfirm (provided)', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Action'))
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.getByText(/Are you sure you want to delete "Action"/i)).toBeInTheDocument()
    })
  })

  test('TODO-10: confirming delete on genre IN USE shows error, does not delete', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Action'))
    // Action has movies → should show error
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    await waitFor(() => screen.getByText(/Are you sure/i))
    fireEvent.click(screen.getByRole('button', { name: /^confirm$/i }))
    await waitFor(() => {
      expect(movieApi.deleteGenre).not.toHaveBeenCalled()
      expect(screen.getByText(/cannot delete/i)).toBeInTheDocument()
    })
  })

  test('TODO-10: confirming delete on genre NOT in use succeeds', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Sci-Fi'))
    // Sci-Fi has no movies → should delete
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[1]) // Sci-Fi is the 2nd row
    await waitFor(() => screen.getByText(/Are you sure you want to delete "Sci-Fi"/i))
    fireEvent.click(screen.getByRole('button', { name: /^confirm$/i }))
    await waitFor(() => {
      expect(movieApi.deleteGenre).toHaveBeenCalledTimes(1)
      expect(screen.queryByText('Sci-Fi')).not.toBeInTheDocument()
    })
  })
})
