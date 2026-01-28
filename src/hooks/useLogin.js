import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/axiosInnstance";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../store/authStore";

export default function useLogin() {
  const [serverErrors, setServerErrors] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post("/Auth/Account/login", values);
      return response;
    },
    onSuccess: (response) => {
      const token = response.data.accessToken;
      const decoded = jwtDecode(token);
      const user = {
        name: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };
      setToken(token);
      setUser(user);
      setSuccessMessage(response.data.message);
      localStorage.setItem("token", response.data.accessToken);
      setTimeout(() => {
        navigate("/");
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

  return {
    serverErrors,
    serverMessage,
    successMessage,
    loginMutation,
    navigate,
  };
}
