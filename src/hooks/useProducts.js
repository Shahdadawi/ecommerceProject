import i18n from "../i18n";
import useFetch from "./useFetch";

export function useProducts (){

    return useFetch(['products' , i18n.language],'/Products');
    
    
}