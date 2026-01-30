import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";
import Swal from "sweetalert2";

export default function useAddReview() {
  const queryClient = useQueryClient();

  const addReviewMutation = useMutation({
    mutationFn: async ({ Rating, Comment , ProductId }) => {
      const response = await axiosAuthInstance.post(`/Products/${ProductId}/reviews`, {
        Rating,
        Comment,
      });
      console.log("Add Review response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added Review",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
          popup: "swal-toast-offset",
        },
      });

      console.log("Invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return addReviewMutation;
}
