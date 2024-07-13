require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId, paymentIntentId } = JSON.parse(event.body);

  try {
    const userRef = db.collection("users").doc(userId);
    const doctorRef = db.collection("doctors").doc(userId);
    const userDoc = await userRef.get();
    const doctorDoc = await doctorRef.get();
    let customerId;
    let userCollection;

    // Determine if the user is a regular user or a doctor
    if (userDoc.exists) {
      userCollection = 'users';
      if (userDoc.data().stripeCustomerId) {
        customerId = userDoc.data().stripeCustomerId;
      }
    } else if (doctorDoc.exists) {
      userCollection = 'doctors';
      if (doctorDoc.data().stripeCustomerId) {
        customerId = doctorDoc.data().stripeCustomerId;
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "User not found" }),
      };
    }

    // Create a new Stripe customer if one doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      await db.collection(userCollection).doc(userId).set({ stripeCustomerId: customerId }, { merge: true });
    }

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId,
        description: "Subscription creation"
      }
    });

    const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

    // Verify payment intent if provided
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status === 'succeeded') {
        await db.collection(userCollection).doc(userId).set({
          isSubscribed: true,
          subscriptionId: subscription.id,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }, { merge: true });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret,
        success: true
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
