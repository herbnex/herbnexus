require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { userId, cart } = JSON.parse(event.body);
    console.log("Received userId:", userId);
    console.log("Received cart:", cart);

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

    // Calculate the total amount for the cart
    const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100); // Amount in cents

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
      customer: customerId,
      metadata: { userId },
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
