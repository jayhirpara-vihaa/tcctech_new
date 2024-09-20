import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

interface userId {
  user_id: number;
  product_id: number;
}

async function DeleteWishList(Input: userId) {
  const { data } = await http.post(API_ENDPOINTS.DELETEPRODUCTWISHLIST, Input);
  return data;
}

export const useDeleteWishListMutation = () => {
  return useMutation((input: userId) => DeleteWishList(input), {
    onSuccess: (data) => {
      toast.success("Product remove from wishlist");
    },
    onError: (data) => {},
  });
};
