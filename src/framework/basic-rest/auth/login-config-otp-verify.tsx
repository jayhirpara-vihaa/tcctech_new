import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
export interface VerifyOtpInput {
    user_name: string;
    otp: string;
}

async function configVerifyOTP(input: VerifyOtpInput) {
    const { data } = await http.post(API_ENDPOINTS.CONFIG_VERIFY_OTP, input);
    return data;
}
export const useConfigVeifyOTPMutation = () => {
    return useMutation((input: VerifyOtpInput) => configVerifyOTP(input), {
        onSuccess: (data) => {
            toast.success("Account Verifed !");
        },
        onError: (data: AxiosError) => {
            //sessionStorage.removeItem('config_user_email')
            toast.error((data?.response?.data as any)?.message);
        },
    });
};
