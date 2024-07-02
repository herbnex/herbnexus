require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);
  

  try {
    // Check if customer already exists in the database
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    let customerId;

    if (userDoc.exists && userDoc.data().stripeCustomerId) {
      customerId = userDoc.data().stripeCustomerId;
      
    } else {
      // Create a new customer if it does not exist
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      

      // Store the customerId in the database
      await userRef.set({ stripeCustomerId: customerId }, { merge: true });
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

    

    // Store the subscriptionId and update subscription status in the database
    await userRef.set({
      subscriptionId: subscription.id,
      isSubscribed: true,
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }, { merge: true });

    return {
      statusCode: 200,
      body: JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      }),
    };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
