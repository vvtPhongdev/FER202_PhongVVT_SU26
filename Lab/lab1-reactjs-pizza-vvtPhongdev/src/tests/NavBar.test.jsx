import { render, screen } from '@testing-library/react'
import NavBar from '../components/NavBar'

describe('NavBar component', () => {
  it('renders a navbar element', () => {
    const { container } = render(<NavBar />)
    const nav = container.querySelector('nav')
    expect(nav).not.toBeNull()
  })

  it('shows the brand name "Pizzas"', () => {
    render(<NavBar />)
    expect(screen.getByText(/pizzas/i)).toBeInTheDocument()
  })

  it('contains at least one nav link', () => {
    const { container } = render(<NavBar />)
    const links = container.querySelectorAll('a')
    expect(links.length).toBeGreaterThan(0)
  })
})
