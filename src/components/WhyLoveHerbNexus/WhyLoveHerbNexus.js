import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WhyLoveHerbNexus.css';
import mobileimg from '../../assets/why-love-ja-mobile-new.png'; // Path to your mobile image
import desktopimg from '../../assets/why-love-ja.png'; // Path to your desktop image

const WhyLoveHerbNexus = () => {
  return (
    <Container className="why-love-herbnexus">
      <section className="why-love-herbnexus-section">
      <SectionTitle>
          <h4>Why you'll love Herb Nexus</h4>
          <h1>The World's Largest Network of Alternative Medicine Practioners</h1>
        </SectionTitle>
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
      <div className="image-container">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileimg} />
          <source media="(min-width: 768px)" srcSet={desktopimg} />
          <img src={desktopimg} alt="Herb Nexus" className="bottom-image" />
        </picture>
      </div>
    </Container>
  );
};

export default WhyLoveHerbNexus;
