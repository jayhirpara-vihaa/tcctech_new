import { ProductData, ProductDetails } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";
import * as productData from "../../../../public/api/product.json";

export const fetchProductDescription = async (Input: any) => {
  const data = http.post(API_ENDPOINTS.PRODUCTDESCRIPTION, Input);
  return data as unknown as ProductDetails;
};
export const useProductDescriptionQuery = (Input: any) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTDESCRIPTION, Input], () =>
    fetchProductDescription(Input)
  );
};

// async function productDescription(input: any) {
//   const { data } = await http.post(API_ENDPOINTS.PRODUCTDESCRIPTION, input);
//   return data as ProductDetails;
// }
// export const listProductDescriptionMutation = () => {
//   return useMutation((input: any) => fetchProductDescription(input), {
//     onSuccess: (data) => {},
//     onError: (data) => {},
//   });
// };
