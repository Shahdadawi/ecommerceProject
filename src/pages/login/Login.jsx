import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from '../../validations/LoginSchema'
import { Alert } from "@mui/material";

export default function Login() {
  const [serverErrors, setServerErrors] = useState([]);
  const [serverMessage, setServerMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur'
  });

  const loginForm = async (values) => {
    setServerErrors([]);
    setServerMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/login",
        values
      );
      if (response.status === 200) {
        console.log(response);
        setSuccessMessage(response.data.message);
        localStorage.setItem("token", response.data.accessToken);
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      }
    } catch (e) {
      console.log(e.response?.data);
      const data = e.response?.data;
      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        setServerErrors(data.errors);
      } else if (data?.message) {
        setServerMessage(data.message);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fb" }}>
      <Box sx={{ width: "100%", maxWidth: 450, backgroundColor: "#fff", p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>

        <Typography variant="h4" fontWeight={700} mb={1}>
          Member Login
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Welcome back!
        </Typography>

        {serverErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverErrors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </Alert>
        )}

        {serverMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverMessage}
          </Alert>
        )}



        {successMessage && serverErrors.length === 0 && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(loginForm)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          <TextField label="Email" {...register("email")} fullWidth
            error={errors.email} helperText={errors.email?.message} />

          <TextField label="Password" type="password" {...register("password")} fullWidth
            error={errors.password} helperText={errors.password?.message} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <FormControlLabel control={<Checkbox />} label="Remember me" />

            <Typography onClick={() => navigate("/forgotPassword")} variant="body2" sx={{ color: "#6c7ae0", cursor: "pointer" }}>
              Forgot your password?
            </Typography>

          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, backgroundColor: "#445b8f", fontWeight: 600, "&:hover": { backgroundColor: "#364a78" } }}
          >
            {isSubmitting ? <CircularProgress /> : 'Sign In'}          </Button>

        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          Have not an account?{" "}
          <Typography component="span" onClick={() => navigate("/register")} sx={{ color: "#6c7ae0", cursor: "pointer" }}>
            Sign up
          </Typography>
        </Typography>

      </Box>
    </Box>
  );

}
