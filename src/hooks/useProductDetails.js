import React from 'react'
import useFetch from './useFetch'
import i18n from '../i18n';

export  function useProductDetails(id) {
    return useFetch(['product',i18n.language, id],`/Products/${id}`);
}
