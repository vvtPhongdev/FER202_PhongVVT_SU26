import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MovieContext } from '../context/MovieContext'
import MovieList from '../pages/MovieList'

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
  { id: '1', title: 'Mad Max: Fury Road', director: 'George Miller', studio: 'Warner Bros', genreId: 1, ticketPrice: 5000, vipPrice: 50000, releaseDate: '15/05/2015' },
  { id: '2', title: 'Die Hard', director: 'John McTiernan', studio: '20th Century Fox', genreId: 1, ticketPrice: 5000, vipPrice: 50000, releaseDate: '15/07/1988' },
  { id: '3', title: 'Inception', director: 'Christopher Nolan', studio: 'Legendary Pictures', genreId: 2, ticketPrice: 8000, vipPrice: 80000, releaseDate: '16/07/2010' },
  { id: '4', title: 'Interstellar', director: 'Ridley Scott', studio: 'Scott Free', genreId: 2, ticketPrice: 7500, vipPrice: 75000, releaseDate: '01/10/2015' },
]

const mockCtx = {
  state: { movies, genres, loading: false, error: null },
  dispatch: jest.fn(),
}

const renderMovieList = () =>
  render(
    <MovieContext.Provider value={mockCtx}>
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    </MovieContext.Provider>
  )

describe('MovieList — TODO-07', () => {
  beforeEach(() => mockNavigate.mockClear())

  test('TODO-07: renders all movies initially', () => {
    renderMovieList()
    expect(screen.getByText('Mad Max: Fury Road')).toBeInTheDocument()
    expect(screen.getByText('Die Hard')).toBeInTheDocument()
    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('Interstellar')).toBeInTheDocument()
  })

  test('TODO-07: search input with placeholder "Search by title..."', () => {
    renderMovieList()
    expect(screen.getByPlaceholderText('Search by title...')).toBeInTheDocument()
  })

  test('TODO-07: typing in search filters movies by title', () => {
    renderMovieList()
    fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'Die Hard' } })
    expect(screen.getByText('Die Hard')).toBeInTheDocument()
    expect(screen.queryByText('Mad Max: Fury Road')).not.toBeInTheDocument()
  })

  test('TODO-07: no match shows "No movies found."', () => {
    renderMovieList()
    fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'xyznotexist' } })
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument()
  })

  test('TODO-07: genre select has "All Genres" option', () => {
    renderMovieList()
    expect(screen.getByRole('option', { name: 'All Genres' })).toBeInTheDocument()
  })

  test('TODO-07: selecting a genre filters movies', () => {
    renderMovieList()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } })
    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('Interstellar')).toBeInTheDocument()
    expect(screen.queryByText('Mad Max: Fury Road')).not.toBeInTheDocument()
    expect(screen.queryByText('Die Hard')).not.toBeInTheDocument()
  })
})
