import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './DeliveryPolicy.css';

const DeliveryPolicy = () => {
  return (
    <Container className="policy-page">
      <Card>
        <Card.Header>
          <h2>Delivery Policy</h2>
        </Card.Header>
        <Card.Body>
          <h4>Introduction</h4>
          <p>
            Herb Nexus Herbal Shop is committed to delivering your orders in a timely and efficient manner. We offer
            various shipping options to meet your needs, and we strive to process and ship all orders within 1-2 business
            days.
          </p>

          <h4>Shipping Methods</h4>
          <p>
            Delivery times may vary depending on your location and the shipping method selected. Standard shipping
            typically takes 5-7 business days, while expedited shipping options are available for faster delivery.
          </p>

          <h4>Contact Us</h4>
          <p>
            We will provide tracking information for your order once it has been shipped. If you experience any issues
            with your delivery, please contact our customer service team for assistance.
            <br />
            Email: support@herbnexus.io <br />
            Address: 6161 Tisdall St, Vancouver, Canada
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeliveryPolicy;


