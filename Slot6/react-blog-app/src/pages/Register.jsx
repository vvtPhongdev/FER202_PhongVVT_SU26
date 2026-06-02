import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import MyModal from '../components/MyModal';
import '../components/RegistrationForm.css';

function Register() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center align-items-center register-container-row">
        <Col md={8} lg={6}>
          <RegistrationForm onSuccess={handleSuccess} />
        </Col>
      </Row>

      {/* Modal báo đăng ký thành công */}
      <MyModal
        show={showModal}
        handleClose={handleModalClose}
        title="Đăng ký thành công"
        body="Tài khoản của bạn đã được tạo thành công! Hãy bắt đầu khám phá các bài viết hữu ích."
      />
    </Container>
  );
}

export default Register;
