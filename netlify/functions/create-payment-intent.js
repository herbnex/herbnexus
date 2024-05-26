require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../../src/Firebase/firebase.config'); // Ensure this path is correct

const { doc, updateDoc, getDoc, setDoc } = require('firebase/firestore');

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

    // Reference to the user document
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    // Check if the document exists
    if (userDoc.exists()) {
      // Update the user document with the isSubscribed field
      await updateDoc(userRef, {
        isSubscribed: true,
      });
      console.log('Updated Firestore for existing user:', userId);
    } else {
      // Create the user document if it does not exist
      await setDoc(userRef, {
        isSubscribed: true,
      });
      console.log('Created new Firestore document for user:', userId);
    }

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
