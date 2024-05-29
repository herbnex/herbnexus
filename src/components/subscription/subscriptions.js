import React, { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import './subscription.css';

const Subscription = ({ clientSecret, user, updateUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [contact, setContact] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handlePaymentSuccess = useCallback(async () => {
    const paymentIntentClientSecret = new URLSearchParams(location.search).get('payment_intent_client_secret');
    if (!stripe || !paymentIntentClientSecret) return;

    try {
      const { paymentIntent, error } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);

      if (error) {
        setErrorMessage(error.message || 'An error occurred while trying to make payment');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        try {
          const response = await axios.post('/.netlify/functions/updateSubscription', {
            userId: user.uid,
            isSubscribed: true,
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });

          if (response.status === 200) {
            console.log("Subscription update successful", response.data);
            await updateUser(user.uid);
            history.replace('/contact');
          } else {
            throw new Error('Failed to update subscription');
          }
        } catch (updateError) {
          console.error("Error updating subscription:", updateError);
          setErrorMessage('An error occurred while updating your subscription. Please try again.');
        }
      } else {
        setErrorMessage('Payment was not successful.');
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setErrorMessage('An error occurred while processing your subscription. Please try again.');
    }
  }, [stripe, user, location, history, updateUser]);

  useEffect(() => {
    const redirectStatus = new URLSearchParams(location.search).get('redirect_status');
    if (redirectStatus === 'succeeded') {
      handlePaymentSuccess();
    }
  }, [handlePaymentSuccess, location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/subscribe`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
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
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="zip">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ZIP Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="divider">
              <span>Payment Details</span>
            </div>
            {clientSecret && (
              <Form.Group>
                <PaymentElement />
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
        </Col>
      </Row>
    </Container>
  );
};


import React, { useState, useEffect, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import useAuth from '../../../src/hooks/useAuth';
import Subscription from './Subscription';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const SubscriptionWrapper = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { user, updateUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user) return;
      try {
        const { data } = await axios.post("/.netlify/functions/create-payment-intent", { userId: user.uid });
        setClientSecret(data.clientSecret);
        console.log("Client secret received:", data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setErrorMessage("Error creating payment intent.");
      }
    };

    createPaymentIntent();
  }, [user]);

  return (
    clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Subscription clientSecret={clientSecret} user={user} updateUser={updateUser} />
      </Elements>
    ) : (
      <div>Loading...</div>
    )
  );
};

export default SubscriptionWrapper;
