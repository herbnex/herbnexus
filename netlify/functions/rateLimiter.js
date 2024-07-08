const { db } = require("../../src/Firebase/setupFirebaseAdmin");

exports.handler = async (event, context) => {
  console.log('Edge Function Invoked');

  // Safely access the request and headers
  const request = event.headers;
  const ip = request['x-forwarded-for'] || request['client-ip'];
  if (!ip) {
    console.log('IP address not found in headers');
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }

  const getTimestamp = () => Math.floor(Date.now() / 1000);
  const currentTime = getTimestamp();
  const rateLimitDoc = db.collection('rateLimits').doc(ip);

  try {
    const rateLimitSnapshot = await rateLimitDoc.get();
    let rateLimitData = rateLimitSnapshot.data();

    if (!rateLimitData) {
      rateLimitData = { count: 0, lastRequest: currentTime };
    }

    console.log(`IP: ${ip}, Current Time: ${currentTime}, Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

    if (rateLimitData.count >= 5 && (currentTime - rateLimitData.lastRequest < 60)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return {
        statusCode: 429,
        body: 'Too Many Requests'
      };
    } else if (currentTime - rateLimitData.lastRequest < 60) {
      rateLimitData.count += 1;
      rateLimitData.lastRequest = currentTime;
    } else {
      rateLimitData.count = 1;
      rateLimitData.lastRequest = currentTime;
    }

    await rateLimitDoc.set(rateLimitData);
    console.log(`Updated Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

    return {
      statusCode: 200,
      body: 'OK'
    };
  } catch (error) {
    console.error('Error accessing Firestore:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};
