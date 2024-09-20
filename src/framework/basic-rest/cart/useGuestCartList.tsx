import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CartListInputType {
  user_id: string;
}
async function guestCartList(input: any) {
  const { data } = await http.post(API_ENDPOINTS.GUEST_CART_LIST, input);
  return data;
}

export const useGuestCartList = () => {
  return useMutation((input: any) => guestCartList(input), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
