import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
export interface EditAddressType {
  country_id: string;
  state_id: string;
  address_type: string;
  city_id: string;
  phone_number: number;
  house_building: string;
  area_name: string;
  default_addres: string;
  pincode: string;
  id: number;
}

async function editAddress(input: EditAddressType) {
  return http.put(API_ENDPOINTS.EDIT_ADDRESS, input);
}

export const useEditAddressMutation = () => {
  return useMutation((input: EditAddressType) => editAddress(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
