import { AUTH_TOKEN } from "@utils/constants";
import Cookies from "js-cookie";

export const getToken = (): string => {
  if (typeof window === undefined) {
    return "";
  }
  return Cookies.get(AUTH_TOKEN) || "";
};
