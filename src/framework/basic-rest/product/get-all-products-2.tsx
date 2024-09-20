// import { QueryOptionsType, Product } from '@framework/types'
// import http from '@framework/utils/http'
// import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
// import { useQuery } from 'react-query'
// import NewArrivalsData from "public/api/products_2.json";

// export const fetchProducts = async ({ queryKey }: any) => {
//   const [_key, _params] = queryKey
//   // const { data } = await http.get(API_ENDPOINTS.PRODUCTS_2)
//   const data = NewArrivalsData
//   return data as Product[]
// }
// export const useProductsQuery = (options: QueryOptionsType) => {
//   return useQuery<Product[], Error>(
//     [options],
//     fetchProducts
//   )
// }
