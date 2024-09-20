import { FilterQueryType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";

const fetchFiltetrs = async () => {
    // const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.PRODUCTSFILTER);
    return  data ;
};

const useFilterQuery = () => {
    return useQuery<{ data: FilterQueryType }>(
        [API_ENDPOINTS.PRODUCTSFILTER],
        fetchFiltetrs
    );
};

export { useFilterQuery, fetchFiltetrs };




