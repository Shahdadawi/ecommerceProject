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
import { useState } from "react";
import { ForgotPasswordSchema } from '../../validations/ForgotPasswordSchema'
import axiosInstance from "../../Api/axiosInnstance";


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);
    const [serverMessage, setServerMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        mode: "onBlur",
    });

    const forgotPasswordForm = async (values) => {
        setSuccessMessage("");
        setServerErrors([]);
        setServerMessage("");
        try {
            const response = await axiosInstance.post(



                "/Auth/Account/SendCode",
                values
            );

            if (response.status === 200) {
                console.log(response);
                localStorage.setItem("resetEmail", values.email);
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate("/resetCode");
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
                        sx={{
                            py: 1.5,
                            backgroundColor: "#445b8f",
                            fontWeight: 600,
                            "&:hover": { backgroundColor: "#364a78" },
                        }}
                    >
                        Send Reset Code
                    </Button>
                </Box>

                <Typography mt={3} textAlign="center" variant="body2">
                    Remember your password?{" "}
                    <Typography
                        component="span"
                        onClick={() => navigate("/login")}
                        sx={{ color: "#6c7ae0", cursor: "pointer" }}
                    >
                        Sign In
                    </Typography>
                </Typography>

            </Box>
        </Box>
    );
}
