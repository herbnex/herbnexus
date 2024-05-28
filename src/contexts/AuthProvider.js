import React, { useState, useEffect, createContext, useCallback, useRef } from 'react';
import { auth, db } from '../Firebase/firebase.config'; // Adjust the path as necessary
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isMounted = useRef(true);

  const updateUser = useCallback(async (user) => {
    if (!isMounted.current) return; // Prevent state updates if component is unmounted

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (isMounted.current) { // Check if still mounted before setting state
          setUser({ ...user, ...userData });
          setIsSubscribed(userData.isSubscribed || false);
        }
      } else {
        if (isMounted.current) {
          setUser(user);
          setIsSubscribed(false);
        }
      }
    } else {
      if (isMounted.current) {
        setUser(null);
        setIsSubscribed(false);
      }
    }
    if (isMounted.current) {
      setIsLoading(false);
    }
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
    isMounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      updateUser(user);
    });

    return () => {
      isMounted.current = false; // Cleanup function to update the flag
      unsubscribe();
    };
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isSubscribed, updateUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
