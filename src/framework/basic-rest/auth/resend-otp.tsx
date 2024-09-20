import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import Cookies from "js-cookie";

export interface ResendOtpInput {
  id: number;
}

async function resendOTP(input: ResendOtpInput) {
  const { data } = await http.post(API_ENDPOINTS.RESEND_OTP, input);
  return data;
}
export const useResendOTPMutation = () => {
  return useMutation((input: ResendOtpInput) => resendOTP(input), {
    onSuccess: (data) => {
      Cookies.set("auth_token", data.data.tokens.refreshToken);
    },
    onError: (data) => {},
  });
};
