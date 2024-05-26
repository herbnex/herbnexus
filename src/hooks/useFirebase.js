import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../Firebase/firebase.config";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const auth = getAuth();

  const checkSubscriptionStatus = async (currentUser) => {
    if (currentUser) {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setIsSubscribed(userDoc.data().isSubscribed || false);
      }
    }
  };

  // GOOGLE SIGN IN
  const signInWithGoogle = () => {
    setIsLoading(true);
    const gAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, gAuthProvider)
      .then((result) => {
        setUser(result.user);
        checkSubscriptionStatus(result.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  // GITHUB SIGN IN
  const signInWithGithub = () => {
    setIsLoading(true);
    const gitAuthProvider = new GithubAuthProvider();
    signInWithPopup(auth, gitAuthProvider)
      .then((result) => {
        setUser(result.user);
        checkSubscriptionStatus(result.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  // EMAIL AND PASSWORD SIGN UP
  const createAccountWithEmailPassword = (email, password, name) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        setUser(newUser);
        setUserProfile(auth, name);
        // Initialize subscription status in Firestore
        setDoc(doc(db, "users", newUser.uid), {
          isSubscribed: false,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  // SET USER PROFILE
  const setUserProfile = (auth, name) => {
    setIsLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // EMAIL AND PASSWORD LOGIN
  const logInWithEmailandPassword = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedInUser = userCredential.user;
        setUser(loggedInUser);
        checkSubscriptionStatus(loggedInUser);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  // LOG OUT
  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsSubscribed(false);
    });
  };

  // GET CURRENT USER WITH AUTH OBSERVER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkSubscriptionStatus(currentUser);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsSubscribed(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    error,
    setError,
    isLoading,
    isSubscribed,
    signInWithGoogle,
    signInWithGithub,
    createAccountWithEmailPassword,
    logInWithEmailandPassword,
    logOut,
  };
};

export default useFirebase;
