import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  AUTH_TOKEN,
  CARTPRODUCTDETAIL,
  CART_TOTAL,
  USER_DETAILS,
} from "./constants";
import { useUI } from "@contexts/ui.context";

const { useQuery } = require("react-query");

const useAuthedQuery = (...options: any[]) => {
  const query = useQuery(...options);
  const { unauthorize } = useUI();
  if (parseInt(query?.error?.response?.status) === 401) {
    // Insert custom access-token refresh logic here. For now, we are
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired.
    //window.location.reload();
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
  return query;
};

export default useAuthedQuery;
