import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export const fetchConfigOrderDescription = async (Input: any) => {
  const data = http.post(API_ENDPOINTS.CONFIG_ORDER_DETAIL, Input);
  return data;
};

export const useConfigOrderDescriptionMutation = () => {
  return useMutation((input: any) => fetchConfigOrderDescription(input), {
    onSuccess: (data: any) => {},
    onError: (data: any) => {},
  });
};
