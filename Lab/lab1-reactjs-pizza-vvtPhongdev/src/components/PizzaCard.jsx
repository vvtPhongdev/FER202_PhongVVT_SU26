import React from 'react'
import { Card, Button } from 'react-bootstrap'

// TODO-PIZZACARD-1: Render a Card component for a single pizza
// Props:
//   - pizza   (object)   : the pizza object to display
//   - onShowDetail (function) : callback called with the pizza object when Detail button is clicked
//
// Requirements:
//   1. Render a <Card> from react-bootstrap
//   2. <Card.Img variant="top" src={pizza.image} />
//   3. <Card.Title> showing pizza.pizzaName
//   4. <Card.Text> showing pizza.category
//   5. A <Button> with label "Detail" — on click, call onShowDetail(pizza)
export default function PizzaCard({ pizza, onShowDetail }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pizza.image} />    
      <Card.Body>
        <Card.Title>{pizza.pizzaName}</Card.Title>
        <Card.Text>{pizza.category}</Card.Text>
        <Button variant="primary" onClick={() => onShowDetail(pizza)}>Detail</Button>
      </Card.Body>
    </Card>
  )
}