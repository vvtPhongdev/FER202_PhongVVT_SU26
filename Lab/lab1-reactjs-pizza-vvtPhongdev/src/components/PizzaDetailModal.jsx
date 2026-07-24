import React from 'react'
import { Modal, Button } from 'react-bootstrap'

// TODO-PIZZAMODAL-1: Render a Modal component to show pizza details
// Props:
//   - show    (boolean)       : whether the modal is visible
//   - pizza   (object | null) : the pizza currently selected (may be null)
//   - onClose (function)      : callback to close the modal
//
// Requirements:
//   1. Use <Modal show={show} onHide={onClose}> from react-bootstrap
//   2. <Modal.Title> displays pizza.pizzaName (when pizza is not null)
//   3. <Modal.Body> contains:
//      - <img src={pizza.image} />
//      - <p>{pizza.description}</p>
//   4. <Modal.Footer> has a <Button> labelled "Close" that calls onClose on click
export default function PizzaDetailModal({ show, pizza, onClose }) {
  return null
}
