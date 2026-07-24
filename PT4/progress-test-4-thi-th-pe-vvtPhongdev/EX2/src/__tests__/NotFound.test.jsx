import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

describe('NotFound — TODO-08', () => {
  beforeEach(() => mockNavigate.mockClear())

  test('TODO-08: renders "404" text', () => {
    renderPage()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  test('TODO-08: renders "Page Not Found" text', () => {
    renderPage()
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })

  test('TODO-08: has a button to go back home', () => {
    renderPage()
    const btn = screen.getByRole('button', { name: /back|home/i })
    expect(btn).toBeInTheDocument()
  })

  test('TODO-08: clicking back button navigates to "/"', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /back|home/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
