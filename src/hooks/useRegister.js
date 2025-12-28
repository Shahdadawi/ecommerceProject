import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInnstance";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  const [serverErrors, setServerErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (values) => {
      return await axiosInstance.post("/Auth/Account/Register", values);
    },
    onSuccess: () => {
      setSuccessMessage("Account created successfully");
      navigate('/login');
    },
    onError: (e) => {
      setServerErrors(e.response?.data?.errors || []);
    }
  })

  return {serverErrors,registerMutation,successMessage}

}
