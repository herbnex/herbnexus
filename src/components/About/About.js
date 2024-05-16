import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <Container fluid className="about-bg">
      <Container className="name h-100">
        <Row className="h-100 p-5">
          <Col xs={12} md={7}>
            <h1 className="text-white text-start mb-3">
              <i className="bi bi-activity"></i> &nbsp;Herb Nexus: Connecting You with Accredited Herbalists Worldwide
            </h1>
          </Col>
          <Col xs={12} md={4}></Col>
          <Col xs={12} md={12} className="my-2">
            <i className="bi bi-shield-plus text-white" style={{ fontSize: "5rem" }}></i>
          </Col>
          <Col xs={12} md={5}></Col>
          <Col xs={12} md={7}>
            <h5 className="text-white text-start mb-3">
              At Herb Nexus, we provide personalized herbal consultations with accredited herbalists. Our platform offers 24/7 live chat access to herbalists for a monthly subscription fee of $50, ensuring you get tailored herbal remedy recommendations whenever you need them.
            </h5>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-activity"></i>
              <h5>Personalized Herbal Advice</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-shield-check"></i>
              <h5>Accredited Herbalists</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-chat-dots"></i>
              <h5>24/7 Live Chat</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-cash-coin"></i>
              <h5>Affordable Subscription</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-heart"></i>
              <h5>Holistic Wellness</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-people"></i>
              <h5>Community Support</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-journal"></i>
              <h5>Expert Articles</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-wind"></i>
              <h5>Natural Remedies</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-globe"></i>
              <h5>Global Network</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-patch-check"></i>
              <h5>Verified Practitioners</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-lightning"></i>
              <h5>Quick Consultations</h5>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
              <i className="bi bi-flower1"></i>
              <h5>Eco-friendly Practices</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default About;
