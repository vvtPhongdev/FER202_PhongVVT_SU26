import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MovieRow from '../components/MovieRow'

const mockMovie = {
  id: '1',
  title: 'Mad Max: Fury Road',
  genre: 'Action',
  director: 'George Miller',
  studio: 'Warner Bros',
  ticketPrice: 5000,
  vipPrice: 50000,
  releaseDate: '15/05/2015',
}

const renderRow = (movie = mockMovie, index = 0, onDelete = jest.fn()) =>
  render(
    <MemoryRouter>
      <table><tbody>
        <MovieRow movie={movie} index={index} onDelete={onDelete} />
      </tbody></table>
    </MemoryRouter>
  )

describe('MovieRow — TODO-06 & TODO-07', () => {
  test('TODO-06: clicking Delete shows confirmation modal', () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument()
  })

  test('TODO-06: modal shows movie title', () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByText(/Are you sure you want to delete "Mad Max: Fury Road"/i)).toBeInTheDocument()
  })

  test('TODO-06: confirming modal calls onDelete with movie id', async () => {
    const onDelete = jest.fn()
    renderRow(mockMovie, 0, onDelete)
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    fireEvent.click(screen.getByRole('button', { name: /^confirm$/i }))
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith('1')
    })
  })

  test('TODO-07: price column shows ticketPrice amount', () => {
    renderRow()
    expect(screen.getByText(/5\.000/)).toBeInTheDocument()
  })

  test('TODO-07: price column shows vipPrice amount', () => {
    renderRow()
    expect(screen.getByText(/50\.000/)).toBeInTheDocument()
  })

  test('renders movie title in row', () => {
    renderRow()
    expect(screen.getByText('Mad Max: Fury Road')).toBeInTheDocument()
  })
})
