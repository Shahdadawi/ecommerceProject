
import i18n from "../i18n";
import useFetch from "./useFetch";


export function useCategories (){

    return useFetch(['categories' , i18n.language],'/Categories');

}