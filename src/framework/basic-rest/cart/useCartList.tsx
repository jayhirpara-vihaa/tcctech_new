import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CartListInputType {
  user_id: string;
}
async function cartList(input: CartListInputType) {
  const { data } = await http.post(API_ENDPOINTS.CART_LIST, input);
  console.log("datadata", data);
  return data;
}

export const useCartList = () => {
  return useMutation((input: CartListInputType) => cartList(input), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};
