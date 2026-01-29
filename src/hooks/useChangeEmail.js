import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export default function useChangeEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newEmail }) => {
      return await axiosAuthInstance.patch(
        "/Profile/change-email",
        { NewEmail: newEmail }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
