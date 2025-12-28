import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ResetPasswordSchema } from "../../validations/ResetPasswordSchema";
import axiosInstance from "../../Api/axiosInnstance";

export default function ResetCode() {
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

  const {register,handleSubmit,formState: { errors },} = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  const resetPasswordForm = async (values) => {
    setServerErrors([]);
    setServerMessage("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.patch(
        "/auth/Account/ResetPassword",
        {
          email,               
          code: values.code,
          newPassword: values.newPassword,
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message || "Password reset successfully");

        localStorage.removeItem("resetEmail");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }

    } catch (e) {
      const data = e.response?.data;
      if (Array.isArray(data?.errors)) {
        setServerErrors(data.errors);
      } else if (data?.message) {
        setServerMessage(data.message);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Reset Password
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Enter the code sent to <b>{email}</b>
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

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(resetPasswordForm)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Reset Code"
            {...register("code")}
            fullWidth
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label="New Password"
            type="password"
            {...register("newPassword")}
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: "#445b8f",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#364a78" },
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
