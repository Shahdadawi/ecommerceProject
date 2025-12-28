import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInnstance";

export function useProductDetails(id) {
  const getProductDetails = async () => {
    const res = await axiosInstance.get(`/Products/${id}?lang=en`);
    console.log(res);
    return res.data.response;
  };

  return useQuery({
    queryKey: ["product-details", id],
    queryFn: getProductDetails,
    enabled: !!id, 
  });
}
