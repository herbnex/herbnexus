import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading/Loading'; // Adjust the path to your Loading component
import './subscription.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const SubscriptionForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

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
          return_url: 'https://herbnexus.io/contact',
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Redirect to handle additional authentication
        window.location.href = paymentIntent.next_action.redirect_to_url.url;
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setRedirecting(true);
        // Update user subscription status in the database
        await axios.post('/.netlify/functions/create-payment-intent', { paymentIntentId: paymentIntent.id, userId: user.uid });
        updateUser({ ...user, isSubscribed: true });
        window.location.href = 'https://herbnexus.io/contact';
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectStatus = queryParams.get('redirect_status');
    const paymentIntentId = queryParams.get('payment_intent');

    if (redirectStatus === 'succeeded' && paymentIntentId) {
      const verifyPaymentIntent = async () => {
        try {
          const response = await axios.post('/.netlify/functions/create-payment-intent', { paymentIntentId, userId: user.uid });
          if (response.data.success) {
            updateUser({ ...user, isSubscribed: true });
            window.location.href = 'https://herbnexus.io/contact';
          }
        } catch (error) {
          console.error('Error verifying payment intent:', error);
        }
      };

      verifyPaymentIntent();
    }
  }, [user, updateUser]);

  return (
    <Form onSubmit={handleSubmit} className="subscription-form">
      {clientSecret && <PaymentElement />}
      <Button
        type="submit"
        disabled={!stripe || loading || redirecting}
        className="subscribe-button mt-3"
      >
        {loading || redirecting ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {redirecting ? "Redirecting..." : "Processing..."}
          </>
        ) : (
          "Subscribe for $100/month"
        )}
      </Button>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  );
};

const Subscription = () => {
  const { user, updateUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

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
          setErrorMessage('An error occurred while initializing the payment process. Please try again.');
        }
      }
    };
    fetchClientSecret();

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <Container className="subscription-container">
      <Row>
        <Col md={6} className="subscription-faq">
          <h2>Why Subscribe?</h2>
          <ul>
            <li>Access to two (2) video chat Herbal Consultations per month with accredited herbal practitioners 24/7</li>
            <li>Personalized herbal recommendations</li>
            <li>Exclusive discounts on Herbal Products</li>
          </ul>
          <h2>Common Questions</h2>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> What does the subscription include?
          </h5>
          <p>Your subscription includes two (2) video chat Herbal Consultations per month with accredited herbal practitioners, personalized herbal protocol, recommendations, and more.</p>
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
            <h2>Subscribe for $100 CAD Monthly</h2>
            <p>Two (2) video chat Herbal Consultations per month for only $100/month.</p>
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
