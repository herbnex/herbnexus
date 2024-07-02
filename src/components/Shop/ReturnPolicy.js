import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './ReturnPolicy.css';

const ReturnPolicy = () => {
  return (
    <Container className="policy-page">
      <Card>
        <Card.Header>
          <h2>Return Policy</h2>
        </Card.Header>
        <Card.Body>
          <h4>Introduction</h4>
          <p>
            At Herb Nexus Herbal Shop, we want you to be completely satisfied with your purchase. If you are not
            satisfied with your order for any reason, you may return it within 30 days of receipt for a full refund or
            exchange.
          </p>

          <h4>Return Instructions</h4>
          <p>
            To initiate a return, please contact our customer service team with your order details. We will provide you
            with instructions on how to return your item(s). Please note that returned items must be in their original
            packaging and unused condition.
          </p>

          <h4>Refund Policy</h4>
          <p>
            Refunds will be processed to the original payment method within 5-7 business days after we receive your
            return. Shipping costs are non-refundable unless the return is due to an error on our part.
          </p>

          <h4>Contact Us</h4>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: support@herbnexus.io <br />
            Address: 6161 Tisdall St, Vancouver, Canada
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReturnPolicy;

