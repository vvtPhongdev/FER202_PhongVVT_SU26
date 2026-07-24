import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import GenreDetail from '../pages/GenreDetail'
import * as movieApi from '../api/movieApi'

jest.mock('../api/movieApi')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const genres = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Sci-Fi' },
]
const movies = [
  { id: '1', title: 'Mad Max: Fury Road', director: 'George Miller', studio: 'Warner Bros', genreId: 1, releaseDate: '15/05/2015' },
  { id: '2', title: 'Die Hard', director: 'John McTiernan', studio: '20th Century Fox', genreId: 1, releaseDate: '15/07/1988' },
  { id: '3', title: 'Inception', director: 'Christopher Nolan', studio: 'Legendary Pictures', genreId: 2, releaseDate: '16/07/2010' },
]

const renderGenreDetail = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/genres/${id}`]}>
      <Routes>
        <Route path="/genres/:id" element={<GenreDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('GenreDetail — TODO-09', () => {
  beforeEach(() => {
    movieApi.fetchGenres.mockResolvedValue(genres)
    movieApi.fetchMovies.mockResolvedValue(movies)
    mockNavigate.mockClear()
  })

  afterEach(() => jest.clearAllMocks())

  test('TODO-09: shows genre name after load', async () => {
    renderGenreDetail('1')
    await waitFor(() => {
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  test('TODO-09: shows only movies from genre 1 (not genre 2)', async () => {
    renderGenreDetail('1')
    await waitFor(() => {
      expect(screen.getByText('Mad Max: Fury Road')).toBeInTheDocument()
      expect(screen.getByText('Die Hard')).toBeInTheDocument()
      expect(screen.queryByText('Inception')).not.toBeInTheDocument()
    })
  })

  test('TODO-09: has Back to Genres button', async () => {
    renderGenreDetail('1')
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to genres/i })).toBeInTheDocument()
    })
  })

  test('TODO-09: navigates to /not-found for invalid genre id', async () => {
    renderGenreDetail('999')
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-found', { replace: true })
    })
  })
})
