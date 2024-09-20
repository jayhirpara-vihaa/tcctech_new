import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export const fetchBirthstoneProductPrice = async (input: any) => {
    return http.post(API_ENDPOINTS.BIRTHSTONE_PRODUCT_PRICE_FIND, input);
    return input;
};

export const useBirthstoneProductPriceQuery = () => {
    return useMutation((input: any) => fetchBirthstoneProductPrice(input), {
        onSuccess: (data) => { },
        onError: (data) => { },
    });
};
