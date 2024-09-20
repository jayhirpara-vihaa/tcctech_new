// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import Cookies from "js-cookie";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface ResetPasswordType {
  new_password: string;
  token: string;
}

async function resetPassword(input: ResetPasswordType) {
  const { data } = await http.post(API_ENDPOINTS.RESET_PASSWORD, input);
  return data;
}
export const useResetPasswordMutation = () => {
  return useMutation((input: ResetPasswordType) => resetPassword(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
