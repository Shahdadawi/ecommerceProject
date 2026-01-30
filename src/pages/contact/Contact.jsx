import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Stack,
    IconButton,
    Card,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Contact() {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            icon: "success",
            title: t("Message Sent"),
            text: t("Thanks! We received your message."),
            confirmButtonText: t("OK"),
        });

        e.currentTarget.reset();
    };

    const contactInfo = [
        {
            icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
            title: t("Address"),
            value: t("Ramallah, Palestine"),
        },
        {
            icon: <EmailIcon sx={{ fontSize: 28 }} />,
            title: t("Email"),
            value: "support@kashop.com",
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 28 }} />,
            title: t("Phone"),
            value: "+970 59 000 0000",
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
            title: t("Working Hours"),
            value: t("Sat - Thu: 9:00 AM - 6:00 PM"),
        },
    ];

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: (theme) =>
                                theme.palette.mode === "light"
                                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                    : "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {t("Contact Us")}
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                        {t("Have a question or need help? Send us a message and we will get back to you.")}
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                    {contactInfo.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "background.paper",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: 6,
                                        borderColor: "primary.main",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        bgcolor: "action.hover",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mx: "auto",
                                        mb: 2,
                                        color: "primary.main",
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                                    {item.title}
                                </Typography>
                                <Typography color="text.secondary" fontSize="0.9rem">
                                    {item.value}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10} lg={8}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center", mb: 4 }}>
                                {t("Send a Message")}
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label={t("Full Name")} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label={t("Email")} type="email" required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label={t("Subject")} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth multiline rows={6} label={t("Message")} required />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            endIcon={<SendIcon />}
                                            sx={{
                                                px: 5,
                                                py: 1.4,
                                                borderRadius: 2,
                                                fontWeight: 700,
                                                textTransform: "none",
                                            }}
                                        >
                                            {t("Send Message")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            textAlign: "center",
                            color: "primary.contrastText",
                            background: (theme) =>
                                theme.palette.mode === "light"
                                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                    : "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                            maxWidth: { xs: "100%", md: "85%", lg: "70%" },
                            width: "100%",
                        }}
                    >
                        <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
                            {t("Need Immediate Help?")}
                        </Typography>
                        <Typography sx={{ mb: 3, opacity: 0.95 }}>
                            {t("Our customer support team is available during working hours")}
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                startIcon={<PhoneIcon />}
                                sx={{
                                    bgcolor: "background.paper",
                                    color: "text.primary",
                                    fontWeight: 700,
                                    px: 4,
                                    "&:hover": { bgcolor: "background.paper" },
                                }}
                            >
                                +970 59 000 0000
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<EmailIcon />}
                                sx={{
                                    borderColor: "background.paper",
                                    color: "background.paper",
                                    fontWeight: 700,
                                    px: 4,
                                    "&:hover": {
                                        borderColor: "background.paper",
                                        bgcolor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                support@kashop.com
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}
