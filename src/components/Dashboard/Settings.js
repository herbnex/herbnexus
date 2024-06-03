import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const Settings = () => {
  const { user, updateUserSettings } = useAuth();

  const handleSettingsChange = (event) => {
    event.preventDefault();
    // Update user settings logic here
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Settings</h1>
          <Form onSubmit={handleSettingsChange}>
            <Form.Group controlId="formNotifications">
              <Form.Check 
                type="checkbox"
                label="Email Notifications"
                defaultChecked={user?.settings?.emailNotifications}
              />
            </Form.Group>
            <Form.Group controlId="formPrivacy" className="mt-3">
              <Form.Check 
                type="checkbox"
                label="Profile Privacy"
                defaultChecked={user?.settings?.profilePrivacy}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Settings
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
