import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations/LoginSchema";
import useLogin from "../../hooks/useLogin";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  const {
    serverErrors,
    serverMessage,
    successMessage,
    loginMutation,
    navigate,
  } = useLogin();

  const loginForm = async (values) => {
    await loginMutation.mutate(values);
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          {t("Member Login")}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {t("Welcome back!")}
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

        <Box
          component="form"
          onSubmit={handleSubmit(loginForm)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label={t("Email")}
            {...register("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label={t("Password")}
            type="password"
            {...register("password")}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label={t("Remember me")}
            />

            <Typography
              onClick={() => navigate("/forgotPassword")}
              variant="body2"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {t("Forgot your password?")}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              t("Sign In")
            )}
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          {t("Have not an account?")}{" "}
          <Typography
            component="span"
            onClick={() => navigate("/register")}
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {t("Sign up")}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
