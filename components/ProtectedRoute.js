import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("router pushing to login");
      router.push("/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
}
