import { getToken } from "@framework/utils/get-token";
import { USER_DETAILS } from "@utils/constants";
import Cookies from "js-cookie";

export function checkIsLoggedIn() {
  const token = getToken();
  if (!token || token === "" || token == undefined) return false;
  return true;
}

export function getUserDetails() {
  const userDetails = Cookies.get(USER_DETAILS);
  if (
    userDetails &&
    userDetails != null &&
    userDetails !== undefined &&
    userDetails !== "undefined"
  ) {
    return JSON.parse(userDetails);
  }
  return {};
}
