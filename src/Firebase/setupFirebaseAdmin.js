const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json'); // Download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
