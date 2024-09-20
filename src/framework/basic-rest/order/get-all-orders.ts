import { QueryOptionsType, Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { useMutation } from "react-query";

export interface FilterData {
  user_id: number;
  start_date: Date | undefined;
  end_date: Date | undefined;
  order_status: number | undefined;
  current_page: number | undefined;
}

const fetchOrderData = async (input: FilterData) => {
  let filterCriteria = "";
  if (input.user_id) {
    filterCriteria = filterCriteria + "user_id=" + input.user_id;
  }
  if (input.start_date) {
    filterCriteria = filterCriteria + "&start_date=" + input.start_date;
  }
  if (input.end_date) {
    filterCriteria = filterCriteria + "&end_date=" + input.end_date;
  }
  if (input.order_status) {
    filterCriteria = filterCriteria + "&order_status=" + input.order_status;
  }
  if (input.current_page) {
    filterCriteria = filterCriteria + "&current_page=" + "1";
  }
  // const { data } = await http.post(`api/product/list/user?metal_id=${1}`);
  const { data } = await http.get(
    `${API_ENDPOINTS.ORDERLIST}/?${filterCriteria}`
  );
  return data;
};

export const useOrderDataMutation = () => {
  return useMutation((input: FilterData) => fetchOrderData(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};

export const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.ORDERLIST);
  return { orders: { data: data as Order[] } };
};
export const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery<{ orders: { data: Order[] } }, Error>(
    [API_ENDPOINTS.ORDERLIST, options],
    fetchOrders
  );
};
