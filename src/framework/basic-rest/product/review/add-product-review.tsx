import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface ProductReview {
  user_id: number;
  product_id: number;
  rating: number;
  reviewer_name: string;
  comment: string;
  images: string[];
}

async function addProductReview(input: ProductReview) {
  const { data } = await http.post(API_ENDPOINTS.ADDPRODUCTREVIEW, input, {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  });
  return data;
}

export const ProductReviewMutation = () => {
  return useMutation((input: ProductReview) => addProductReview(input), {
    onSuccess: (data) => {
      if (data?.code === 200 || data?.code === "200") {
        toast.success(
          "Thank you for your review. It has been submitted Successfully."
        );
      }
    },
    onError: (data) => { },
  });
};
