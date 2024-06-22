import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { Form, Button, Alert, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './PasswordReset.css';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const auth = getAuth();

  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password has been reset successfully.");
      history.push('/login');
    } catch (err) {
      setError("Please request a new password reset." );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="password-reset-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={8} md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="mb-4 text-center">Reset Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleResetPassword}>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;
