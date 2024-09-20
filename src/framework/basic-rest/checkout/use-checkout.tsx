// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CheckoutInputType {
  fullName_s: string;
  phone_s: string;
  email_s: string;
  address_s: string;
  city_s: string;
  pincode_s: string;
  save: boolean;
  note: string;
}

async function checkout(input: CheckoutInputType) {
  // return http.post(API_ENDPOINTS.ChangeEmail, input);
  return input;
}
export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutInputType) => checkout(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
