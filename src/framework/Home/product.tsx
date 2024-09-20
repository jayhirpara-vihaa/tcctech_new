import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'

export const fetchHomeAboutProducts = async () => {
    const { data } = await http.get(API_ENDPOINTS.HOMEANDABOUT)
    return data 
}

export const useHomeAboutQuery = () => {
    return useQuery(
        [API_ENDPOINTS.HOMEANDABOUT],
        fetchHomeAboutProducts
    ) 
}
