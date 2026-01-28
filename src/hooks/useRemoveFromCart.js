import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useRemoveFromCart() {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(cartItemId)=> axiosAuthInstance.delete(`/carts/${cartItemId}`),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['carts']})
    }
  })
  

}
