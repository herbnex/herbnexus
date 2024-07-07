// netlify/edge-functions/rateLimiter.js
import { db } from "../Firebase/firebase.config"; // Adjust the path to your Firebase config
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const RATE_LIMIT = 100; // Max requests per IP per minute
const WINDOW_SIZE = 60 * 1000; // 1 minute in milliseconds

export default async function handler(req, context) {
  const ip = context.client.ip;

  const docRef = doc(db, 'rateLimits', ip);
  const docSnap = await getDoc(docRef);
  
  const now = Date.now();

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      count: 1,
      firstRequest: now,
    });
    return context.next();
  }

  const data = docSnap.data();
  const timePassed = now - data.firstRequest;

  if (timePassed > WINDOW_SIZE) {
    await setDoc(docRef, {
      count: 1,
      firstRequest: now,
    });
    return context.next();
  }

  if (data.count < RATE_LIMIT) {
    await updateDoc(docRef, {
      count: data.count + 1,
    });
    return context.next();
  }

  return new Response('Too Many Requests', { status: 429 });
}
