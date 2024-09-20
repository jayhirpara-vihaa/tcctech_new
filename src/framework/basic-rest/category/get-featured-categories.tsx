import {  Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';



const fetchFeaturedCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {data: { data },} = await http.get(API_ENDPOINTS.FEATUREDCATEGORIES);
  return  data 
};

export const useFeaturedCategoriesQuery = () => {
    return useQuery([API_ENDPOINTS.FEATUREDCATEGORIES], 
        fetchFeaturedCategories
    );


};