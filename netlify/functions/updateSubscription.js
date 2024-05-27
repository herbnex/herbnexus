// netlify/functions/updateSubscription.js

const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event) => {
  try {
    const { userId, isSubscribed, subscriptionEndDate } = JSON.parse(
      event.body
    );

    // Update the user document in Firestore
    const userRef = db.collection("users").doc(userId);

    console.log("Updating user:", userId);

    const user = await userRef.set(
      {
        isSubscribed,
        subscriptionEndDate: subscriptionEndDate || null,
      },
      {
        merge: true,
      }
    );

    return { user, statusCode: 200 };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { message, statusCode: 200 };
  }
};
