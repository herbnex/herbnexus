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
          Please double-check your entire order upon arrival. No product claims will be honored unless made within 7 days of receipt of goods. If your order has been damaged or appears to have been opened during shipping, please keep it in the original packaging and notify us immediately. 
          </p>

          <h4>Return Instructions</h4>
          <p>
          All Returns/Exchanges must have prior authorization from a Staff Member. 

We accept unopened Tincture and Glycerin formulas ONLY, within 7 days of receipt of goods. We gladly accept unopened returns/exchanges due to our error (bottle seal MUST be intact). Any returns not due to our error are subject to a 20% restocking fee.

Loose teas, Powder blends, Salves, Capsulated formulas, Kits and Sale Items cannot be returned, no exceptions!

Any items returned without prior authorization will be considered a donation and shall be equally distributed to less fortunate customers.

Return shipping costs are the customers responsibility.

Please email contact@herbnexus.io with any return inquiries. 
          </p>

          <h4>Refund Policy</h4>
          <p>
          Once an Authorized Return is received and inspected for its integrity, an email notification will be sent. If approved, your refund will be issued back to the original form of payment. 

Please note: Refunds take up to 1 week to process after the authorized Returned product is received.
          </p>

          <h4>Contact Us</h4>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: support@herbnexus.io <br />
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReturnPolicy;

