import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
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
