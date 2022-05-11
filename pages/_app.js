import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthUserProvider, useAuth } from "../utils/providers/AuthUserContext";
import {useRouter} from "next/router"
import { useState, useEffect } from "react";
import { auth } from "../utils/Firebase";
import SignUp from "../components/Signup";

function MyApp({ Component, pageProps }) {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false)

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login')
      console.log(authUser);
      console.log(loading);
    } 
    if (authUser!= null) {
      setLoggedIn(true)
    }
      // console.log("NOT LOGGED IN");
  }, [authUser, loading])

  return (
    <AuthUserProvider>
      (loggedIn ? <Layout><Component {...pageProps}></Component></Layout> : <SignUp></SignUp>)
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
