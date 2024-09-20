import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

interface userId {
  user_id: number;
}

async function cartAndWishlistCountList(Input: userId) {
  const { data } = await http.post(API_ENDPOINTS.WISHLISTANDCARTCOUNT, Input);
  return data;
}

export const useCartAndWishlistCountMutation = () => {
  return useMutation((input: userId) => cartAndWishlistCountList(input));
};

