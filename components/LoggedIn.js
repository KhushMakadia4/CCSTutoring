import { authUser, loading } from "../utils/hooks/useFirebaseAuth";
import { useAuth } from "../utils/providers/AuthUserProvider";
import {useRouter} from 'next/router'
import { useEffect } from "react";




const LoggedIn = ({children}) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();
  
    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
      if (!loading && !authUser)
        router.push('/login')
    }, [authUser, loading])
  
    return (
      //Your logged in page
      <>{children}</>
    )
  }
  
  export default LoggedIn;