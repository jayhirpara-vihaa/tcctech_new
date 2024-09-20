import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";
import http from "@framework/utils/http";


async function shopifyAddTocartBirthSTone(input: any) {
    const { data } = await http.post(API_ENDPOINTS.SHOPIFY_ADD_CART_BIRTHSTONE_ZAMLES_API, input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}

export const useShopifyAddCartBirsthStoneMutation = () => {
    return useMutation((input: any) => shopifyAddTocartBirthSTone(input), {
        onSuccess: (data) => { },
        onError: (data) => { },
    });
};