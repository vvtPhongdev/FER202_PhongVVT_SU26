import { Modal, Button } from 'react-bootstrap'

/**
 * ModalConfirm — Reusable confirmation dialog.
 *
 * Props:
 *   show          {boolean}   hiển thị/ẩn modal
 *   title         {string}    tiêu đề modal
 *   message       {ReactNode} nội dung xác nhận (có thể là JSX)
 *   onConfirm     {Function}  callback khi bấm nút xác nhận
 *   onCancel      {Function}  callback khi đóng / bấm Cancel
 *   confirmText   {string}    text nút xác nhận (mặc định: "Confirm")
 *   confirmVariant{string}    variant Bootstrap nút xác nhận (mặc định: "danger")
 *   cancelText    {string}    text nút hủy (mặc định: "Cancel")
 */
export default function ModalConfirm({
  show,
  title = 'Confirm',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  confirmVariant = 'danger',
  cancelText = 'Cancel',
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
