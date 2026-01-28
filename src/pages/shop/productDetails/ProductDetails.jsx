import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../../hooks/useProductDetails";
import { useState } from "react";
import useAddToCart from "../../../hooks/useAddToCart";
import { useTranslation } from "react-i18next";

function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetails(id);

  const [qty, setQty] = useState(1);

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (!product) return null;

  const inStock = product.quantity > 0;

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              p: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%", maxHeight: 420 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Name */}
          <Typography variant="h5" fontWeight={700} mb={1}>
            {product.name}
          </Typography>

          {/* Rating */}
          <Typography fontSize="0.95rem" color="text.secondary" mb={1}>
            {renderStars(product.rate)} ({product.rate})
          </Typography>

          {/* Price */}
          <Typography
            fontSize="1.8rem"
            fontWeight={700}
            color="#1f3a8a"
            mb={2}
          >
            ${product.price}
          </Typography>

          <Typography
            fontSize="0.9rem"
            color={inStock ? "green" : "error"}
            mb={2}
          >
            {inStock ? `In Stock (${product.quantity})` : "Out of stock"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography color="text.secondary" mb={3}>
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography fontWeight={600}>{t("Quantity")}:</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="outlined"
                disabled={qty === 1}
                onClick={() => setQty(qty - 1)}
              >
                −
              </Button>

              <Typography fontWeight={600}>{qty}</Typography>

              <Button
                variant="outlined"
                disabled={qty === product.quantity}
                onClick={() => setQty(qty + 1)}
              >
                +
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              disabled={!inStock || isAddingToCart}
              sx={{
                px: 4,
                backgroundColor: "#445b8f",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#364a78" },
              }}
              onClick={() => addToCart({ ProductId: product.id, Count: 1 })}
            >
              {t("Add to Cart")}
            </Button>

            <Button
              variant="outlined"
              disabled={!inStock}
              sx={{ px: 4, fontWeight: 600 }}
            >
              {t("Buy now")}
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography fontSize="0.85rem">{t("Add to wishlist")}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetails;
