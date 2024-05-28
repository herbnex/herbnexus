import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import useAuth from "../../../src/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEnvelope, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import "./subscription.css";

// Load Stripe using your public key from the environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Subscription = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const refferer = location?.state?.from || { pathname: "/contact" };

  const params = useMemo(() => new URLSearchParams(location.search), [location]);

  const getPaymentIntent = useCallback(async () => {
    if (!stripe || !params.get("payment_intent_client_secret")) return null;
    const { paymentIntent, error } = await stripe.retrievePaymentIntent(params.get("payment_intent_client_secret"));
    return { paymentIntent, error };
  }, [params, stripe]);

  const handlePaymentSuccess = useCallback(async () => {
    const { paymentIntent, error } = await getPaymentIntent() || {};

    if (error) {
      console.error("Error retrieving payment intent:", error);
      setError(error.message || "An error occurred while trying to make payment");
      return;
    }

    console.log("Payment Intent", paymentIntent, user.uid);

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await axios.post("/.netlify/functions/updateSubscription", {
          userId: user.uid,
          isSubscribed: true,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
        console.log("Subscription update successful");
        await updateUser(user);
        history.replace(refferer);
      } catch (updateError) {
        console.error("Error updating subscription:", updateError);
        setError("An error occurred while updating your subscription. Please try again.");
      }
    } else {
      setError("Payment was not successful.");
    }
  }, [user, getPaymentIntent, history, updateUser]);

  useEffect(() => {
    if (params.get("payment_intent_client_secret")) {
      handlePaymentSuccess();
    }
  }, [handlePaymentSuccess, params]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/contact`,
        },
      });

      if (paymentError) {
        await axios.post("/.netlify/functions/updateSubscription", {
          userId: user.uid,
          isSubscribed: false,
          subscriptionEndDate: null,
        });

        setError(paymentError.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("An error occurred while processing your subscription. Please try again.");
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
          <p>
            Your subscription includes 24/7 access to accredited herbal practitioners, personalized recommendations, and more.
          </p>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> How do I cancel my subscription?
          </h5>
          <p>
            You can cancel your subscription at any time through your account settings.
          </p>
          <h5>
            <FontAwesomeIcon icon={faInfoCircle} /> Is my payment information secure?
          </h5>
          <p>
            Yes, we use Stripe to process payments, ensuring your information is secure.
          </p>
        </Col>
        <Col md={6}>
          <div className="subscription-header">
            <h2>Subscribe to Herb Nexus</h2>
            <p>
              Get 24/7 access to accredited herbal practitioners for only $50/month.
            </p>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
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

const SubscriptionWrapper = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (!user) return; // Ensure user is available before creating payment intent
        const { data } = await axios.post("/.netlify/functions/create-payment-intent", { userId: user.uid });
        setClientSecret(data.clientSecret);
        console.log("Client secret received:", data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [user]);

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Subscription clientSecret={clientSecret} />
      </Elements>
    )
  );
};

export default SubscriptionWrapper;
