import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface UpdateCartType {
    user_id: any;
    product_id: any;
    metal_id: any;
    karat_id: any;
    metal_tone_id: any;
    ring_size: null;
    center_diamond_group_id: any;
    SKU: string;
    is_band: any;
    image: string;
}
async function addCart(input: UpdateCartType) {
    const { data } = await http.post(API_ENDPOINTS.ADDCARTPRODUCT, input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}

export const useAddCartMutation = () => {
    return useMutation((input: UpdateCartType) => addCart(input), {
        onSuccess: (data) => { },
        onError: (data) => { },
    });
};