import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowItWorks.css';
import demoGif from '../../assets/demo.gif'; // Path to your GIF

const HowItWorks = () => {
  return (
    <Container className="how-it-works">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="step">
            <h2>Step 1: Sign Up</h2>
            <p>Create your account to get started. It's quick and easy.</p>
          </div>
          <div className="step">
            <h2>Step 2: Connect</h2>
            <p>Connect with accredited herbalists via our 24/7 live chat.</p>
          </div>
          <div className="step">
            <h2>Step 3: Get Personalized Advice</h2>
            <p>Receive tailored herbal remedies and ongoing support.</p>
          </div>
        </Col>
        <Col md={6}>
          <img src={demoGif} alt="How Herb Nexus Works" className="demo-gif" />
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWorks;
