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
          <strong>Domestic Shipping:</strong>

<strong>Standard Shipping:</strong> 2 – 10 business days for transit*

<strong>UPS Standard Shipping:</strong> 1 - 6 business days for transit* 

<strong>Express Shipping:</strong> 2 business days for transit*

*UPS does not deliver to a PO Box, must enter a physical address.

*All shipping methods take 1-5 business days for processing prior to shipping.

Please note: All transit times are estimates and not a guarantee. If carrier or customs delays occur and/or the package is lost an investigation must be opened prior to reshipping.

<strong>International Shipping</strong>

We strongly suggest International Customers check with their local customs agency for any Rules, Regulations or Restrictions on the importation of Dietary Herbal Supplements and/or our Herbal Formulas listed ingredients prior to placing an order. 

<strong>Economy Shipping:</strong> Up to 30 days to reach customs*

<strong>Standard Shipping:</strong> 6 – 10 business days to reach customs*

*All shipping methods take 1-5 business days for processing prior to shipping.

Please note: All transit times are estimates and not a guarantee. If carrier or customs delays occur an investigation must be opened prior to reshipping.


          </p>

          <h4>Contact Us</h4>
          <p>
            We will provide tracking information for your order once it has been shipped. If you experience any issues
            with your delivery, please contact our customer service team for assistance.
            <br />
            Email: support@herbnexus.io <br />
            
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeliveryPolicy;


