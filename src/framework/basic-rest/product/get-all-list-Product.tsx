import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery, useQuery } from "react-query";
import productsData from "public/api/products.json"
type PaginatedProduct = {
	// data: Product[];
	paginatorInfo: any;
};
const fetchlistProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.PRODUCTLIST);
	return data
        // data: shuffle(data),

		// paginatorInfo: {
		// 	nextPageUrl: "",
		// },
        

};

const useListProductsQuery = () => {
	return useQuery(
		[API_ENDPOINTS.PRODUCTLIST],
		fetchlistProducts,
		// {
		// 	getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		// }
	);
};

export { useListProductsQuery, fetchlistProducts };
