import { AppointmentInputType } from "@framework/inquiries/make-appointment";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface OrderInputType {
  fullName_s: string;
  phone_s: string;
  email_s: string;
  address_s: string;
  city_s: string;
  pincode_s: string;
  save: boolean;
  note: string;
  fullName_b: string;
  phone_b: string;
  email_b: string;
  address_b: string;
  city_b: number;
  pincode_b: number;
  created_by: number;
  user_id?: number;
}
async function addOrder(input: any) {
  const { data } = await http.post(API_ENDPOINTS.ADDORDER, input);
  return data;
}

export const useOrderMutation = () => {
  return useMutation((input: any) => addOrder(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
