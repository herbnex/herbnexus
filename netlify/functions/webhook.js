require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = stripeEvent.data.object;
      const userId = paymentIntent.metadata.userId;

      try {
        const userRef = db.collection("users").doc(userId);
        await userRef.set({
          isSubscribed: true,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }, { merge: true });

        console.log(`Successfully updated subscription for user ${userId}`);
      } catch (error) {
        console.error("Error updating subscription:", error);
        return { statusCode: 500, body: "Internal Server Error" };
      }
      break;
    // Add more event types as needed
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  return { statusCode: 200, body: "Success" };
};
