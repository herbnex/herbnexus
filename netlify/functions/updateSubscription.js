const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { userId, isSubscribed, subscriptionEndDate } = JSON.parse(event.body);

    // Update the user document in Firestore
    const userRef = db.collection("users").doc(userId);

    console.log("Updating user:", userId);

    await userRef.set(
      {
        isSubscribed,
        subscriptionEndDate: subscriptionEndDate || null,
      },
      {
        merge: true,
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return {
      statusCode: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      },
      body: JSON.stringify({ error: 'Failed to update subscription' }),
    };
  }
};
