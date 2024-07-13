import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret, email, updatePaymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
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
          return_url: 'https://herbnexus.io/shop', // Update with your actual URL
          receipt_email: email,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Error confirming payment:', error);
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update the payment intent with shipping details after successful payment and handle redirection
        await updatePaymentIntent(paymentIntent.id);
      }
    } catch (err) {
      console.error('An error occurred during payment confirmation:', err);
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
        const response = await axios.post("/.netlify/functions/combined-stripe-function", {
          action: 'create',
          cart,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
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
      const response = await axios.post("/.netlify/functions/combined-stripe-function", {
        action: 'update',
        paymentIntentId,
        shippingAddress,
        email,
      });

      if (response.status !== 200) {
        throw new Error('Failed to update payment intent');
      }

      // Fetch the updated payment intent with expanded latest_charge
      const updatedPaymentIntent = await axios.post("/.netlify/functions/combined-stripe-function", {
        action: 'fetch',
        paymentIntentId,
      });

      const latestCharge = updatedPaymentIntent.data.latest_charge;
      const receiptUrl = latestCharge?.receipt_url;

      if (receiptUrl) {
        // Open the receipt URL in a new tab immediately
        const newTab = window.open('', '_blank');
        
        setTimeout(() => {
          newTab.location.href = receiptUrl;
          window.location.replace(`/shop`);
        }, 5000);
      } else {
        console.error('Receipt URL not found in payment intent:', updatedPaymentIntent.data);
        setErrorMessage('Receipt URL not found. Please check your email for the receipt.');
      }
    } catch (err) {
      console.error("Failed to update payment intent:", err);
      setErrorMessage('An error occurred while updating the payment details. Please try again.');
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
              <CheckoutForm
                clientSecret={clientSecret}
                email={email}
                updatePaymentIntent={updatePaymentIntent}
              />
            </Elements>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
