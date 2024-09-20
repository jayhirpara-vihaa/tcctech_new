import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
import http from "@framework/utils/http";


async function shopifyAddTocart(input: any) {
    const { data } = await http.post(API_ENDPOINTS.SHOPIFY_ADD_CART_API, input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}

export const useShopifyAddCartMutation = () => {
    return useMutation((input: any) => shopifyAddTocart(input), {
        onSuccess: (data) => { },
        onError: (data) => { },
    });
};