import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInnstance";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const [serverErrors, setServerErrors] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post("/Auth/Account/login", values);
      return response;
    },
    onSuccess: (response) => {
      setSuccessMessage(response.data.message);
      localStorage.setItem("token", response.data.accessToken);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (e) => {
      console.log(e.response?.data);
      const data = e.response?.data;
      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        setServerErrors(data.errors);
      } else if (data?.message) {
        setServerMessage(data.message);
      }
    },
  });

  return{serverErrors , serverMessage , successMessage , loginMutation,navigate }
}
