import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useProduct();
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
          return_url: 'https://herbnexus.io/shop',
        },
        redirect: 'if_required'
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setRedirecting(true);
        window.location.replace('/confirmation'); // Update with your actual URL
      }
    } catch (err) {
      console.error('Error confirming payment:', err);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <Button type="submit" disabled={!stripe || loading || redirecting} className="mt-3">
        {loading || redirecting ? "Processing..." : "Pay Now"}
      </Button>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  );
};

const Checkout = () => {
  const { cart, removeFromCart, updateCartQuantity } = useProduct();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (cart.length === 0) {
        setClientSecret("");
        setLoading(false);
        return;
      }

      try {
        console.log('Cart data being sent:', cart); // Log cart data
        const response = await axios.post("/.netlify/functions/create-checkout-payment-intent", {
          cart
        });
        console.log('Response data:', response.data); // Log response data
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setErrorMessage('An error occurred while initializing the payment process. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchClientSecret();
  }, [cart]);

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
          <h2>Payment</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
