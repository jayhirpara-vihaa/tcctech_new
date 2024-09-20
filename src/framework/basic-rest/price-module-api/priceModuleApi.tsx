import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";

export const fetchConfiguratorProductPrice = async (input: any) => {
  return http.post(API_ENDPOINTS.CONFIGURATOR_PRODUCT_PRICE, input);
  return input;
};

export const useConfiguratorProductPriceQuery = () => {
  return useMutation((input: any) => fetchConfiguratorProductPrice(input), {
    onSuccess: (data) => { },
    onError: (data) => { },
  });
};
