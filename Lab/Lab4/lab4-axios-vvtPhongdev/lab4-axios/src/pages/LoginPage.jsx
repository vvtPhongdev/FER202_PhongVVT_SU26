import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

export default function LoginPage() {
  const { login, error: apiError, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!username.trim() || !password.trim()) {
      setValidationError('Tên đăng nhập và mật khẩu không được để trống.');
      return;
    }

    const success = await login(username, password);
    if (success) {
      navigate('/users');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>ĐĂNG NHẬP DỰ ÁN</h2>
          <p>Hệ thống Quản lý Thành viên • FER202</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {validationError && (
            <div className="alert alert-danger custom-alert">{validationError}</div>
          )}
          {apiError && <div className="alert alert-danger custom-alert">{apiError}</div>}

          <div className="form-group mb-3 text-start">
            <label className="form-label text-light-custom">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control-custom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username (ví dụ: admin)"
              disabled={loading}
            />
          </div>

          <div className="form-group mb-4 text-start">
            <label className="form-label text-light-custom">Mật khẩu</label>
            <input
              type="password"
              className="form-control-custom"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu (ví dụ: 123456)"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary-gradient w-100 py-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Đang xác thực...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
