import Navbar from "./Navbar";
import Footer from "./Footer";
import LoggedIn from "./LoggedIn";
import { useEffect } from "react";
import { useAuth } from "../utils/providers/AuthUserContext";
import {useRouter} from "next/router"

export default function Layout({ children }) {

  const { authUser, loading } = useAuth();
    const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser)
    router.push('/login')
    console.log(authUser);
    console.log(loading);
    // console.log("NOT LOGGED IN");
}
, [authUser, loading])
  

  return (
    <>
    {/* <LoggedIn> */}
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* </LoggedIn> */}
    </>
  );
}
