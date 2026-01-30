import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "../../validations/ResetPasswordSchema";
import useResetCode from "../../hooks/useResetCode";
import { useTranslation } from "react-i18next";

export default function ResetCode() {
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  const {
    serverErrors,
    serverMessage,
    successMessage,
    resetCodeMutation,
    email,
  } = useResetCode();

  const resetPasswordForm = async (values) => {
    await resetCodeMutation.mutate(values);
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
          {t("Reset Password")}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {t("Enter the code sent to")} <b>{email}</b>
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
            label={t("Reset Code")}
            {...register("code")}
            fullWidth
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label={t("New Password")}
            type="password"
            {...register("newPassword")}
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {t("Reset Password")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
