// src/Firebase/firebase.init.js
import { auth, db, database } from './firebase.config';

// You can optionally create an initialization function if needed
const initializeAuthentication = () => {
  // Firebase has already been initialized in firebase.config.js
  console.log('Firebase initialized');
};

export default initializeAuthentication;
