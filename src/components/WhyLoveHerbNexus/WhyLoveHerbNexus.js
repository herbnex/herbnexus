import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WhyLoveHerbNexus.css';

const WhyLoveHerbNexus = () => {
  return (
    <Container className="why-love-herbnexus">
      <section className="why-love-herbnexus-section">
        <div className="section-title">
          <h1>Why you'll love Herb Nexus</h1>
        </div>
        <Row className="align-items-center">
          <Col md={3} className="feature-column">
            <div className="feature-box">
              <i className="bi bi-person-check feature-icon"></i>
              <h3>Expert Practitioners</h3>
              <p>Accredited herbalists with extensive experience and verified credentials.</p>
            </div>
          </Col>
          <Col md={3} className="feature-column">
            <div className="feature-box">
              <i className="bi bi-currency-dollar feature-icon"></i>
              <h3>Cost Effective</h3>
              <p>Save money with affordable consultations compared to traditional in-person visits.</p>
            </div>
          </Col>
          <Col md={3} className="feature-column">
            <div className="feature-box">
              <i className="bi bi-heart feature-icon"></i>
              <h3>Personalized Care</h3>
              <p>Get tailored herbal recommendations and treatments specific to your needs.</p>
            </div>
          </Col>
          <Col md={3} className="feature-column">
            <div className="feature-box">
              <i className="bi bi-house feature-icon"></i>
              <h3>Convenience</h3>
              <p>Consult with herbalists from the comfort of your home at any time.</p>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default WhyLoveHerbNexus;
