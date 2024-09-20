import { Product, newArrivel } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchFeaturedProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FEATUREDPRODUCT);
  return data as newArrivel ;
};
export const useFeaturedProductsQuery = () => {
  return useQuery<newArrivel, Error>(
    [API_ENDPOINTS.FEATUREDPRODUCT],
    fetchFeaturedProducts
  );
};
