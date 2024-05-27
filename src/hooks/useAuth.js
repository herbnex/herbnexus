import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthContext = () => useContext(AuthContext);
export const useCurrentUser = () => useContext(AuthContext).auth.user;
export const useUpdateUser = () => useContext(AuthContext).updateUser;

export default useAuth;
