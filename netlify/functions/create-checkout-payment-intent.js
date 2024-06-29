require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId, cart } = JSON.parse(event.body);
  console.log("Received userId:", userId);
  console.log("Cart items:", cart);

  try {
    // Check if customer already exists in the database
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    let customerId;

    if (userDoc.exists && userDoc.data().stripeCustomerId) {
      customerId = userDoc.data().stripeCustomerId;
      console.log("Existing customer ID:", customerId);
    } else {
      // Create a new customer if it does not exist
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      console.log("New customer created with ID:", customerId);

      // Store the customerId in the database
      await userRef.set({ stripeCustomerId: customerId }, { merge: true });
    }

    // Calculate the total amount from the cart
    const amount = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 100; // Convert to cents

    // Create a payment intent for one-time payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: 'usd',
      customer: customerId,
      metadata: { userId, description: "One-time payment" },
    });

    console.log("PaymentIntent created with ID:", paymentIntent.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
