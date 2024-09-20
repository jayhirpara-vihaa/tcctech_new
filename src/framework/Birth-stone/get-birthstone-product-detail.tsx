import { ProductDetails } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation, useQuery } from "react-query";

// export const fetchBirthstoneProductDetail = async (Input: any) => {
//     const data = http.post(API_ENDPOINTS.BIRTHSTONE_PRODUCT_DETAILS, Input);
//     return data as unknown as ProductDetails;
// };
// export const useBirthstoneProductDetailQuery = (Input: any) => {
//     return useQuery<any, Error>([API_ENDPOINTS.BIRTHSTONE_PRODUCT_DETAILS, Input], () =>
//         fetchBirthstoneProductDetail(Input)
//     );
// };

export const fetchBirthstoneProductDetail = async (Input: any) => {
    const { data } = await http.post(API_ENDPOINTS.BIRTHSTONE_PRODUCT_DETAILS, Input);
    return data;
};
export const useBirthstoneProductDetailQuery = () => {
    return useMutation((input: any) => fetchBirthstoneProductDetail(input), {
        onSuccess: (data) => { },
        onError: (data) => { },
    });
};
