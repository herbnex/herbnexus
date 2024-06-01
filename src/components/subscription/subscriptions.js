import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import useAuth from '../../../src/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import './subscription.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Subscription = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (user) {
        try {
          const response = await axios.post(
            "/.netlify/functions/create-payment-intent",
            { userId: user.uid }
          );
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error("Error fetching client secret:", error);
          setErrorMessage('An error occurred while initializing the payment process. Please try again.');
        }
      }
    };
    fetchClientSecret();
  }, [user]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectStatus = queryParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setSubscriptionSuccess(true);
      updateUser({ ...user, isSubscribed: true });
    }
  }, [user, updateUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://develop--herbnexus.netlify.app/contact`, // Update with your actual URL
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="subscription-container">
      <Row>
        <Col md={6} className="subscription-faq">
          <h2>Why Subscribe?</h2>
          <ul>
            <li>Access to accredited herbal practitioners 24/7</li>
            <li>Personalized herbal recommendations</li>
            <li>Exclusive content and discounts</li>
          </ul>
          <h2>Common Questions</h2>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> What does the subscription include?
          </h5>
          <p>Your subscription includes 24/7 access to accredited herbal practitioners, personalized recommendations, and more.</p>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> How do I cancel my subscription?
          </h5>
          <p>You can cancel your subscription at any time through your account settings.</p>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> Is my payment information secure?
          </h5>
          <p>Yes, we use Stripe to process payments, ensuring your information is secure.</p>
        </Col>
        <Col md={6}>
          <div className="subscription-header">
            <h2>Subscribe to Herb Nexus</h2>
            <p>Get 24/7 access to accredited herbal practitioners for only $50/month.</p>
          </div>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit} className="subscription-form">
            <h5>
              <FontAwesomeIcon icon={faEnvelope} /> Contact Information
            </h5>
            <Form.Group controlId="contact">
              <Form.Label>Email or phone number</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email or phone number"
                value={user.email}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="newsOffers">
              <Form.Check type="checkbox" label="Email me with news and offers" />
            </Form.Group>
            <h5>
              <FontAwesomeIcon icon={faAddressCard} /> Shipping Address
            </h5>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={user.firstName}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={user.lastName}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={user.address}
                readOnly
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={user.city}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="zip">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ZIP Code"
                    value={user.zip}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="divider">
              <span>Payment Details</span>
            </div>
            {clientSecret && (
              <Form.Group>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentElement />
                </Elements>
              </Form.Group>
            )}
            <Button
              type="submit"
              disabled={!stripe || loading}
              className="subscribe-button mt-3"
            >
              {loading ? "Processing..." : "Subscribe for $50/month"}
            </Button>
          </Form>
          {subscriptionSuccess && (
            <Alert variant="success" className="mt-3">
              Thank you for subscribing! You now have access to our premium features.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Subscription;
