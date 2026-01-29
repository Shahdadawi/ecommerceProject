import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../../hooks/useProductDetails";
import useAddToCart from "../../../hooks/useAddToCart";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "../../../utils/wishlist";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetails(id);
  const [inWishlist, setInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product?.id) {
      setInWishlist(isInWishlist(product.id));
      setSelectedImage(product.image);
    }
  }, [product]);

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#445b8f" }} />
      </Box>
    );
  if (!product) return null;

  const inStock = product.quantity > 0;

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      setInWishlist(false);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Removed from wishlist",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: { popup: "swal-toast-offset" },
      });
    } else {
      addToWishlist(product);
      setInWishlist(true);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to wishlist",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: { popup: "swal-toast-offset" },
      });
    }
  };

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <StarIcon
            key={i}
            sx={{ fontSize: "1.1rem", color: "#f59e0b" }}
          />
        ) : (
          <StarBorderIcon
            key={i}
            sx={{ fontSize: "1.1rem", color: "#d1d5db" }}
          />
        )
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const allImages = [
    product.image,
    ...(product.subImages && product.subImages.length > 0
      ? product.subImages
      : []),
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6, maxWidth: 1400, mx: "auto" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "2px solid #f3f4f6",
              borderRadius: 4,
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              minHeight: 450,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
          >
            <img
              src={selectedImage || product.image}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: 420,
                objectFit: "contain",
              }}
            />
          </Box>

          {allImages.length > 1 && (
            <Box
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {allImages.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 85,
                    height: 85,
                    border:
                      selectedImage === img
                        ? "3px solid #445b8f"
                        : "2px solid #e5e7eb",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: "#ffffff",
                    "&:hover": {
                      borderColor: "#445b8f",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight={700}
            mb={2}
            sx={{
              color: "#1e293b",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {renderStars(product.rate)}
            </Box>
            <Typography
              fontSize="0.95rem"
              fontWeight={600}
              sx={{ color: "#64748b" }}
            >
              {product.rate}
            </Typography>
            <Typography fontSize="0.9rem" color="#94a3b8">
              · {product.reviews.length} {t("Reviews")}
            </Typography>
          </Box>

          <Typography
            fontSize="2.5rem"
            fontWeight={700}
            mb={2}
            sx={{
              color: "#445b8f",
              letterSpacing: "-0.02em",
            }}
          >
            ${product.price}
          </Typography>

          <Chip
            label={
              inStock
                ? `${t("In Stock")} (${product.quantity})`
                : t("Out of stock")
            }
            sx={{
              mb: 3,
              px: 1,
              py: 2.5,
              fontWeight: 600,
              fontSize: "0.9rem",
              backgroundColor: inStock ? "#dcfce7" : "#fee2e2",
              color: inStock ? "#166534" : "#991b1b",
              border: `1.5px solid ${inStock ? "#86efac" : "#fca5a5"}`,
            }}
          />

          <Divider sx={{ my: 3.5, borderColor: "#e2e8f0" }} />

          {/* Description */}
          <Typography
            color="#475569"
            mb={4}
            lineHeight={1.8}
            fontSize="1rem"
            sx={{
              backgroundColor: "#f8fafc",
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            {product.description || t("No description available.")}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              disabled={!inStock || isAddingToCart}
              sx={{
                px: 5,
                py: 1.5,
                backgroundColor: "#445b8f",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 3,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(68, 91, 143, 0.2)",
                "&:hover": {
                  backgroundColor: "#364a78",
                  boxShadow: "0 6px 16px rgba(68, 91, 143, 0.3)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  backgroundColor: "#cbd5e1",
                },
                transition: "all 0.2s ease",
              }}
              onClick={() => addToCart({ ProductId: product.id, Count: 1 })}
            >
              {t("Add to Cart")}
            </Button>

            <Button
              variant="outlined"
              disabled={!inStock}
              startIcon={
                inWishlist ? (
                  <FavoriteIcon sx={{ color: "#ef4444" }} />
                ) : (
                  <FavoriteBorderIcon />
                )
              }
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 3,
                borderWidth: 2,
                borderColor: inWishlist ? "#ef4444" : "#cbd5e1",
                color: inWishlist ? "#ef4444" : "#64748b",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: inWishlist ? "#dc2626" : "#445b8f",
                  backgroundColor: inWishlist
                    ? "rgba(239, 68, 68, 0.05)"
                    : "rgba(68, 91, 143, 0.05)",
                  color: inWishlist ? "#dc2626" : "#445b8f",
                },
                "&:disabled": {
                  borderColor: "#e2e8f0",
                  color: "#cbd5e1",
                },
                transition: "all 0.2s ease",
              }}
              onClick={handleWishlist}
            >
              {inWishlist ? t("Remove from wishlist") : t("Add to wishlist")}
            </Button>
          </Box>

          {/* REVIEWS SECTION */}
          <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
            sx={{ color: "#1e293b" }}
          >
            {t("Customer Reviews")}
          </Typography>

          {product.reviews.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                backgroundColor: "#f8fafc",
                borderRadius: 3,
                border: "1px dashed #cbd5e1",
              }}
            >
              <Typography color="#94a3b8" fontSize="1rem">
                {t("No reviews yet.")}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {product.reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      borderColor: "#cbd5e1",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1.5,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography fontWeight={700} sx={{ color: "#1e293b" }}>
                      {review.userName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderStars(review.rating)}
                    </Box>
                  </Box>

                  <Typography
                    fontSize="0.8rem"
                    color="#94a3b8"
                    mb={1.5}
                    fontWeight={500}
                  >
                    {t("Reviewed on")} {formatDate(review.createdAt)}
                  </Typography>

                  <Typography
                    fontSize="0.95rem"
                    color="#475569"
                    lineHeight={1.7}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetails;