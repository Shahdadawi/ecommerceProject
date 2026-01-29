import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export default function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ PaymentMethod }) => {
      return await axiosAuthInstance.post("/Checkouts", { PaymentMethod });
    },
    onSuccess: (response) => {
      if (response.data.url) {
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 3000);
      }
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
