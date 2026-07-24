import { render, screen, fireEvent } from '@testing-library/react'
import Pizzas from '../components/Pizzas'
import { PizzasData } from '../shared/ListOfPizzas'

describe('Pizzas component', () => {
  it('renders a card for every pizza in the data', () => {
    const { container } = render(<Pizzas />)
    const cards = container.querySelectorAll('.card')
    expect(cards.length).toBe(PizzasData.length)
  })

  it('renders the name of the first pizza', () => {
    render(<Pizzas />)
    expect(screen.getByText(PizzasData[0].pizzaName)).toBeInTheDocument()
  })

  it('opens the modal showing detail when a Detail button is clicked', () => {
    render(<Pizzas />)
    const buttons = screen.getAllByRole('button', { name: /detail/i })
    fireEvent.click(buttons[0])
    const matches = screen.getAllByText(PizzasData[0].pizzaName)
    expect(matches.length).toBeGreaterThan(1)
  })

  it('closes the modal when Close button is clicked', () => {
    render(<Pizzas />)
    const buttons = screen.getAllByRole('button', { name: /detail/i })
    fireEvent.click(buttons[0])
    fireEvent.click(screen.getByText('Close'))
    expect(
      screen.queryByText(PizzasData[0].description)
    ).not.toBeInTheDocument()
  })
})
