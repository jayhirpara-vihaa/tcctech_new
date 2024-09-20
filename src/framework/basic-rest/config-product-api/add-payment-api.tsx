import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface paymentInputType {
    order_id: number;
    order_number: string;
    amount: number;
    token: string;
}

async function addPaymentConfig(input: paymentInputType) {
    const { data } = await http.post(API_ENDPOINTS.ADD_PAYMENT_CONFIG, input);
    return data;
}

export const usePaymentConfigMutation = () => {
    return useMutation((input: paymentInputType) => addPaymentConfig(input), {
        onSuccess: (data) => { },
        onError: (data) => {
            toast.error("Payment Failed !, please try again");
        },
    });
};
