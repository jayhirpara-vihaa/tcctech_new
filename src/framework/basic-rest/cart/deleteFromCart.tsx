import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
export interface AddToCartInputType {
  user_id: string;
  product_id: string;
}
async function deleteFromCart(input: AddToCartInputType) {
  const { data } = await http.post(API_ENDPOINTS.DELETE_ITEM_FROM_CART, input);
  return data;
}

export const useDeleteFromCart = () => {
  return useMutation((input: AddToCartInputType) => deleteFromCart(input), {
    onSuccess: (data) => {
      toast.success("Record Deleted Successfully");
    },
    onError: (data) => {},
  });
};
