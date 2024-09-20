import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CartProductListInputType {
  user_id: string;
}
async function cartConfigProductList(input: CartProductListInputType) {
  const { data } = await http.post(
    API_ENDPOINTS.CONFIG_CART_PRODUCT_LIST,
    input
  );
  console.log("datadata", data);
  return data;
}

export const useCartConfigProductList = () => {
  return useMutation(
    (input: CartProductListInputType) => cartConfigProductList(input),
    {
      onSuccess: (data) => {},
      onError: (data) => {},
    }
  );
};
