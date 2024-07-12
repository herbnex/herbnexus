import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret, paymentRequest }) => {
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
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {paymentRequest && (
        <Button
          variant="dark"
          onClick={() => paymentRequest.show()}
          className="mt-3"
        >
          Pay with Payment Request
        </Button>
      )}
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
  const [shippingAddress, setShippingAddress] = useState({
    recipient: '',
    addressLine: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

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
          shippingAddress
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setErrorMessage('An error occurred while initializing the payment process. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchClientSecret();
  }, [cart, shippingAddress]);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestShipping: true,
        shippingOptions: [
          {
            id: 'free-shipping',
            label: 'Free shipping',
            detail: 'Delivers in 5 to 7 days',
            amount: 0,
          },
        ],
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const {error, paymentIntent} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id,
            shipping: {
              name: shippingAddress.recipient,
              address: {
                line1: shippingAddress.addressLine,
                city: shippingAddress.city,
                state: shippingAddress.region,
                postal_code: shippingAddress.postalCode,
                country: shippingAddress.country,
              },
              phone: shippingAddress.phone,
            },
          },
          {handleActions: false}
        );

        if (error) {
          event.complete('fail');
          setErrorMessage(error.message);
        } else {
          event.complete('success');
          if (paymentIntent.status === 'requires_action') {
            stripe.confirmCardPayment(clientSecret);
          } else {
            window.location.replace('/confirmation'); // Update with your actual URL
          }
        }
      });
    }
  }, [stripe, cart, clientSecret, shippingAddress]);

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
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
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} paymentRequest={paymentRequest} />
            </Elements>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
