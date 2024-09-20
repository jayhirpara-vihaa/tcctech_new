import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";
import { BlogData } from "@framework/types";

interface ProductDetailSlug {
  slug: string;
}

async function fetchsBlogsDetail(input: ProductDetailSlug) {
  const { data } = await http.post(API_ENDPOINTS.BLOGSDETAILS, input);
  return data;
}
export const useBlogsDetailMutation = () => {
  return useMutation((input: ProductDetailSlug) => fetchsBlogsDetail(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
