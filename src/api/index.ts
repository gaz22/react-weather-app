import axios from 'axios';

export const fetchData = async(endpoint: string, params?: any) =>{
    return await axios.get(endpoint, params).then((res: any) => res.data)
}