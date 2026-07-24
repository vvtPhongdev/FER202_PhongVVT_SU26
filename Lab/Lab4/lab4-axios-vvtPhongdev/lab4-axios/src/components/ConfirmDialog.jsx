import React from 'react';

export default function ConfirmDialog({ show, onClose, onConfirm, title, message }) {
  if (!show) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">{title || 'Xác nhận xóa'}</h5>
          <button type="button" className="custom-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <p>{message || 'Bạn có chắc chắn muốn thực hiện hành động này?'}</p>
        </div>
        <div className="custom-modal-footer">
          <button type="button" className="btn btn-secondary-custom" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="btn btn-danger-custom" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
