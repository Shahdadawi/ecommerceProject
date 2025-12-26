import * as yup from "yup";

export const ResetPasswordSchema = yup.object({
  code: yup.string().required("Reset code is required"),

  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one UPPERCASE LETTER")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "must contain at least one number")
    .matches(/[@#$&*?!]/, "must contain at least one special character"),
});
