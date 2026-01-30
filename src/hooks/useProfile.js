import React from 'react'
import useFetch from './useFetch';
import i18n from '../i18n';
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useProfile() {
    return useFetch(['profile' , i18n.language],'/Profile' ,{}, axiosAuthInstance);

}
