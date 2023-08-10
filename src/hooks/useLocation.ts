import { useQuery } from 'react-query';

import { fetchData } from "../api";

export default function useLocation(debouncedSearchTerm: any) {
  return useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: 
        () => {
            if (debouncedSearchTerm) {
                return fetchData(`${process.env.REACT_APP_CURRENT_WEATHER_API_URL}geo/1.0/direct`, { 
                    params: {
                        q: debouncedSearchTerm,
                        limit: 5,
                        appid: process.env.REACT_APP_CURRENT_WEATHER_API_KEY
                    }
                })
            }
        }
    })
}