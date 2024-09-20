import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'
// import ProductData from '../../../public/api/the_process.json'

export const fetchBanner = async () => {
    const { data } = await http.get(API_ENDPOINTS.BANNERLIST)
    return data
}
export const useBanner = () => {
    return useQuery(
        [API_ENDPOINTS.BANNERLIST],
        fetchBanner
    )
}

