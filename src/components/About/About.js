import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.css";

const About = ({ home }) => {
  const tiles = [
    { icon: "bi bi-activity", title: "Personalized Herbal Advice" },
    { icon: "bi bi-shield-check", title: "Accredited Herbalists" },
    { icon: "bi bi-chat-dots", title: "24/7 Live Chat" },
    { icon: "bi bi-cash-coin", title: "Affordable Subscription" },
    { icon: "bi bi-heart", title: "Holistic Wellness" },
    { icon: "bi bi-people", title: "Community Support" },
    { icon: "bi bi-journal", title: "Expert Articles" },
    { icon: "bi bi-wind", title: "Natural Remedies" },
    { icon: "bi bi-globe", title: "Global Network" },
    { icon: "bi bi-patch-check", title: "Verified Practitioners" },
    { icon: "bi bi-lightning", title: "Quick Consultations" },
    { icon: "bi bi-flower1", title: "Eco-friendly Practices" },
  ];

  const displayedTiles = home ? tiles.slice(0, 4) : tiles;

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
          {/* <Col xs={12} md={12} className="my-2">
            <i className="bi bi-shield-plus text-white" style={{ fontSize: "5rem" }}></i>
          </Col>
          <Col xs={12} md={5}></Col>
          <Col xs={12} md={7}>
            <h5 className="text-white text-start mb-3">
              At Herb Nexus, we provide personalized herbal consultations with accredited herbalists. Our platform offers 24/7 live chat access to herbalists for a monthly subscription fee of $50, ensuring you get tailored herbal remedy recommendations whenever you need them.
            </h5>
          </Col> */}
        </Row>
      </Container>
      <Container>
        <Row>
          {displayedTiles.map((tile, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div className="service-grid bg-white text-main mx-auto my-3 p-3 text-center">
                <i className={tile.icon}></i>
                <h5>{tile.title}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default About;
