import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
export interface VerifyOtpInput {
  id: number;
  OTP: string;
}

async function verifyOTP(input: VerifyOtpInput) {
  const { data } = await http.post(API_ENDPOINTS.VERIFY_OTP, input);
  return data;
}
export const useVeifyOTPMutation = () => {
  return useMutation((input: VerifyOtpInput) => verifyOTP(input), {
    onSuccess: (data) => {
      toast.success("Account Verifed !");
      Cookies.set("auth_token", data.data.tokens.refreshToken);
    },
    onError: (data: AxiosError) => {
      toast.error((data?.response?.data as any)?.message);
    },
  });
};
