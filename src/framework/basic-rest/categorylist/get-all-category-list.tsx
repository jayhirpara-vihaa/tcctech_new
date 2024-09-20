import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";

export type CategoryApiData = {
    data?: CategoryData
}
type CategoryData = {
  id: number;
  category_name: string;
  parent_id: number;
  slug: string;
  position: string;
}

const fetchCategoryData = async () => {
  // const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CATEGORYLIST);
  return data;
};

const useCategoryDataQuery = () => {
  return useQuery<{ data : CategoryApiData }>(
    [API_ENDPOINTS.CATEGORYLIST],
    fetchCategoryData
  );
};

export { fetchCategoryData, useCategoryDataQuery };
