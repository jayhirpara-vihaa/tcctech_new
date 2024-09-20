import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface AddToCartInputType {
  user_id: string;
  product_id: string;
  SKU: string;
  length: string | null;
  size: string | null;
  metal_id: string;
  karat_id: string;
  metal_tone_id: string;
}
async function addToCart(input: AddToCartInputType) {
  const { data } = await http.post(API_ENDPOINTS.ADD_TO_CART, input);
  return data;
}

export const useAddToCart = () => {
  return useMutation((input: AddToCartInputType) => addToCart(input), {
    onSuccess: (data) => {
      toast.success("Product Added in to cart Successfully");
    },
    onError: (data: AxiosError) => {
      if (
        data &&
        data.response &&
        data.response.data &&
        (data.response.data as any).status === "error"
      ) {
        const code = (data.response.data as any).code;
        const messages: any[] = [];

        if (code === 400) {
          const errorMessages =
            ((data.response.data as any).message as any[]) || [];
          messages.push(errorMessages);
        } else if (code === 404) {
          messages.push((data.response.data as any).message);
        }
        const finalErrorMessage = messages.join("\n");
        toast.error(finalErrorMessage);
      }
    },
  });
};
