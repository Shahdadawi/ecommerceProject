import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Chip,
  TextField,
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
import useAddReview from "../../../hooks/useAddReview";

function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetails(id);
  const { mutate: addReview, isPending } = useAddReview();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


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
        <CircularProgress />
      </Box>
    );

  if (!product) return null;

  const inStock = product.quantity > 0;

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    return [...Array(5)].map((_, i) =>
      i < fullStars ? (
        <StarIcon key={i} color="warning" fontSize="small" />
      ) : (
        <StarBorderIcon key={i} color="disabled" fontSize="small" />
      )
    );
  };

  const allImages = [
    product.image,
    ...(product.subImages || []),
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();


  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      <Grid container spacing={6}>
        {/* IMAGE */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 4,
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={{ maxWidth: "100%", maxHeight: 420 }}
            />
          </Box>

          {allImages.length > 1 && (
            <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
              {allImages.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      selectedImage === img ? "primary.main" : "divider",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* DETAILS */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            {renderStars(product.rate)}
            <Typography color="text.secondary">
              ({product.reviews.length} {t("Reviews")})
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" fontWeight={700} mb={2}>
            ${product.price}
          </Typography>

          <Chip
            label={
              inStock
                ? `${t("In Stock")} (${product.quantity})`
                : t("Out of stock")
            }
            color={inStock ? "success" : "error"}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />

          <Typography
            color="text.secondary"
            sx={{
              bgcolor: "background.default",
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {product.description || t("No description available")}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              disabled={!inStock || isAddingToCart}
              onClick={() =>
                addToCart({ ProductId: product.id, Count: 1 })
              }
            >
              {t("Add to Cart")}
            </Button>

            <Button
              variant="outlined"
              startIcon={inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              color={inWishlist ? "error" : "inherit"}
              onClick={() => {
                if (inWishlist) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product);
                }
                setInWishlist(!inWishlist);
              }}
            >
              {inWishlist ? t("Remove from wishlist") : t("Add to wishlist")}
            </Button>
          </Box>
        </Grid>
      </Grid>


      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {t("Add a review")}
        </Typography>

        {/* ⭐ Stars */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton key={star} onClick={() => setRating(star)}>
              {star <= rating ? (
                <StarIcon color="warning" />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          ))}
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={t("Write your review here")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          disabled={isPending}
          onClick={() =>
            addReview(
              {
                ProductId: product.id,
                Rating: rating,
                Comment: comment,
              },
              {
                onError: (error) => {
                  // 👇 هون السحر
                  Swal.fire({
                    icon: "error",
                    title: t("Not allowed"),
                    text:
                      error.response?.data?.message ||
                      t("You can only review products you have purchased."),
                  });
                },
              }
            )
          }
        >
          {t("Submit review")}
        </Button>


        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            {t("Customer Reviews")}
          </Typography>

          {product.reviews.length === 0 ? (
            <Typography color="text.secondary">
              {t("No reviews yet")}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {product.reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography fontWeight={700}>
                      {review.userName}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {formatDate(review.createdAt)}
                    </Typography>
                  </Box>

                  {/* Stars */}
                  <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= review.rating ? (
                        <StarIcon
                          key={star}
                          fontSize="small"
                          color="warning"
                        />
                      ) : (
                        <StarBorderIcon
                          key={star}
                          fontSize="small"
                          color="disabled"
                        />
                      )
                    )}
                  </Box>

                  {/* Comment */}
                  <Typography color="text.secondary">
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

      </Box>

    </Box>
  );
}

export default ProductDetails;
