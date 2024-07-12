require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { cart, shippingAddress } = JSON.parse(event.body);

    // Calculate the total amount for the cart
    const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100); // Amount in cents

    // Create a payment intent with shipping details
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
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
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    //console.error("Error creating payment intent:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
