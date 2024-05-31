const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { paymentIntentId, userId } = JSON.parse(event.body);

    // Confirm the payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update user subscription status in Firestore
      const userRef = db.collection("users").doc(userId);
      await userRef.set(
        {
          isSubscribed: true,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        { merge: true }
      );

      // Redirect to contact page
      return {
        statusCode: 302,
        headers: {
          Location: 'https://develop--herbnexus.netlify.app/contact',
        },
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payment not successful' }),
      };
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
