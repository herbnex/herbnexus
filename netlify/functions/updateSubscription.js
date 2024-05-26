// netlify/functions/updateSubscription.js

const { db } = require('../../src/Firebase/setupFirebaseAdmin');

exports.handler = async (event) => {
  try {
    const { userId, isSubscribed, subscriptionEndDate } = JSON.parse(event.body);

    // Update the user document in Firestore
    const userRef = db.collection('users').doc(userId);
    console.log('id:', userId);

    await userRef.set({
      isSubscribed,
      subscriptionEndDate: subscriptionEndDate || null,
    }, { merge: true });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription updated successfully' }),
    };
  } catch (error) {
    console.error('Error updating subscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
