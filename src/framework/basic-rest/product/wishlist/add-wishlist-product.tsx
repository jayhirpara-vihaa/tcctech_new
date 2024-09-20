import { ProductDetails } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

interface userId {
  product_id: number;
  user_id: number;
}
async function addWishList(Input: userId) {
  const { data } = await http.post(API_ENDPOINTS.ADDPRODUCTWISHLIST, Input);
  return data;
}

export const useAddWishListMutation = () => {
  return useMutation((input: userId) => addWishList(input), {
    onSuccess: (data) => {
      toast.success("Product added in wishlist SuccessFully");
    },
    onError: (data) => {},
  });
};
