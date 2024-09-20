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

async function addPayment(input: paymentInputType) {
  const { data } = await http.post(API_ENDPOINTS.ADD_PAYMENT, input);
  return data;
}

export const usePaymentMutation = () => {
  return useMutation((input: paymentInputType) => addPayment(input), {
    onSuccess: (data) => {},
    onError: (data) => {
      toast.error("Payment Failed !, please try again");
    },
  });
};
