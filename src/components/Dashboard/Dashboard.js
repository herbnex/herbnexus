import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Manage Subscription</Card.Header>
            <Card.Body>
              <Card.Text>
                View and manage your subscription details.
              </Card.Text>
              <NavLink to="/subscribe">
                <Button variant="primary">Go to Subscription</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Appointments</Card.Header>
            <Card.Body>
              <Card.Text>
                View and manage your appointments with herbalists.
              </Card.Text>
              <NavLink to="/appointments">
                <Button variant="primary">Go to Appointments</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Text>
                View and update your profile information.
              </Card.Text>
              <NavLink to="/profile">
                <Button variant="primary">Go to Profile</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Consultation History</Card.Header>
            <Card.Body>
              <Card.Text>
                View your past consultations with herbalists.
              </Card.Text>
              <NavLink to="/history">
                <Button variant="primary">View History</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Messages</Card.Header>
            <Card.Body>
              <Card.Text>
                Check your messages from herbalists.
              </Card.Text>
              <NavLink to="/messages">
                <Button variant="primary">Go to Messages</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Settings</Card.Header>
            <Card.Body>
              <Card.Text>
                Update your account settings and preferences.
              </Card.Text>
              <NavLink to="/settings">
                <Button variant="primary">Go to Settings</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
