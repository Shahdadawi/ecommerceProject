import React, { useState } from "react";
import {
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import Product from "../../../components/product/Product";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";


function Products() {
  const { t } = useTranslation();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      search: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      ascending: true,
    },
  });

  const [activeFilters, setActiveFilters] = useState({});
  const { data: productsData, isLoading: productsLoading } = useProducts(activeFilters);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const products = productsData?.data ?? [];
  const categories = categoriesData ?? [];

  const watchedValues = watch();
  const hasFilters = Object.values(watchedValues).some(
    (value) => value !== "" && value !== true
  );

  const applyFilters = (values) => {
    const filters = {
      search: values.search || null,
      categoryId: values.categoryId || null,
      minPrice: values.minPrice || null,
      maxPrice: values.maxPrice || null,
      sortBy: values.sortBy || null,
      ascending: values.sortBy ? values.ascending : null,
    };

    Object.keys(filters).forEach(
      (key) => filters[key] === null && delete filters[key]
    );

    setActiveFilters(filters);
  };

  const clearFilters = () => {
    reset();
    setActiveFilters({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter((v) => v !== null && v !== true)
      .length;
  };

  if (productsLoading && Object.keys(activeFilters).length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: "1px solid #e5e7eb",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterListIcon sx={{ color: "#6b7280" }} />
            <Typography variant="h6" fontWeight={600}>
              {t("Filters")}
            </Typography>
            {getActiveFiltersCount() > 0 && (
              <Chip
                label={getActiveFiltersCount()}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>

          {hasFilters && (
            <Button
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              size="small"
              sx={{ color: "#6b7280" }}
            >
              {t("Clear All")}
            </Button>
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(applyFilters)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t("Search")}
                placeholder={t("Search products by name...")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6b7280" }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>{t("Category")}</InputLabel>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t("Category")}>
                      <MenuItem value="">
                        <em>{t("All Categories")}</em>
                      </MenuItem>
                      {categoriesLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : (
                        categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Controller
                name="minPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label={t("Min Price")}
                    placeholder="0"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Controller
                name="maxPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label={t("Max Price")}
                    placeholder="1000"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>{t("Sort By")}</InputLabel>
                <Controller
                  name="sortBy"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label={t("Sort By")}>
                      <MenuItem value="">
                        <em>{t("None")}</em>
                      </MenuItem>
                      <MenuItem value="price">{t("Price")}</MenuItem>
                      <MenuItem value="name">{t("Name")}</MenuItem>
                      <MenuItem value="rate">{t("Rating")}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth disabled={!watchedValues.sortBy}>
                <InputLabel>{t("Order")}</InputLabel>
                <Controller
                  name="ascending"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label={t("Order")}
                      value={field.value ? "asc" : "desc"}
                      onChange={(e) => field.onChange(e.target.value === "asc")}
                    >
                      <MenuItem value="asc">{t("Ascending")}</MenuItem>
                      <MenuItem value="desc">{t("Descending")}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={productsLoading}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {productsLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("Apply Filters")
              )}
            </Button>
          </Box>
        </Box>
      </Paper>

      {getActiveFiltersCount() > 0 && (
        <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mr: 1, lineHeight: "32px" }}
          >
            {t("Active Filters")}:
          </Typography>
          {activeFilters.search && (
            <Chip
              label={`${t("Search")}: ${activeFilters.search}`}
              onDelete={() => {
                reset({ ...watchedValues, search: "" });
                const { search, ...rest } = activeFilters;
                setActiveFilters(rest);
              }}
              size="small"
            />
          )}
          {activeFilters.categoryId && (
            <Chip
              label={`${t("Category")}: ${categories.find((c) => c.id === activeFilters.categoryId)?.name
                }`}
              onDelete={() => {
                reset({ ...watchedValues, categoryId: "" });
                const { categoryId, ...rest } = activeFilters;
                setActiveFilters(rest);
              }}
              size="small"
            />
          )}
          {activeFilters.minPrice && (
            <Chip
              label={`${t("Min")}: $${activeFilters.minPrice}`}
              onDelete={() => {
                reset({ ...watchedValues, minPrice: "" });
                const { minPrice, ...rest } = activeFilters;
                setActiveFilters(rest);
              }}
              size="small"
            />
          )}
          {activeFilters.maxPrice && (
            <Chip
              label={`${t("Max")}: $${activeFilters.maxPrice}`}
              onDelete={() => {
                reset({ ...watchedValues, maxPrice: "" });
                const { maxPrice, ...rest } = activeFilters;
                setActiveFilters(rest);
              }}
              size="small"
            />
          )}
          {activeFilters.sortBy && (
            <Chip
              label={`${t("Sort")}: ${t(activeFilters.sortBy)} (${activeFilters.ascending ? t("Asc") : t("Desc")
                })`}
              onDelete={() => {
                reset({ ...watchedValues, sortBy: "", ascending: true });
                const { sortBy, ascending, ...rest } = activeFilters;
                setActiveFilters(rest);
              }}
              size="small"
            />
          )}
        </Box>
      )}

      {productsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h6" color="#6b7280" gutterBottom>
            {t("No products found")}
          </Typography>
          <Typography variant="body2" color="#9ca3af">
            {t("Try adjusting your filters")}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="#6b7280" sx={{ mb: 2 }}>
            {t("Showing")} {products.length} {t("products")}
          </Typography>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Box sx={{ maxWidth: 360, mx: "auto" }}>
                  <Product product={product} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

        </>
      )}
    </Box>
  );
}

export default Products;