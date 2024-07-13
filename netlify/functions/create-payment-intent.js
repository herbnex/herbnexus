require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId, paymentIntentId } = JSON.parse(event.body);
  
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    let customerId;

    // Retrieve existing Stripe customer ID or create a new one
    if (userDoc.exists && userDoc.data().stripeCustomerId) {
      customerId = userDoc.data().stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      await userRef.set({ stripeCustomerId: customerId }, { merge: true });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000, // $100.00
      currency: 'cad',
      customer: customerId,
      metadata: { userId },
    });

    // Verify payment intent if provided
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status === 'succeeded') {
        await userRef.set({
          isSubscribed: true,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }, { merge: true });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        success: true,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
