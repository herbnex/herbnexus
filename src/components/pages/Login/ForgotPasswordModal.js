import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        handleClose();
        setSuccess(null);  // Reset success message after closing
        setEmail('');  // Clear the email field
      }, 1000); // Close the modal after 3 seconds
      return () => clearTimeout(timer); // Clear timeout if modal is closed manually
    }
  }, [success, handleClose]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://herbnexus.io/reset-password', // Your custom URL
        handleCodeInApp: true,
      });
      setSuccess('Password reset email sent successfully.');
    } catch (err) {
      setError('Failed to send password reset email' );
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setError(null);
    setSuccess(null);
    setEmail('');
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleResetPassword}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Send Reset Email'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
