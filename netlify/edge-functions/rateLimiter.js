import { onRequest } from 'netlify:edge';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.REACT_APP_FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();

export const onRequest = async (context) => {
  const ip = context.request.headers.get('x-forwarded-for') || context.request.headers.get('client-ip');
  const rateLimitDocRef = db.collection('rate_limits').doc(ip);
  const now = admin.firestore.Timestamp.now();

  try {
    const doc = await rateLimitDocRef.get();
    if (doc.exists) {
      const data = doc.data();
      const lastRequestTime = data.lastRequest.toDate();
      const requestCount = data.count;

      if (now.toDate() - lastRequestTime < 60000 && requestCount >= 100) {
        return new Response('Too Many Requests', { status: 429 });
      } else if (now.toDate() - lastRequestTime < 60000) {
        await rateLimitDocRef.update({
          count: admin.firestore.FieldValue.increment(1),
          lastRequest: now,
        });
      } else {
        await rateLimitDocRef.set({
          count: 1,
          lastRequest: now,
        });
      }
    } else {
      await rateLimitDocRef.set({
        count: 1,
        lastRequest: now,
      });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }

  return new Response('OK', { status: 200 });
};
