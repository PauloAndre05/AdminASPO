import useSWR from 'swr';
import { api } from '../services';

function useFetch(url: string) {
    const { data, error } = useSWR(url, async url => {
        const response = await api.get(url);
        const data = response.data;
        return data;
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useFetch;