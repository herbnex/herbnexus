import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowItWorks.css';
import demoVideo from '../../assets/demo.mp4'; // Path to your MP4 video
import SectionTitle from "../SectionTitle/SectionTitle";

const HowItWorks = () => {
  return (
    <Container>
      <section className="how-it-works-section">
        <SectionTitle>
          <h4>How It Works</h4>
          <h1>Understand the Process</h1>
        </SectionTitle>
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
          <Col md={6} className="video-column">
            <div className="video-box">
              <video className="demo-video" autoPlay loop muted>
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default HowItWorks;
