import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, removeFromCart, updateCartQuantity } = useProduct();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    recipient: '',
    addressLine: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (cart.length === 0) {
        setClientSecret("");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/.netlify/functions/create-checkout-payment-intent", {
          cart,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setErrorMessage('An error occurred while initializing the payment process. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchClientSecret();
  }, [cart]);

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const updatePaymentIntent = async (paymentIntentId) => {
    try {
      const response = await axios.post("/.netlify/functions/update-payment-intent", {
        paymentIntentId,
        shippingAddress,
        email,
      });
      if (response.status !== 200) {
        throw new Error('Failed to update payment intent');
      }
    } catch (err) {
      console.error("Failed to update payment intent:", err);
    }
  };

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
          return_url: 'https://herbnexus.io/shop', // Update with your actual URL
          receipt_email: email,
        },
        redirect: 'if_required'
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update the payment intent with shipping details after successful payment
        await updatePaymentIntent(paymentIntent.id);

        setRedirecting(true);
        window.location.replace(`/payment-success?payment_intent=${paymentIntent.id}`);
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="checkout-container">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="checkout-container">
      <Row>
        <Col md={7} className='check'>
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
          ) : (
            cart.map((item, index) => (
              <Row key={index} className="mb-3">
                <Col xs={3}>
                  <Image src={item.image} fluid />
                </Col>
                <Col xs={5}>
                  <h5>{item.name}</h5>
                  <p>${item.price.toFixed(2)}</p>
                </Col>
                <Col xs={2}>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, e.target.value)}
                    className='quan'
                  />
                </Col>
                <Col xs={2} className="text-right">
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>X</Button>
                </Col>
              </Row>
            ))
          )}
          <h4>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h4>
        </Col>
        <Col md={5}>
          <h2>Shipping Address</h2>
          <Form>
            <Form.Group>
              <Form.Label>Recipient</Form.Label>
              <Form.Control
                type="text"
                name="recipient"
                value={shippingAddress.recipient}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address Line</Form.Label>
              <Form.Control
                type="text"
                name="addressLine"
                value={shippingAddress.addressLine}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                name="region"
                value={shippingAddress.region}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleShippingAddressChange}
                required
              />
            </Form.Group>
          </Form>
          <h2>Payment</h2>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Form onSubmit={handleSubmit}>
                {clientSecret && <PaymentElement />}
                <Button type="submit" disabled={!stripe || loading || redirecting} className="mt-3">
                  {loading || redirecting ? "Processing..." : "Pay Now"}
                </Button>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              </Form>
            </Elements>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
