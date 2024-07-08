// netlify/edge-functions/rateLimiter.js
import { db } from '../../src/Firebase/setupFirebaseAdmin';

export default async (event) => {
  console.log('Edge Function Invoked');

  const request = event.request;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
  if (!ip) {
    console.log('IP address not found in headers');
    return new Response('Internal Server Error', { status: 500 });
  }

  const getTimestamp = () => Math.floor(Date.now() / 1000);
  const currentTime = getTimestamp();
  const rateLimitDoc = db.collection('rateLimits').doc(ip);

  try {
    const rateLimitSnapshot = await rateLimitDoc.get();
    let rateLimitData = rateLimitSnapshot.data();

    if (!rateLimitData) {
      rateLimitData = { count: 1, lastRequest: currentTime, blockedUntil: 0 };
      await rateLimitDoc.set(rateLimitData);
      console.log(`Initial request from IP: ${ip}`);
      return event.next();
    }

    console.log(`IP: ${ip}, Current Time: ${currentTime}, Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

    if (rateLimitData.blockedUntil > currentTime) {
      console.log(`IP ${ip} is currently blocked until ${rateLimitData.blockedUntil}`);
      return new Response('Too Many Requests - Try again later', { status: 429 });
    }

    if (currentTime - rateLimitData.lastRequest < 60) {
      if (rateLimitData.count >= 5) {
        rateLimitData.blockedUntil = currentTime + 60;
        rateLimitData.count = 0; // Reset count after blocking
        await rateLimitDoc.set(rateLimitData);
        console.log(`Rate limit exceeded for IP: ${ip}, blocking for 60 seconds`);
        return new Response('Too Many Requests - Blocked for 60 seconds', { status: 429 });
      }
      rateLimitData.count += 1;
    } else {
      rateLimitData.count = 1;
    }
    rateLimitData.lastRequest = currentTime;

    await rateLimitDoc.set(rateLimitData);
    console.log(`Updated Rate Limit Data: ${JSON.stringify(rateLimitData)}`);

    return event.next();
  } catch (error) {
    console.error('Error accessing Firestore:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
