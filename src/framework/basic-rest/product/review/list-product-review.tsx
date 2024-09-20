import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

interface ProductId {
  product_id: number;
}
export interface reviewList {
  data: reviewListData[];
}
export interface reviewListData {
  id: number;
  reviewer_id: number;
  product_id: number;
  rating: number;
  reviewer_name: string;
  comment: string;
  modified_date: string;
  product_images: reviewImage[];
}

export interface reviewImage {
  image_path: string;
}
async function listProductReview(input: ProductId) {
  const { data } = await http.post(API_ENDPOINTS.LISTPRODUCTREVIEW, input);
  return data as reviewList;
}
export const listProductReviewMutation = () => {
  return useMutation((input: ProductId) => listProductReview(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
