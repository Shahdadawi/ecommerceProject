import * as yup from 'yup'

export const RegisterSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid Email Format").required("Email is required"),
  userName: yup.string().matches(/^[a-zA-Z0-9._-]+$/, "Invalid User Name").min(4, "User Name must ne at least 4 characters").required("User Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required")
    .min(8, "password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one UPPERCASE LETTER")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "must contain at least one number")
    .matches(/[@#$&*?!]/, "must contain at least one special character")

})