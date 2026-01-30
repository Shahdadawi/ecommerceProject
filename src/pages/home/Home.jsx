import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Categories from "../../components/categories/Categories";
import ProductsSection from "../../components/products/ProductsSection";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { t } = useTranslation();

  return (
    <Box sx={{ pb: 6 }}>
      
      {/* 🔹 Page Title */}
      <Box sx={{ px: { xs: 2, md: 6 }, pt: 6, pb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Welcome to our store")}
        </Typography>

        <Typography color="text.secondary" maxWidth={600}>
          {t(
            "Browse products by category or explore all available items in our store."
          )}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ mt: 6 }}>
        <Categories
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </Box>

      <Divider sx={{ my: 6 }} />

      <ProductsSection categoryId={selectedCategoryId} />
    </Box>
  );
}
