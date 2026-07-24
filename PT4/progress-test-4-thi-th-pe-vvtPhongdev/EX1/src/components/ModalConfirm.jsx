import { Modal, Button } from 'react-bootstrap'

export default function ModalConfirm({ show, title, body, onConfirm, onCancel, confirmVariant = 'danger', confirmLabel = 'Delete' }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
      </Modal.Footer>
    </Modal>
  )
}
