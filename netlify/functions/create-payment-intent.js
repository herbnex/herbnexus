require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../../src/Firebase/firebase.config'); // Import the db object

const { doc, updateDoc } = require('firebase/firestore');

exports.handler = async (event, context) => {
  const { userId } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { userId },
    });

    // Update Firestore to mark the user as subscribed
    await updateDoc(doc(db, 'users', userId), {
      isSubscribed: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
