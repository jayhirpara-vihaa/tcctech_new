import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { BlogData } from "@framework/types";

export const fetchsBlogsDetails = async () => {
  const { data } = await http.get(API_ENDPOINTS.BLOGS);
  return data;
};

export const useBlogsDetailsQuery = () => {
  return useQuery([API_ENDPOINTS.BLOGS], fetchsBlogsDetails);
};
