require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  console.log("Received userId:", userId);

  try {
    // Create a customer if not already exists
    const customer = await stripe.customers.create({
      metadata: { userId },
    });
    console.log("Customer created with ID:", customer.id);

    const userRef = db.collection("users").doc(userId);
    await userRef.set({ stripeCustomerId: customer.id }, { merge: true });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId,
        description: "Subscription creation"
      }
    });

    console.log("Subscription created with ID:", subscription.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
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