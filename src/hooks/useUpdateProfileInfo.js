import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export default function useUpdateProfileInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      return await axiosAuthInstance.patch("/Profile", profileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

