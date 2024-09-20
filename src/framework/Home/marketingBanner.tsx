import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'

export const fetchMarketingBanner= async () => {
    const { data } = await http.get(API_ENDPOINTS.POPUPMARKETINGBANNER)
    return data 
}
export const useMarketingBanner = () => {
    return useQuery(
        [API_ENDPOINTS.POPUPMARKETINGBANNER],
        fetchMarketingBanner
    )
}

