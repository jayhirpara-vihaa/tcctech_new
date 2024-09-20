import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface ForgetPasswordType {
  username: string;
}

interface ForgetpasswordResponseData {
  message: string;
  msg: string;
}

async function forgetPassword(input: ForgetPasswordType) {
  const { data } = await http.post(API_ENDPOINTS.FORGET_PASSWORD, input);
  return data;
}
export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordType) => forgetPassword(input), {
    onSuccess: () => {
      toast.success("Link for reset password is sended to you via mail !");
    },
    onError: (data: ForgetpasswordResponseData) => {},
  });
};
