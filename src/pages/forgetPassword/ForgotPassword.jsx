import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordSchema } from "../../validations/ForgotPasswordSchema";
import useForgotPassword from "../../hooks/useForgotPassword";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: "onBlur",
  });

  const {
    serverErrors,
    serverMessage,
    forgotPasswordMutation,
    successMessage,
    navigate,
  } = useForgotPassword();

  const forgotPasswordForm = async (values) => {
    await forgotPasswordMutation.mutate(values);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Forgot Password?
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Enter your email and we’ll send you a reset Code.
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
          onSubmit={handleSubmit(forgotPasswordForm)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Email"
            {...register("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            Send Reset Code
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          Remember your password?{" "}
          <Typography
            component="span"
            onClick={() => navigate("/login")}
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign In
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
