
import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'
// import ProductData from '../../../public/api/the_process.json'

export const fetchRingSize = async () => {
    const { data } = await http.get(API_ENDPOINTS.RING_SIZE_DROPDOWN)
    return data
}
export const useRingSize = () => {
    return useQuery(
        [API_ENDPOINTS.BANNERLIST],
        fetchRingSize
    )
}

