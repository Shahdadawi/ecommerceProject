import { useMutation } from "@tanstack/react-query";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export default function useChangePassword() {
  return useMutation({
    mutationFn: async (passwords) => {
      return await axiosAuthInstance.patch(
        "/Profile/change-password",
        passwords
      );
    },
  });
}
