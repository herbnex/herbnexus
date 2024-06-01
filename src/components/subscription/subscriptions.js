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

const SubscriptionForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Don't include return_url here
        },
        redirect: 'if_required'
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Optimistically update user state
        updateUser({ ...user, isSubscribed: true });
        window.location.href = 'https://develop--herbnexus.netlify.app/contact'; // Update with your actual URL
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="subscription-form">
      {clientSecret && <PaymentElement />}
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="subscribe-button mt-3"
      >
        {loading ? "Processing..." : "Subscribe for $50/month"}
      </Button>
    </Form>
  );
};

const Subscription = () => {
  const { user, updateUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (user) {
        try {
          const response = await axios.post(
            "/.netlify/functions/create-payment-intent",
            { userId: user.uid }
          );
          if (response.data.clientSecret && response.data.clientSecret.includes('_secret_')) {
            setClientSecret(response.data.clientSecret);
          } else {
            setErrorMessage('Invalid client secret format received.');
          }
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
      updateUser({ ...user, isSubscribed: true });
    }
  }, [user, updateUser]);

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
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <SubscriptionForm clientSecret={clientSecret} />
            </Elements>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Subscription;
