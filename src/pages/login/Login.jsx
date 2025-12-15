import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm({});

  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/login",
        values
      );
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (e) {
      console.log(e.response?.data);
    }
  };

 return (
  <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fb" }}>
    <Box sx={{ width: "100%", maxWidth: 450, backgroundColor: "#fff", p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
      
      <Typography variant="h4" fontWeight={700} mb={1}>
        Member Login
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Welcome back!
      </Typography>

      <Box component="form" onSubmit={handleSubmit(loginForm)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        <TextField label="Email" {...register("email")} fullWidth />

        <TextField label="Password" type="password" {...register("password")} fullWidth />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Typography variant="body2" sx={{ color: "#6c7ae0", cursor: "pointer" }}>
            Forgot your password?
          </Typography>

        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ py: 1.5, backgroundColor: "#445b8f", fontWeight: 600, "&:hover": { backgroundColor: "#364a78" } }}
        >
          Sign In
        </Button>

      </Box>

      <Typography mt={3} textAlign="center" variant="body2">
        Have not an account?{" "}
        <Typography component={Link} to="/register" sx={{ color: "#6c7ae0", cursor: "pointer" }}>
          Sign up
        </Typography>
      </Typography>

    </Box>
  </Box>
);

}
