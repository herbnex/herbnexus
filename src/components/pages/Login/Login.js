import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel, Alert, Spinner, Modal } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import "./Login.css";

const Login = () => {
  const { user, logInWithEmailandPassword, error: authError, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [show, setShow] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const refferer = location?.state?.from || { pathname: "/" };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setLoginError(""); // Reset login error
    try {
      await logInWithEmailandPassword(email, password);
    } catch (error) {
      setLoginError("Incorrect email or password");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      history.replace(refferer);
    }
  }, [user, history, refferer]);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {authError && <Error />}
        {loginError && <Alert variant="danger">{loginError}</Alert>}
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-pill ps-4"
                type="email"
                placeholder="name@example.com"
                isInvalid={!!validationErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-pill ps-4"
                type="password"
                placeholder="Password"
                isInvalid={!!validationErrors.password}
                required
              />
              <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Signing in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <NavLink to={{ pathname: "/signup", state: { from: refferer } }}>Sign Up</NavLink>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
