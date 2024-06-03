import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update user profile logic here
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={user?.displayName} />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={user?.email} readOnly />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Change password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
