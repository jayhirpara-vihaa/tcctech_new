import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  City: string;
  zipCode: string;
  Country: string;
  State: string;
}

async function getAddress(input: CheckoutInputType) {
  return http.post(API_ENDPOINTS.GET_ADDRESS, input);
  return input;
}
export const useGetAddressMutation = () => {
  return useMutation((input: CheckoutInputType) => getAddress(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
