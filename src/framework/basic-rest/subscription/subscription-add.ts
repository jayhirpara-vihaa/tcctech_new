import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface subscriptionInputType {
    email: string;
}
async function subscription(input: subscriptionInputType) {
    const { data } = await http.post(API_ENDPOINTS.SUBSCRIPTION, input);
    return data;
}

export const useSubscriptionMutation = () => {
    return useMutation((input: subscriptionInputType) => subscription(input), {
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (data: any) => {

            toast.error(data?.response.data.message)
        },
    });
};
