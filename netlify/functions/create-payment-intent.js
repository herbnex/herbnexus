require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../../src/Firebase/firebase.config'); // Ensure this path is correct
const { doc, updateDoc } = require('firebase/firestore');

exports.handler = async (event, context) => {
  console.log('Received event:', event);
  const { userId } = JSON.parse(event.body);

  try {
    console.log('Creating payment intent for user:', userId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { userId },
    });

    console.log('Payment intent created:', paymentIntent);

    // Update Firestore to mark the user as subscribed
    await updateDoc(doc(db, 'users', userId), {
      isSubscribed: true,
    });

    console.log('Updated Firestore for user:', userId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
