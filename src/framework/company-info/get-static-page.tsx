import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";
import { BlogData } from "@framework/types";

interface ProductDetailSlug {
  slug: string;
}

async function fetchStaticDetail(input: ProductDetailSlug) {
  const { data } = await http.post(API_ENDPOINTS.STATICPAGE, input);
  return data;
}
export const useStaticDetailMutation = () => {
  return useMutation((input: ProductDetailSlug) => fetchStaticDetail(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
