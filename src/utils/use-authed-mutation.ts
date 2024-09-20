import { useLogoutMutation } from "@framework/auth/use-logout";
import Cookies from "js-cookie";
import {
  AUTH_TOKEN,
  CARTPRODUCTDETAIL,
  CART_TOTAL,
  USER_DETAILS,
} from "./constants";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";

const { useMutation } = require("react-query");

const useAuthedMutation = (...options: any) => {
  const mutation = useMutation(...options);
  const { unauthorize } = useUI();
  if (
    mutation?.error?.response?.status === 401 ||
    mutation?.error?.response?.status === "401"
  ) {
    // Insert custom access-token refresh logic here. For now, we are
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired.
    // window.location.reload();
    const router = useRouter();
    Cookies.remove(AUTH_TOKEN);
    Cookies.remove(USER_DETAILS);
    Cookies.remove("modelclose");
    Cookies.remove("newsAnnounce");
    Cookies.remove(CART_TOTAL);
    Cookies.remove(CARTPRODUCTDETAIL);
    unauthorize();
    router.push("/");
  }
  return mutation as any;
};

export default useAuthedMutation;
