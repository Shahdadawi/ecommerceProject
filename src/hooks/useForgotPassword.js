import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInnstance";

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: async (values) => {
      return await axiosInstance.post("/Auth/Account/SendCode", values);
    },

    onSuccess: (response, variables) => {
      localStorage.setItem("resetEmail", variables.email);

      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate("/resetCode");
      }, 1000);
    },

    onError: (e) => {
      const data = e.response?.data;
      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        setServerErrors(data.errors);
      } else if (data?.message) {
        setServerMessage(data.message);
      }
    },
  });


  return {serverErrors,serverMessage,successMessage,forgotPasswordMutation,navigate}
}
