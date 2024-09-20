import { Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";

export interface FilterData {
  setting_type: number;
  min_price: number | undefined;
  max_price: number | undefined;
  metal_tone: number | undefined;
  diamond_shape: number | undefined;
  current_page: number | undefined;
  gender: number | undefined;
  product_category: string;
}
const fetchProducts = async (input: FilterData) => {
  let filterCriteria = "";
  if (input.setting_type) {
    filterCriteria = filterCriteria + "setting_type=" + input.setting_type;
  }
  if (input.min_price) {
    filterCriteria = filterCriteria + "&min_price=" + input.min_price;
  }
  if (input.max_price) {
    filterCriteria = filterCriteria + "&max_price=" + input.max_price;
  }
  if (input.metal_tone) {
    filterCriteria = filterCriteria + "&metal_tone=" + input.metal_tone;
  }
  if (input.current_page) {
    filterCriteria = filterCriteria + "&current_page=" + "1";
  }
  if (input.diamond_shape) {
    filterCriteria = filterCriteria + "&diamond_shape=" + input.diamond_shape;
  }
  if (input.gender) {
    filterCriteria = filterCriteria + "&gender=" + input.gender;
  }
  if (input.product_category) {
    filterCriteria =
      filterCriteria + "&product_category=" + input.product_category;
  }

  // const { data } = await http.post(`api/product/list/user?metal_id=${1}`);
  const { data } = await http.get(`product/list/user?${filterCriteria}`);
  return data;
};

export const useProductDataMutation = () => {
  return useMutation((input: FilterData) => fetchProducts(input), {
    onSuccess: (data) => { },
    onError: (data) => { },
  });
};
