require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { action, cart, paymentIntentId, shippingAddress, email } = JSON.parse(event.body);

  if (action === 'create') {
    try {
      // Calculate the total amount for the cart
      const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100); // Amount in cents

      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'cad',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  if (action === 'update') {
    try {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
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
        receipt_email: email,
      });

      return {
        statusCode: 200,
        body: JSON.stringify(paymentIntent),
      };
    } catch (error) {
      console.error("Error updating payment intent:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  if (action === 'fetch') {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        statusCode: 200,
        body: JSON.stringify(paymentIntent),
      };
    } catch (error) {
      console.error("Error fetching payment intent:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid action' }),
  };
};
