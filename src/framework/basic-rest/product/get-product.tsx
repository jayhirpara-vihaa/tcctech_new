import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import * as productData from "../../../../public/api/product.json";

export const fetchProduct = async (_slug: string) => {
  const data = productData;
  return data;
};
export const useProductQuery = (slug: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
