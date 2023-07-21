import axios from 'axios';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const fetchLocation = async(endpoint: string, params?: any) =>{
    return await axios.get(endpoint, params).then((res: any) => res.data)
}

export const fetchWeatherData = async(queryKey: string, endpoint: string, params?: any) => {
    return await queryClient.fetchQuery(
        [queryKey],
        {
            queryFn: () =>
            axios
                .get(endpoint, params)
                .then((res) => res.data)
        }
    );
}