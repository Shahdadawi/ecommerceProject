import React from 'react'
import useFetch from './useFetch'

export  function useProductDetails(id) {
    return useFetch(['product', id],`/Products/${id}`);
}
