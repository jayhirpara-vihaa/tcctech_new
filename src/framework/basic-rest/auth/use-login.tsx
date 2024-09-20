import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ROUTES } from "@utils/routes";
import { AUTH_TOKEN, USER_DETAILS } from "@utils/constants";
export interface LoginInputType {
  username: string;
  password: string;
}
async function login(input: LoginInputType) {
  const { data } = await http.post(API_ENDPOINTS.LOGIN, input);
  return data;
}

export const useLoginMutation = () => {
  // const router = useRouter();

  const { authorize } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      if (data?.code === 200 || data?.code === "200") {
        toast.success("Login Successfully !");
        Cookies.set(USER_DETAILS, JSON.stringify(data.data.user_detail));
        Cookies.set(AUTH_TOKEN, data.data.tokens.token);
        authorize();
      }
    },
    onError: (data: AxiosError) => {
      if (data && data.response && data.response.data) {
        const code = (data.response.data as any).code;
        const messages: any[] = [];

        if (code === 400) {
          const errorMessages =
            ((data.response.data as any).data as any[]) || [];
          errorMessages.map((t: any) => {
            messages.push(t.msg);
          });
        } else if (code === 404) {
          messages.push((data.response.data as any).message);
        } else if (parseInt(code) === 403) {
          messages.push((data.response.data as any).message);
        }
        const finalErrorMessage = messages.join("\n");
        toast.error(finalErrorMessage);
      }
      // sessionStorage.setItem(
      //   "userID",
      //   JSON.stringify((data?.response?.data as any)?.data)
      // );
      // if ((data?.response?.data as any)?.status) {
      //   router.push(`${ROUTES.OTP_VERIFICATION}`, undefined, {
      //     locale: router.locale,
      //   });
      // }
    },
  });
};
