require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);

  try {
    // Fetch the user to get the Stripe customer ID
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return { statusCode: 404, body: "User not found" };
    }

    const userData = userDoc.data();
    const stripeCustomerId = userData.stripeCustomerId;

    if (!stripeCustomerId) {
      return { statusCode: 400, body: "Stripe customer ID not found" };
    }

    // Fetch subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return { statusCode: 400, body: "No active subscriptions found" };
    }

    // Cancel the subscription
    const subscriptionId = subscriptions.data[0].id;
    await stripe.subscriptions.del(subscriptionId);

    // Update the user's subscription status in Firestore
    await userRef.set({
      isSubscribed: false,
      subscriptionEndDate: null,
    }, { merge: true });

    return { statusCode: 200, body: "Subscription canceled successfully" };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
