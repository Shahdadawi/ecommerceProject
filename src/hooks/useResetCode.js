import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInnstance";
import { useMutation } from "@tanstack/react-query";

export default function useResetCode() {
  const navigate = useNavigate();

  const [serverErrors, setServerErrors] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/forgotPassword");
    }
  }, [email, navigate]);

  const resetCodeMutation = useMutation({
    mutationFn: async (values) => {
      return await axiosInstance.patch("/Auth/Account/ResetPassword", {
        email,
        code: values.code,
        newPassword: values.newPassword,
      });
    },

    onSuccess: (response) => {
      const message =
        response?.data?.message ||
        response?.data?.data?.message ||
        "Password reset successfully";

      setSuccessMessage(message);
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },

    onError: (e) => {
      const data = e.response?.data;
      if (Array.isArray(data?.errors)) {
        setServerErrors(data.errors);
      } else if (data?.message) {
        setServerMessage(data.message);
      }
    },
  });

  return {
    serverErrors,
    serverMessage,
    successMessage,
    resetCodeMutation,
    email,
  };
}
