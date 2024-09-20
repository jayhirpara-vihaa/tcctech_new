import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery, useMutation } from "react-query";

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ORDER}`);
  return data;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
    fetchOrder(id)
  );
};

export const fetchOrderDescription = async (Input: any) => {
  const data = http.post(API_ENDPOINTS.ORDERDETAILS, Input);
  return data;
};

export const useOrderDescriptionMutation = () => {
  return useMutation((input: any) => fetchOrderDescription(input), {
    onSuccess: (data: any) => {},
    onError: (data: any) => {},
  });
};
