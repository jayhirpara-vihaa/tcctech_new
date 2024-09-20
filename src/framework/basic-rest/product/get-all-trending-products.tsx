import { Product, newArrivel } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchTrendingProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.TRENDINGPRODUCT);
  return data as newArrivel ;
};
export const useTrendingProductsQuery = () => {
  return useQuery<newArrivel, Error>(
    [API_ENDPOINTS.TRENDINGPRODUCT],
    fetchTrendingProducts
  );
};
