import { getToken } from "@framework/utils/get-token";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const authToken = getToken();
  const router = useRouter();

  useEffect(() => {
    //auth is initialized and there is no user
    if (!authToken) {
      // remember the page that user tried to access
      // redirect
      router.push("/signin");
    }
  }, [authToken]);

  // if auth initialized with a valid user show protected page
  if (authToken) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
