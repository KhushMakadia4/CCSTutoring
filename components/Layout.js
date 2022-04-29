import Navbar from "./Navbar";
import Footer from "./Footer";
import LoggedIn from "./LoggedIn";

export default function Layout({ children }) {
  return (
    <>
    <LoggedIn>
      <Navbar />
      <main>{children}</main>
      <Footer />
      </LoggedIn>
    </>
  );
}
