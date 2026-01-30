import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <StorefrontIcon sx={{ fontSize: 28 }} />,
      title: t("Wide Product Selection"),
      desc: t("Carefully selected products to meet your daily needs"),
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 28 }} />,
      title: t("Customer First"),
      desc: t("We always put customer satisfaction at the heart of what we do"),
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 28 }} />,
      title: t("Fast Delivery"),
      desc: t("Reliable and fast delivery to your doorstep"),
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28 }} />,
      title: t("Secure Shopping"),
      desc: t("Safe payments and trusted shopping experience"),
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
            {t("About Us")}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            {t(
              "We are an online store dedicated to providing high quality products with a smooth and enjoyable shopping experience."
            )}
          </Typography>
        </Box>

        <Grid container justifyContent="center" sx={{ mb: 6 }}>
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
              <Typography fontWeight={700} sx={{ mb: 2 }}>
                {t("Who We Are")}
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t(
                  "Kashop was created to make online shopping simple, reliable, and accessible for everyone. We focus on quality, transparency, and customer trust in every step of the journey."
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  textAlign: "center",
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

                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={700} sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" fontSize="0.9rem">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
              {t("Our Mission")}
            </Typography>
            <Typography sx={{ opacity: 0.95 }}>
              {t(
                "To build a trusted platform where customers can shop with confidence and ease."
              )}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
