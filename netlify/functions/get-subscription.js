require('dotenv').config();
const { db } = require('../../src/Firebase/setupFirebaseAdmin');

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const userData = userDoc.data();
    const subscription = {
      isSubscribed: userData.isSubscribed,
      subscriptionEndDate: userData.subscriptionEndDate,
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ subscription }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
