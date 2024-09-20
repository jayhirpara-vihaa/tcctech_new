import { useUI } from "@contexts/ui.context";
import {
  AUTH_TOKEN,
  CARTPRODUCTDETAIL,
  CART_TOTAL,
  USER_DETAILS,
} from "@utils/constants";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from "js-cookie";
import Router from "next/router";
import { useMutation } from "react-query";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  // return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    ok: true,
    message: "Logout Successful!",
  };
}
export const useLogoutMutation = () => {
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove(AUTH_TOKEN);
      Cookies.remove(USER_DETAILS);
      Cookies.remove("modelclose");
      Cookies.remove("newsAnnounce");
      Cookies.remove(CART_TOTAL);
      Cookies.remove(CARTPRODUCTDETAIL);
      unauthorize();
      Router.push("/");
    },
    onError: (data) => {},
  });
};
