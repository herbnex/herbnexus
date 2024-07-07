// netlify/edge-functions/rateLimiter.js

import admin from 'firebase-admin';
import { NetlifyEdgeResponse } from 'netlify-edge';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.firestore();

export default async (request, context) => {
  // Your rate limiting logic using Firestore
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  const docRef = db.collection('rate_limits').doc(ip);

  // Logic to check and update rate limits
  const doc = await docRef.get();
  const now = admin.firestore.Timestamp.now();

  if (doc.exists) {
    const data = doc.data();
    const lastRequestTime = data.lastRequest.toDate();
    const requestCount = data.count;

    // Your rate limiting logic
    if (now.toDate() - lastRequestTime < 60000 && requestCount >= 100) {
      return new NetlifyEdgeResponse('Too Many Requests', { status: 429 });
    } else if (now.toDate() - lastRequestTime < 60000) {
      await docRef.update({ count: admin.firestore.FieldValue.increment(1) });
    } else {
      await docRef.set({ count: 1, lastRequest: now });
    }
  } else {
    await docRef.set({ count: 1, lastRequest: now });
  }

  return new NetlifyEdgeResponse('OK', { status: 200 });
};
