import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowItWorks.css';
import demoVideo from '../../assets/demo.mp4'; // Path to your MP4 video

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
          <video className="demo-video" controls>
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWorks;
