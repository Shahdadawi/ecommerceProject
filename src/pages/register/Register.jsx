import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validations/RegisterSchema";
import useRegister from "../../hooks/useRegister";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });

  const { serverErrors, successMessage, registerMutation } = useRegister();

  const registerForm = async (values) => {
    await registerMutation.mutate(values);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          m: 5,
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          {t("Create an account")}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {t("Access to all features.")}
        </Typography>

        {serverErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverErrors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </Alert>
        )}

        {successMessage && serverErrors.length === 0 && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(registerForm)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label={t("User Name")}
            {...register("userName")}
            fullWidth
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            label={t("Full Name")}
            {...register("fullName")}
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
            label={t("Phone Number")} 
            {...register("phoneNumber")}
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

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

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              t("Sign Up")
            )}
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          {t("Already have an account?")}{" "}
          <Typography
            component={Link}
            to="/login"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {t("Sign In")}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
