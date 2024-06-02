import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Signup.css";
import { auth, db } from '../../../Firebase/firebase.config'; // Adjust the path as necessary
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const Signup = () => {
  const { user, createAccountWithEmailPassword, error, setError, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  const refferer = location?.state?.from || { pathname: "/" };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: name })
          .then(() => {
            const userRef = doc(db, "users", userCredential.user.uid);
            return setDoc(userRef, { name, email });
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            history.replace(refferer);
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
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
      <Container fluid className="signup-heading">
        {error && <Error />}
      </Container>

      <Container className="signup-panel">
        <Row>
          {/* SIGN UP FORM  */}
          <Col xs={12} md={6}>
            <h1 className="title text-center">Sign Up</h1>
            <div className="signup d-flex flex-column justify-content-center h-100 pb-5">
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-pill ps-4"
                      type="text"
                      placeholder="Full Name"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-pill ps-4"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
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
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-pill ps-4"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        <h6 className="my-5 pt-5 text-center">
          Already have account? <NavLink to={{ pathname: "/login", state: { from: refferer } }}>Log In</NavLink> instead.
        </h6>
      </Container>
    </div>
  );
};

export default Signup;
