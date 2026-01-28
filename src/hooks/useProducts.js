import useFetch from "./useFetch";

export function useProducts (){

    return useFetch(['products'],'/Products');
    
    
}