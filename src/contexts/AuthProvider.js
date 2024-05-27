import React, { createContext, useCallback } from "react";
import useFirebase from "../hooks/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const firebaseAuth = useFirebase();
  return <AuthContext.Provider value={firebaseAuth}>{children}</AuthContext.Provider>;
};

/**
 * 
const AuthProvider = ({ children }) => {
  const firebaseAuth = useFirebase();
  const [authValue, setUser] = useState({
    auth: firebaseAuth,
    user: null,
  });

  const updateUser = useCallback(async () => {
    if (!firebaseAuth?.isLoading && firebaseAuth?.user?.uid) {
      const userRef = db.collection("users").doc(firebaseAuth.user.uid);
      const user = await getDoc(userRef);

      console.log(user);

      setUser((currentValue) => ({
        ...currentValue,
        user: {
          ...(currentValue.user || {}),
          ...user,
        },
      }));
    }
  }, [firebaseAuth]);


  return (
    <AuthContext.Provider
      value={{
        auth: authValue,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

 */

export default AuthProvider;
