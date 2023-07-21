import axios from 'axios';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const fetchLocation = async(endpoint: string) =>{
    return await axios.get(endpoint).then((res: any) => res.data)
}

export const fetchWeatherData = async(queryKey: string, endpoint: string) => {
    return await queryClient.fetchQuery(
        [queryKey],
        {
            queryFn: () =>
            axios
                .get(endpoint)
                .then((res) => res.data)
        }
    );
}