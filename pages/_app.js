import "../styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const noAuthRequired = ["/login"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      ) : (
        <ProtectedRoute>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
