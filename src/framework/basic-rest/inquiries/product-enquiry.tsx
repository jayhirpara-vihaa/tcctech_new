import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface EnquiryInputType {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  message: string;
  product_id: number;
  SKU: string;
  size: number;
  length: string;
  metal_id: number;
  karat_id: number;
  metal_tone_id: number;
}
async function productEnquiry(input: EnquiryInputType) {
  const { data } = await http.post(API_ENDPOINTS.PRODUCTENQUIRY, input);
  return data;
}

export const useProductEnquiryMutation = () => {
  return useMutation((input: EnquiryInputType) => productEnquiry(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
