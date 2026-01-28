import React from "react";


import {
    Box,
    Card,
    Grid,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { useTranslation } from "react-i18next";

export default function Categories() {
     const { t, i18n } = useTranslation();
    const { isLoading, isError, data } = useCategories();
    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography>Error loading categories</Typography>;
   

    return (
        <Box sx={{ px: 6, py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {t("Featured Categories")}
            </Typography>

            <Typography sx={{ color: "#6b7280", mb: 4 }}>
                {t("Choose your necessary products from this feature categories.")}
            </Typography>

            <Grid container spacing={3}>
                {data.map((category) => (
                    <Grid xs={12} sm={6} md={4} lg={2.4} key={category.id}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                border: "1px solid #e5e7eb",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "0.3s",
                                py: 3,
                                "&:hover": {
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        color: "#1f3a8a",
                                    }}
                                >
                                    {category.name}
                                </Typography>


                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
