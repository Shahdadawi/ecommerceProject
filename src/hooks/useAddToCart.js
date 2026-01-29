import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";
import Swal from "sweetalert2";

export default function useAddToCart() {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async ({ ProductId, Count }) => {
      const response = await axiosAuthInstance.post("/Carts", {
        ProductId,
        Count,
      });
      console.log("Add to cart response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to cart",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          popup: "swal-toast-offset",
        },
      });

      console.log("Invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  return addToCartMutation;
}
