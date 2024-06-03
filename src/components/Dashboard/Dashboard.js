import React from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import ManageSubscription from './ManageSubscription';
import Appointments from './Appointments';
import UserProfile from './UserProfile';
import ConsultationHistory from './ConsultationHistory';
import Messages from './Messages';
import Settings from './Settings';
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
        <Col>
          <Tabs defaultActiveKey="subscription" id="dashboard-tabs" className="mb-3">
            <Tab eventKey="subscription" title="Manage Subscription">
              <ManageSubscription />
            </Tab>
            <Tab eventKey="appointments" title="Appointments">
              <Appointments />
            </Tab>
            <Tab eventKey="profile" title="User Profile">
              <UserProfile />
            </Tab>
            <Tab eventKey="history" title="Consultation History">
              <ConsultationHistory />
            </Tab>
            <Tab eventKey="messages" title="Messages">
              <Messages />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <Settings />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
