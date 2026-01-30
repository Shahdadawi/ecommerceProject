import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useClearCart() {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn:()=> axiosAuthInstance.delete(`/Carts/clear`),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['carts']})
    }
  })
  

}
