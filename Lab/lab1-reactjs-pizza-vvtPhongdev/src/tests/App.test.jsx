import { render } from '@testing-library/react'
import App from '../App'

describe('App component (integration)', () => {
  it('renders the NavBar', () => {
    const { container } = render(<App />)
    expect(container.querySelector('nav')).not.toBeNull()
  })

  it('renders the BannerCarousel', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.carousel')).not.toBeNull()
  })

  it('renders at least one Pizza card', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('.card').length).toBeGreaterThan(0)
  })
})
