import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";

interface userId {
  user_id: number;
}

async function listWishList(Input: userId) {
  const { data } = await http.post(API_ENDPOINTS.LISTPRODUCTWISHLIST, Input);
  return data;
}

export const useListWishListMutation = () => {
  return useMutation((input: userId) => listWishList(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
