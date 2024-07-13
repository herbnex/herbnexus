import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const paymentIntentId = query.get('payment_intent');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`/.netlify/functions/fetch-payment-intent?paymentIntentId=${paymentIntentId}`);
        setPaymentDetails(response.data);
      } catch (err) {
        setError('Failed to fetch payment details.');
      } finally {
        setLoading(false);
      }
    };

    if (paymentIntentId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
      setError('Payment Intent ID is missing.');
    }
  }, [paymentIntentId]);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8" className="text-center">
          <h2>Payment Successful</h2>
          <p>Thank you for your purchase!</p>
          <p><strong>Order ID:</strong> {paymentDetails.id}</p>
          <p><strong>Amount:</strong> ${(paymentDetails.amount_received / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}</p>
          <p><strong>Receipt:</strong> <a href={paymentDetails.charges.data[0].receipt_url} target="_blank" rel="noopener noreferrer">View Receipt</a></p>
          <h3>Shipping Details</h3>
          <p><strong>Recipient:</strong> {paymentDetails.shipping.name}</p>
          <p><strong>Address:</strong> {paymentDetails.shipping.address.line1}, {paymentDetails.shipping.address.city}, {paymentDetails.shipping.address.state}, {paymentDetails.shipping.address.postal_code}, {paymentDetails.shipping.address.country}</p>
          <p><strong>Phone:</strong> {paymentDetails.shipping.phone}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
