import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../Firebase";

// import { FirebaseAuth } from 'react-firebaseui';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const createUserEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signOutApp = () => {
    signOut().then(clear);
  };
  // listen for Firebase state change

  return {
    authUser,
    loading,
    signInEmailAndPassword,
    createUserEmailAndPassword,
    signOutApp,
  };
}
