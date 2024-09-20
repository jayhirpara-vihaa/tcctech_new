import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchAllBirthstoneProduct = async () => {
    const { data } = await http.get(API_ENDPOINTS.GET_ALL_BIRTHSTONE_PRODUCT);
    return data;
};

export const useGetBirthstoneProductQuery = () => {
    return useQuery(
        [API_ENDPOINTS.GET_ALL_BIRTHSTONE_PRODUCT],
        fetchAllBirthstoneProduct
    );
};
