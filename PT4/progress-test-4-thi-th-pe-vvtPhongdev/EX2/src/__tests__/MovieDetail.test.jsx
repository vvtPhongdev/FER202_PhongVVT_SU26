import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { MovieContext } from '../context/MovieContext'
import MovieDetail from '../pages/MovieDetail'
import * as movieApi from '../api/movieApi'

jest.mock('../api/movieApi')

const mockMovie = {
  id: '1',
  title: 'Mad Max: Fury Road',
  director: 'George Miller',
  studio: 'Warner Bros',
  genreId: 1,
  ticketPrice: 5000,
  vipPrice: 50000,
  releaseDate: '15/05/2015',
}

const mockCtx = {
  state: { genres: [{ id: 1, name: 'Action' }], movies: [], loading: false, error: null },
  dispatch: jest.fn(),
}

const renderDetail = (id = '1') =>
  render(
    <MovieContext.Provider value={mockCtx}>
      <MemoryRouter initialEntries={[`/movies/${id}`]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    </MovieContext.Provider>
  )

describe('MovieDetail — TODO-05', () => {
  beforeEach(() => jest.clearAllMocks())

  test('TODO-05: shows Spinner while loading', () => {
    movieApi.fetchMovieById.mockReturnValue(new Promise(() => {}))
    renderDetail()
    expect(document.querySelector('.spinner-border') || screen.queryByRole('status')).toBeTruthy()
  })

  test('TODO-05: shows movie title after loading', async () => {
    movieApi.fetchMovieById.mockResolvedValue(mockMovie)
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Mad Max: Fury Road')).toBeInTheDocument()
    })
  })

  test('TODO-05: shows director', async () => {
    movieApi.fetchMovieById.mockResolvedValue(mockMovie)
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText(/George Miller/)).toBeInTheDocument()
    })
  })

  test('TODO-05: shows Back to List button', async () => {
    movieApi.fetchMovieById.mockResolvedValue(mockMovie)
    renderDetail()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    })
  })

  test('TODO-05: shows Alert on error', async () => {
    movieApi.fetchMovieById.mockRejectedValue(new Error('Not found'))
    renderDetail()
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
