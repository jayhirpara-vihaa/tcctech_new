import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface SignUpInputType {
  full_name: string;
  username: string;
  mobile: string;
  password: string;
  confirm_password: string;
  country_id: string;
}

async function signUp(input: SignUpInputType) {
  const { data } = await http.post(API_ENDPOINTS.REGISTER, input);
  return data;
}

export const useSignUpMutation = () => {
  const { authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      toast.success("Account created, please verify your account");
      authorize();
    },
    onError: (data: AxiosError) => {
      if (
        data &&
        data.response &&
        data.response.data &&
        (data.response.data as any).status === "error"
      ) {
        const code = (data.response.data as any).code;
        const messages: any[] = [];

        if (code === 400) {
          messages.push((data.response.data as any).message);
        } else if (code === 404) {
          messages.push((data.response.data as any).message);
        }

        console.log("messages", messages);
        const finalErrorMessage = messages.join("\n");
        toast.error(finalErrorMessage);
      }
    },
  });
};
