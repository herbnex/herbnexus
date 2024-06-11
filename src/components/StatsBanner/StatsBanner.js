import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StatsBanner.css';

const StatsBanner = () => {
  return (
    <div className="stats-banner">
      <Container fluid className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-col">
            <h1 className="display-4">Connecting you with top herbalists</h1>
            <h2 className="text-highlight">100% online.</h2>
          </Col>
          <Col md={6} className="stats-col">
            <div className="stats">
              <div className="stat-item">
                <h3 className="display-5 text-highlight">1,234,567</h3>
                <p className="lead">Messages, chat, phone, video sessions</p>
              </div>
              <div className="stat-item">
                <h3 className="display-5 text-highlight">12,345</h3>
                <p className="lead">Accredited herbalists ready to help</p>
              </div>
              <div className="stat-item">
                <h3 className="display-5 text-highlight">123,456</h3>
                <p className="lead">People got help</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="wave"></div>
    </div>
  );
};

export default StatsBanner;
