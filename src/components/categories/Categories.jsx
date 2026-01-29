import React from "react";
import {
  Box,
  Card,
  Grid,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { useTranslation } from "react-i18next";

export default function Categories() {
  const { t } = useTranslation();
  const { isLoading, isError, data } = useCategories();

  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (isError) return <Typography>Error loading categories</Typography>;

  return (
    <Box sx={{ px: 6, py: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        {t("Featured Categories")}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {t("Choose your necessary products from this feature categories.")}
      </Typography>

      <Grid container spacing={3}>
        {data.map((category) => (
          <Grid xs={12} sm={6} md={4} lg={2.4} key={category.id}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                cursor: "pointer",
                py: 3,
                transition: "all 0.3s ease",
                backgroundColor: "background.paper",
                "&:hover": {
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 25px rgba(0,0,0,0.6)"
                      : "0 8px 25px rgba(0,0,0,0.08)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Typography
                  fontWeight={600}
                  fontSize="1rem"
                  color="text.primary"
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
