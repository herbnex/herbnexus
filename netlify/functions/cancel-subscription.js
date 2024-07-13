require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);

  try {
    // Fetch the user or doctor to get the Stripe customer ID and subscription ID
    const userRef = db.collection("users").doc(userId);
    const doctorRef = db.collection("doctors").doc(userId);
    const userDoc = await userRef.get();
    const doctorDoc = await doctorRef.get();
    let userData, userCollection;

    if (userDoc.exists) {
      userData = userDoc.data();
      userCollection = 'users';
    } else if (doctorDoc.exists) {
      userData = doctorDoc.data();
      userCollection = 'doctors';
    } else {
      return { statusCode: 404, body: "User not found" };
    }

    const stripeCustomerId = userData.stripeCustomerId;
    const subscriptionId = userData.subscriptionId;

    if (!stripeCustomerId || !subscriptionId) {
      return { statusCode: 400, body: "Stripe customer ID or subscription ID not found" };
    }

    // Cancel the subscription
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update the user's subscription status in Firestore
    await db.collection(userCollection).doc(userId).set({
      isSubscribed: false,
      cancel_at_period_end: true
    }, { merge: true });

    return { statusCode: 200, body: "Subscription canceled successfully" };
  } catch (error) {
    // console.error("Error cancelling subscription:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
