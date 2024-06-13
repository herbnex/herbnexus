import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HerbNexusAdditionalBanner.css';
import podcastImage from '../../assets/a.png'; // Replace with actual image path
import eventImage from '../../assets/b.png'; // Replace with actual image path

const HerbNexusAdditionalBanner = () => {
  return (
    <Container fluid className="herb-nexus-additional-banner">
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <Card className="mb-4 podcast-card">
              <Card.Body className="d-flex align-items-center">
                <div className="image-wrapper">
                  <img src={podcastImage} alt="Podcast" className="podcast-image img-fluid" />
                </div>
                <div className="ml-4">
                  <Card.Title className="podcast-title">Listen to our Podcast</Card.Title>
                  <Card.Text className="text-muted">Hosted by <strong>Tracy Young, TigerEye CEO</strong></Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 events-card">
              <Card.Body className="d-flex align-items-center">
                <div className="image-wrapper">
                  <img src={eventImage} alt="Event" className="event-image img-fluid" />
                </div>
                <div className="ml-4">
                  <Card.Title className="events-title">Attend our Events</Card.Title>
                  <Card.Text className="text-muted">Next up: <strong>Discover TigerEye</strong></Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HerbNexusAdditionalBanner;
