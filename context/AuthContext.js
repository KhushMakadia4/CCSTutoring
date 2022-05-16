import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../utils/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("user authcontext", user);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getDoc(doc(db, "users", user.email.toString()));
        let userName = "";
        let userTutor = false;
        let userHours = false;
        if (userData.exists()) {
          userName =
            userData.data().firstName.toString() +
            " " +
            userData.data().lastName.toString();
          userTutor = userData.data().tutor;
          userHours = userData.data().hours;
        }
        setUser({
          uid: user.uid,
          email: user.email,
          fullName: userName,
          tutor: userTutor,
          hours: userHours,
        });
        if (router.pathname == "/login") {
          router.push("/");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    console.log("user signed out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
