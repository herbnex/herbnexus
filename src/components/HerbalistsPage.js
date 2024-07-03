import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { db } from '../Firebase/firebase.config'; // Make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';
import './HerbalistsPage.css';

const HerbalistsPage = () => {
  const [consultations, setConsultations] = useState(40);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    certification: '',
    experience: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const handleConsultationsChange = (e) => {
    setConsultations(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'herbalistApplications'), {
        ...formData,
        date: new Date().toLocaleDateString(),
      });
      setSubmitted(true);
      setError('');
    } catch (error) {
      setError('Error submitting application. Please try again.');
    }
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const estimatedEarnings = (consultations / 2) * 70;

  return (
    <StyledContainer>
      <Header>
        <h1>Join Herb Nexus as a Herbalist</h1>
        <p>Empower people with your knowledge of herbal medicine</p>
      </Header>

      <Row className="my-5">
        <Col md={6}>
          <StyledCard>
            <Card.Body>
              <Card.Title>Why Join Us?</Card.Title>
              <Card.Text>
                At Herb Nexus, we provide a platform that empowers herbalists to offer their services independently,
                supported by a robust community and extensive resources. Join us to make a difference in people's lives.
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={6}>
          <StyledCard>
            <Card.Body>
              <Card.Title>What Our Herbalists Say</Card.Title>
              <Card.Text>
                "Herb Nexus has given me the opportunity to reach a wider audience and provide valuable insights into
                herbal medicine. It's a fulfilling experience."
              </Card.Text>
              <Card.Text className="text-end">
                - Fiona Carr, Certified Herbalist
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <Row className="my-5 text-center">
        <Col>
          <SectionTitle>Estimated Earnings with Herb Nexus</SectionTitle>
          <StyledCard>
            <Card.Body>
              <Form.Group controlId="consultationsRange">
                <Form.Label>Video consultations per month</Form.Label>
                <Form.Control
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={consultations}
                  onChange={handleConsultationsChange}
                />
                <div className="range-labels">
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                  <span>60</span>
                </div>
              </Form.Group>
              <h3 className="mt-4">Estimated earnings</h3>
              <Earnings>${estimatedEarnings.toFixed(2)} per month</Earnings>
              <p>Earn $70 per every two consultations</p>
              <StyledButton variant="success" onClick={scrollToForm}>Get started</StyledButton>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <SectionTitle>Requirements</SectionTitle>
          <ul className="requirements-list">
            <li>Certification or degree in herbal medicine</li>
            <li>At least 2 years of practical experience</li>
            <li>Ability to provide personalized herbal consultations</li>
            <li>Strong communication skills</li>
            <li>Commitment to ongoing education and professional development</li>
          </ul>
        </Col>
      </Row>

      <Row className="my-5 text-center" ref={formRef}>
        <Col>
          <SectionTitle>Application</SectionTitle>
          {submitted ? (
            <StyledCard>
              <Card.Body>
                <Card.Title>Application Submitted</Card.Title>
                <Card.Text>
                  Thank you for your application. We will review your information and get back to you soon.
                </Card.Text>
              </Card.Body>
            </StyledCard>
          ) : (
            <FormWrapper onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Certification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your certification"
                  name="certification"
                  value={formData.certification}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your years of experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us more about yourself"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <StyledButton variant="success" type="submit">Submit Application</StyledButton>
            </FormWrapper>
          )}
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <SectionTitle>Herb Nexus vs. Traditional In-Clinic Consultations</SectionTitle>
          <ComparisonTable>
            <thead>
              <tr>
                <th>Features</th>
                <th>Herb Nexus</th>
                <th>In-Clinic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Work from anywhere</td>
                <td>✔️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Set your own hours</td>
                <td>✔️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>See clients in person</td>
                <td>❌</td>
                <td>✔️</td>
              </tr>
              <tr>
                <td>Clinical autonomy</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
              <tr>
                <td>No overhead or marketing costs</td>
                <td>✔️</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Access to the world's largest Alternative Medical Practitioner network </td>
                <td>✔️</td>
                <td>❌</td>
              </tr>
            </tbody>
          </ComparisonTable>
        </Col>
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 40px 20px;
  background-color: white;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: #39cabb;
    font-size: 2.5em;
  }

  p {
    color: #2d3e50;
    font-size: 1.2em;
  }
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 10px;

  .card-title {
    text-align: center;
    color: #2d3e50;
    font-size: 1.5em;
  }

  .card-body {
    text-align: justify;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #39cabb;
  font-size: 2em;
  margin-bottom: 20px;
`;

const Earnings = styled.h2`
  color: #2d3e50;
  font-size: 2em;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  background-color: #39cabb;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 1.2em;
  &:hover {
    background-color: #453f85;
  }
`;

const FormWrapper = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .form-control {
    border-radius: 10px;
    padding: 10px;
  }
`;

const ComparisonTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #453f85;
    color: white;
    text-align: center;
  }

  td {
    text-align: center;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export default HerbalistsPage;
