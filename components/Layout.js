import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
