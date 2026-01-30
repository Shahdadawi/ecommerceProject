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

export default function Categories({ onSelectCategory, selectedCategoryId }) {
  const { t } = useTranslation();
  const { isLoading, isError, data } = useCategories();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading categories</Typography>;

  return (
    <Box sx={{ px: 6, py: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        {t("Featured Categories")}
      </Typography>

      <Typography color="#6b7280" mb={4}>
        {t("Choose your necessary products from this feature categories.")}
      </Typography>

      <Grid container spacing={3}>
        {data.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <Grid xs={12} sm={6} md={4} lg={2.4} key={category.id}>
              <Card
                onClick={() =>
                  onSelectCategory((prev) =>
                    prev === category.id ? null : category.id
                  )
                }
                sx={{
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  py: 3,
                  transition: "0.3s",

                  border: isActive
                    ? "2px solid"
                    : "1px solid #e5e7eb",

                  borderColor: isActive
                    ? "primary.main"
                    : "#e5e7eb",

                  backgroundColor: isActive
                    ? "rgba(37, 99, 235, 0.08)"
                    : "white",

                  boxShadow: isActive
                    ? "0 8px 25px rgba(37, 99, 235, 0.25)"
                    : "none",

                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    fontWeight={600}
                    color={isActive ? "primary.main" : "#1f3a8a"}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
