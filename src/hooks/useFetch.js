import React from 'react'
import axiosInstance from '../Api/axiosInnstance';
import { useQuery } from '@tanstack/react-query';

export default function useFetch(queryKey, url,params ={} , instance = axiosInstance) {
    const fetchData = async () => {
        const response = await instance.get(url,{params});
        console.log("API Response:", response.data); 
        return response.data?.response || response.data || []; 
    }

    const query = useQuery({
        queryKey: queryKey,
        staleTime: 5 * 60 * 1000,
        queryFn: fetchData
    });

    return query;
}