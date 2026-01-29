import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Products() {
  const { t } = useTranslation();

  const { data, isLoading: loadingProducts } = useProducts();
  const products = data?.data ?? [];
  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const navigate = useNavigate();

  if (loadingProducts || loadingCategories)
    return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box sx={{ px: 4, py: 4 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography color="text.secondary">
          {t("Showing")} {products.length} {t("results")}
        </Typography>

        <Select size="small" defaultValue="latest">
          <MenuItem value="latest">Sort by latest</MenuItem>
          <MenuItem value="price">Sort by price</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        {/* FILTER SIDEBAR */}
        <Box
          sx={{
            width: 260,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            height: "fit-content",
          }}
        >
          <Typography fontWeight={700} mb={2}>
            {t("Product Categories")}
          </Typography>

          {categories.map((cat) => (
            <Typography
              key={cat.id}
              sx={{
                fontSize: "0.9rem",
                color: "text.secondary",
                cursor: "pointer",
                mb: 1,
                "&:hover": { color: "primary.main" },
              }}
            >
              {cat.name}
            </Typography>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography fontWeight={700} mb={1}>
            {t("Price")}
          </Typography>

          {["$0 - $50", "$50 - $100", "$100 - $300"].map((p) => (
            <FormControlLabel
              key={p}
              control={<Checkbox size="small" />}
              label={p}
            />
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography fontWeight={700} mb={1}>
            {t("Colors")}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#000"].map(
              (c) => (
                <Box
                  key={c}
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: c,
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "pointer",
                  }}
                />
              )
            )}
          </Box>
        </Box>

        {/* PRODUCTS GRID */}
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  onClick={() => navigate(`/products/${product.id}`)}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        bgcolor: "secondary.main",
                        color: "secondary.contrastText",
                        fontSize: "0.75rem",
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      {t("New")}
                    </Typography>

                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        height: 180,
                        objectFit: "contain",
                        p: 2,
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography fontWeight={600} color="text.primary" mb={0.5}>
                      {product.name}
                    </Typography>

                    <Typography fontSize="0.85rem" color="text.secondary" mb={1}>
                      ⭐⭐⭐⭐☆ (0)
                    </Typography>

                    <Typography
                      fontWeight={700}
                      color="secondary.main"
                      mb={2}
                    >
                      ${product.price}
                    </Typography>

                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("Add to Cart")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Products;
