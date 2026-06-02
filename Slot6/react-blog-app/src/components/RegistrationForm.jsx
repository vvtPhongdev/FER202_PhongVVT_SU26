import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';

// SVG components cho biểu tượng con mắt hiển thị/ẩn mật khẩu
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
  </svg>
);

function RegistrationForm({ onSuccess }) {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  
  // Trạng thái hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field as the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, password, confirmPassword } = formData;

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email không đúng định dạng (VD: example@domain.com)';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else {
      if (password.length < 6) {
        newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên';
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ cái thường';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa';
      } else if (!/\d/.test(password)) {
        newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ số';
      } else if (!/[!@#$%^&*(),.?":{}|<>_+\-[\]\\/]/.test(password)) {
        newErrors.password = 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt';
      }
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setErrors({});
    setValidated(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <Card.Header className="bg-primary text-white text-center py-3">
        <h4 className="mb-0">Đăng ký tài khoản</h4>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className="fw-semibold">Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              isInvalid={validated && !!errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-semibold">Địa chỉ Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              isInvalid={validated && !!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                isInvalid={validated && !!errors.password}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="d-flex align-items-center"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Label className="fw-semibold">Xác nhận mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu để xác nhận"
                isInvalid={validated && !!errors.confirmPassword}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                type="button"
                className="d-flex align-items-center"
              >
                {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-between gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
              className="flex-grow-1 py-2"
            >
              Hủy bỏ (Cancel)
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="flex-grow-1 py-2 fw-semibold"
            >
              Đăng ký (Register)
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RegistrationForm;
