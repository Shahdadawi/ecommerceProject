import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInnstance";

export function useCategories() {
  const getCategories = async () => {
    const response = await axiosInstance.get("/Categories");
    console.log(response);
    return response.data.response;
  };

  const query = useQuery({
    queryKey: ["categories"],
    staleTime: 5 * 60 * 1000,
    queryFn: getCategories,
  });


  return query;
}
