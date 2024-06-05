require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);

  try {
    // Fetch the user to get the Stripe customer ID and subscription ID
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return { statusCode: 404, body: "User not found" };
    }

    const userData = userDoc.data();
    const stripeCustomerId = userData.stripeCustomerId;
    const subscriptionId = userData.subscriptionId;

    if (!stripeCustomerId || !subscriptionId) {
      return { statusCode: 400, body: "Stripe customer ID or subscription ID not found" };
    }

    // Cancel the subscription
    await stripe.subscriptions.update(subscriptionId,{
      cancel_at_period_end: true,
    });

    // Update the user's subscription status in Firestore
    await userRef.set({
      isSubscribed: false,
      cancel_at_period_end: true
    }, { merge: true });

    return { statusCode: 200, body: "Subscription canceled successfully" };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
