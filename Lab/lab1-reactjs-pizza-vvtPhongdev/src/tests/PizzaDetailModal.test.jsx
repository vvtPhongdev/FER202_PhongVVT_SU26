import { render, screen, fireEvent } from '@testing-library/react'
import PizzaDetailModal from '../components/PizzaDetailModal'

const sample = {
  id: '10',
  pizzaName: 'Modal Pizza',
  description: 'A beautiful detail description of this pizza.',
  category: 'Classic',
  isSpecial: true,
  image: 'https://example.com/modal.jpg',
  origin: 'Italy',
  topping: 'Mozzarella',
  rating: 5
}

describe('PizzaDetailModal component', () => {
  it('is hidden when show is false', () => {
    render(
      <PizzaDetailModal show={false} pizza={sample} onClose={() => {}} />
    )
    expect(screen.queryByText('Modal Pizza')).not.toBeInTheDocument()
  })

  it('shows pizza name in title when show is true', () => {
    render(<PizzaDetailModal show={true} pizza={sample} onClose={() => {}} />)
    expect(screen.getByText('Modal Pizza')).toBeInTheDocument()
  })

  it('shows pizza description in body', () => {
    render(<PizzaDetailModal show={true} pizza={sample} onClose={() => {}} />)
    expect(
      screen.getByText('A beautiful detail description of this pizza.')
    ).toBeInTheDocument()
  })

  it('renders the pizza image inside the modal', () => {
    render(<PizzaDetailModal show={true} pizza={sample} onClose={() => {}} />)
    const img = document.body.querySelector('.modal-body img')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe(sample.image)
  })

  it('calls onClose when Close button is clicked', () => {
    const handler = jest.fn()
    render(
      <PizzaDetailModal show={true} pizza={sample} onClose={handler} />
    )
    fireEvent.click(screen.getByText('Close'))
    expect(handler).toHaveBeenCalled()
  })
})
