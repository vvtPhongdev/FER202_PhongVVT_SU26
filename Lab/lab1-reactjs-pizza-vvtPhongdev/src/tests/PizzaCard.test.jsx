import { render, screen, fireEvent } from '@testing-library/react'
import PizzaCard from '../components/PizzaCard'

const sample = {
  id: '99',
  pizzaName: 'Test Pizza',
  description: 'A delicious test pizza.',
  category: 'Gourmet',
  isSpecial: true,
  image: 'https://example.com/test.jpg',
  origin: 'Italy',
  topping: 'Mozzarella',
  rating: 5
}

describe('PizzaCard component', () => {
  it('renders the pizza name', () => {
    render(<PizzaCard pizza={sample} onShowDetail={() => {}} />)
    expect(screen.getByText('Test Pizza')).toBeInTheDocument()
  })

  it('renders the pizza category', () => {
    render(<PizzaCard pizza={sample} onShowDetail={() => {}} />)
    expect(screen.getByText(/Gourmet/i)).toBeInTheDocument()
  })

  it('renders the pizza image with correct src', () => {
    const { container } = render(
      <PizzaCard pizza={sample} onShowDetail={() => {}} />
    )
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe(sample.image)
  })

  it('has a Detail button', () => {
    render(<PizzaCard pizza={sample} onShowDetail={() => {}} />)
    expect(screen.getByRole('button', { name: /detail/i })).toBeInTheDocument()
  })

  it('calls onShowDetail with the pizza when Detail clicked', () => {
    const handler = jest.fn()
    render(<PizzaCard pizza={sample} onShowDetail={handler} />)
    fireEvent.click(screen.getByRole('button', { name: /detail/i }))
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(sample)
  })
})
