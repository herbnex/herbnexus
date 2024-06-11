import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowItWorks.css';
import demoVideo from '../../assets/demo.mp4'; // Path to your MP4 video

const HowItWorks = () => {
  return (
    <Container className="how-it-works">
      <h2 className="how-it-works-title">How it works</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="step">
            <h3>1. Ask your question</h3>
            <p>Tell us your situation. Ask any question in any category, anytime you want.</p>
          </div>
          <div className="step">
            <h3>2. Let us match you</h3>
            <p>We’ll connect you in minutes with the best expert for your question.</p>
          </div>
          <div className="step">
            <h3>3. Chat with an Expert</h3>
            <p>Talk, text, or chat till you have your answer. Members get unlimited conversations 24/7, so you’ll always have an expert ready to help.</p>
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
