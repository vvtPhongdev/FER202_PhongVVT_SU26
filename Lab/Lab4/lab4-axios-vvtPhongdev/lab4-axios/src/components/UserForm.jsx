import React, { useState, useEffect } from 'react';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  role: 'User',
  status: 'active',
};

export default function UserForm({ show, onClose, onSubmit, user, loading, error, isAdmin }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'User',
        status: user.status || 'active',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [user, show]);

  if (!show) return null;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) {
      e.fullName = 'Họ tên không được để trống.';
    } else if (form.fullName.trim().length < 3) {
      e.fullName = 'Họ tên phải có ít nhất 3 ký tự.';
    }

    if (!form.email.trim()) {
      e.email = 'Email không được để trống.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Email không hợp lệ.';
    }

    if (!form.phone.trim()) {
      e.phone = 'Số điện thoại không được để trống.';
    } else if (!/^0\d{9}$/.test(form.phone)) {
      e.phone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';
    }

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div className="custom-modal-content custom-modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">
            {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          </h5>
          <button type="button" className="custom-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="custom-modal-body">
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <div className="form-group mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                className={`form-control-custom ${errors.fullName ? 'is-invalid' : ''}`}
                value={form.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && <div className="invalid-feedback-custom">{errors.fullName}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
              {errors.email && <div className="invalid-feedback-custom">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                className={`form-control-custom ${errors.phone ? 'is-invalid' : ''}`}
                value={form.phone}
                onChange={handleChange}
                placeholder="0xxxxxxxxx"
              />
              {errors.phone && <div className="invalid-feedback-custom">{errors.phone}</div>}
            </div>

            <div className="row">
              <div className={isAdmin ? "col-md-6 mb-3" : "col-md-12 mb-3"}>
                <label className="form-label">Vai trò</label>
                <select
                  name="role"
                  className="form-select-custom"
                  value={form.role}
                  onChange={handleChange}
                  disabled={!isAdmin}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
              </div>

              {isAdmin && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Trạng thái</label>
                  <select
                    name="status"
                    className="form-select-custom"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="active">Kích hoạt</option>
                    <option value="inactive">Khóa</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="custom-modal-footer">
            <button
              type="button"
              className="btn btn-secondary-custom"
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary-custom" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang lưu...
                </>
              ) : (
                'Lưu thay đổi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
