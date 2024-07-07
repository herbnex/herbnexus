import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();

export default async (request, context) => {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
  const docRef = db.collection('rate_limits').doc(ip);
  const now = admin.firestore.Timestamp.now();

  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    const lastRequestTime = data.lastRequest.toDate();
    const requestCount = data.count;

    if (now.toDate() - lastRequestTime < 60000 && requestCount >= 100) {
      return new Response('Too Many Requests', { status: 429 });
    } else if (now.toDate() - lastRequestTime < 60000) {
      await docRef.update({ count: admin.firestore.FieldValue.increment(1) });
    } else {
      await docRef.set({ count: 1, lastRequest: now });
    }
  } else {
    await docRef.set({ count: 1, lastRequest: now });
  }

  return new Response('OK', { status: 200 });
};
