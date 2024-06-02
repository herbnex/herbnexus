import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel, Alert } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Login.css";

const Login = () => {
  const { user, logInWithEmailandPassword, error, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();
  const location = useLocation();

  const refferer = location?.state?.from || { pathname: "/" };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    logInWithEmailandPassword(email, password);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      history.replace(refferer);
    }
  }, [user, history, refferer]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Container fluid className="login-heading">
        {error && <Error />}
      </Container>

      <Container className="login-panel">
        <Row>
          <Col xs={12} md={6}>
            <h1 className="title text-center">Login</h1>
            <div className="login d-flex flex-column justify-content-center h-100 pb-5">
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

                <Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit">
                  Log In
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        <h6 className="my-5 pt-5 text-center">
          No Account yet? <NavLink to={{ pathname: "/signup", state: { from: refferer } }}>Sign Up</NavLink> instead.
        </h6>
      </Container>
    </div>
  );
};

export default Login;
