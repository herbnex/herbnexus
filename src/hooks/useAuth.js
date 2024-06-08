import { useState, useEffect, useContext, createContext } from 'react';
import { auth, db } from '../Firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const doctorDoc = await getDoc(doc(db, 'doctors', firebaseUser.uid));

          if (userDoc.exists()) {
            setUser({ ...firebaseUser, ...userDoc.data() });
            setIsDoctor(false);
          } else if (doctorDoc.exists()) {
            setUser({ ...firebaseUser, ...doctorDoc.data() });
            setIsDoctor(true);
          } else {
            setError('No user data found');
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setUser(null);
        setIsDoctor(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isDoctor, isLoading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
