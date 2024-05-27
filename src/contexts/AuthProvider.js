// src/contexts/AuthProvider.js
import React, { useState, useEffect, createContext, useCallback } from 'react';
import { auth, db } from '../Firebase/firebase.config'; // Adjust the path as necessary
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const updateUser = useCallback(async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ ...user, ...userData });
        setIsSubscribed(userData.isSubscribed || false);
      } else {
        setUser(user);
        setIsSubscribed(false);
      }
    } else {
      setUser(null);
      setIsSubscribed(false);
    }
    setIsLoading(false);
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      updateUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      updateUser(user);
    });

    return () => unsubscribe();
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isSubscribed, updateUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
