
import useFetch from "./useFetch";


export function useCategories (){

    return useFetch(['categories'],'/Categories');

}