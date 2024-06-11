import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HowItWorks.css';
import demoVideo from '../../assets/demo.mp4'; // Path to your MP4 video

const HowItWorks = () => {
  return (
    <Container fluid className="how-it-works-bg">
      <Container className="name h-100">
        <Row className="h-100 p-5">
          <Col xs={12} md={7}>
            <div className="how-it-works-title">
              <h1 className="text-white text-start mb-3">
                <i className="bi bi-activity"></i> &nbsp;How Herb Nexus Works
              </h1>
            </div>
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
      </Container>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="content-column">
            <div className="content-box">
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
            </div>
          </Col>
          <Col md={6} className="image-column">
            <div className="image-box">
              <video className="demo-video" controls>
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HowItWorks;
