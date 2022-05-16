import { createContext, useContext, Context } from "react";
import useFirebaseAuth, {
  signInEmailAndPassword,
  createUserEmailAndPassword,
  signOutApp,
} from "../hooks/useFirebaseAuth";

const authUserContext = createContext({
  authUser: useFirebaseAuth(),
  loading: true,
  signInEmailAndPassword: async () => {
    signInEmailAndPassword;
  },
  createUserEmailAndPassword: async () => {
    createUserEmailAndPassword;
  },
  signOutApp: async () => {
    signOutApp;
  },
});

export const useAuth = () => useContext(authUserContext);

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
