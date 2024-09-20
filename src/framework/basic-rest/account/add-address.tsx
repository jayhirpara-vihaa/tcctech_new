import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import useAuthedMutation from "@utils/use-authed-mutation";
import { useMutation } from "react-query";
export interface CheckoutInputType {
  full_name: string;
  country_id: string;
  state_id: string;
  address_type: string;
  city_id: string;
  phone_number: number;
  house_building: string;
  area_name: string;
  default_addres: string;
  pincode: string;
  user_id: string;
}

export interface getAddressInputType {
  user_id: string;
}

async function addAddress(input: CheckoutInputType) {
  return http.post(API_ENDPOINTS.ADD_ADDRESS, input);
}

async function getAddress(input: getAddressInputType) {
  return http.post(API_ENDPOINTS.GET_ADDRESS, input);
}

export const useAddAddressMutation = () => {
  return useMutation((input: CheckoutInputType) => addAddress(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};

export const useGetAddressressMutation = () => {
  return useMutation((input: getAddressInputType) => getAddress(input), {
    onSuccess: (data: any) => {},
    onError: (data: any) => {},
  });
};
