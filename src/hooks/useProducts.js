import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInnstance";

export function useProducts() {
  const getProducts = async () => {
    const res = await axiosInstance.get("/Products");
    console.log("PRODUCTS RESPONSE:", res);
    return res.data.response.data;
  };

  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
