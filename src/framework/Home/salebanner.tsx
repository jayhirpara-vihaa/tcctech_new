import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'

export const fetchMarketigBanner= async () => {
    const { data } = await http.get(API_ENDPOINTS.MARKETINGBANNER)
    return data 
}
export const useMarketingBanner = () => {
    return useQuery(
        [API_ENDPOINTS.MARKETINGBANNER],
        fetchMarketigBanner
    )
}

