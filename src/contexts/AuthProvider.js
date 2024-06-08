import React, { useState, useEffect, createContext, useCallback, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const isMounted = useRef(true);

  const updateUser = useCallback(async (firebaseUser) => {
    if (!isMounted.current) return; // Prevent state updates if component is unmounted

    if (firebaseUser) {
      setIsLoading(true); // Set loading to true when fetching user data

      const userRef = doc(db, 'users', firebaseUser.uid);
      const doctorRef = doc(db, 'doctors', firebaseUser.uid);

      const userDoc = await getDoc(userRef);
      const doctorDoc = await getDoc(doctorRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (isMounted.current) {
          setUser({ ...firebaseUser, ...userData });
          setIsSubscribed(userData.isSubscribed || false);
          setIsDoctor(false);
        }
      } else if (doctorDoc.exists()) {
        const doctorData = doctorDoc.data();
        if (isMounted.current) {
          setUser({ ...firebaseUser, ...doctorData });
          setIsSubscribed(doctorData.isSubscribed || false);
          setIsDoctor(true);
        }
      } else {
        if (isMounted.current) {
          setUser(firebaseUser);
          setIsSubscribed(false);
          setIsDoctor(false);
        }
      }

      if (isMounted.current) {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    } else {
      if (isMounted.current) {
        setUser(null);
        setIsSubscribed(false);
        setIsDoctor(false);
        setIsLoading(false); // Set loading to false when user is null
      }
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

  const logInWithEmailandPassword = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      updateUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in with email and password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      updateUser(firebaseUser);
    });

    return () => {
      isMounted.current = false; // Cleanup function to update the flag
      unsubscribe();
    };
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isSubscribed, isDoctor, updateUser, logOut, logInWithEmailandPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
