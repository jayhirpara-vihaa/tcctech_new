import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface ChangePasswordInputType {
  new_password: string;
  old_password: string;
  confirm_password: string;
}
async function changePassword(input: ChangePasswordInputType) {
  return http.post(API_ENDPOINTS.ChangePassword, input);
  return input;
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: (data) => {
        toast.success("Password Change Sccessfully !");
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
            const errorMessages =
              ((data.response.data as any).message as any[]) || [];
            messages.push(errorMessages);
          } else if (code === 404) {
            messages.push((data.response.data as any).message);
          }
          const finalErrorMessage = messages.join("\n");
          toast.error(finalErrorMessage);
        }
      },
    }
  );
};
