import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './RegistrationForm.css';

function MyModal({ show, handleClose, title, body }) {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>{title || 'Thông báo'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4 text-center">
        <div className="modal-success-icon mb-3">
          ✔️
        </div>
        <p className="fs-5 mb-0">{body}</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={handleClose} className="px-4">
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
