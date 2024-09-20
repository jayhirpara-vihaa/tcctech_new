import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface SignUpInputType {
    user_name: string;
}

async function checkOtpVerify(input: SignUpInputType) {
    const { data } = await http.post(API_ENDPOINTS.OTPVERIFICATIONCONFIG, input);
    return data;
}

export const useCheckOtpVerify = () => {
    const { authorize } = useUI();
    return useMutation((input: SignUpInputType) => checkOtpVerify(input), {
        onSuccess: (data) => {
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
