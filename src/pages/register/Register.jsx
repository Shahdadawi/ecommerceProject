import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {RegisterSchema} from '../../validations/RegisterSchema'


export default function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: 'onBlur'

  });

  const registerForm = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Register",
        values
      );

      console.log(response);

    } catch (e) {
      console.log(e.response?.data);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fb" }}>
      <Box sx={{ width: "100%", maxWidth: 450, backgroundColor: "#fff", p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.05)", margin: 5 }}>

        <Typography variant="h4" fontWeight={700} mb={1}>
          Create an account
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Access to all features.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(registerForm)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

          <TextField label="User Name" {...register("userName")} fullWidth
            error={errors.userName} helperText={errors.userName?.message}
          />

          <TextField label="Full Name" {...register("fullName")} fullWidth
            error={errors.fullName} helperText={errors.fullName?.message}

          />

          <TextField label="Phone Number" {...register("phoneNumber")} fullWidth
            error={errors.phoneNumber} helperText={errors.phoneNumber?.message}
          />

          <TextField label="Email" {...register("email")} fullWidth
            error={errors.email} helperText={errors.email?.message}
          />

          <TextField label="Password" type="password" {...register("password")} fullWidth
            error={errors.password} helperText={errors.password?.message}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} />

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, backgroundColor: "#445b8f", fontWeight: 600, "&:hover": { backgroundColor: "#364a78" } }}
          >
            Sign Up
          </Button>

        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          Already have an account?{" "}
          <Typography component={Link} to="/login" sx={{ color: "#6c7ae0", cursor: "pointer" }}>
            Sign In
          </Typography>
        </Typography>

      </Box>
    </Box>
  );

}
