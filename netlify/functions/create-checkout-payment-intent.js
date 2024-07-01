require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { cart } = JSON.parse(event.body);
    console.log("Received cart:", cart);

    // Calculate the total amount for the cart
    const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100); // Amount in cents

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
    });

    console.log("Payment intent created with ID:", paymentIntent.id);

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
};
