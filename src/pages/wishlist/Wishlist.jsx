import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import Product from "../../components/product/Product";
import {
  getWishlist,
  removeFromWishlist,
} from "../../utils/wishlist";

export default function Wishlist() {
  const { t } = useTranslation();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    setWishlist(getWishlist());

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: t("Removed from wishlist"),
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: { popup: "swal-toast-offset" },
    });
  };

  if (wishlist.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <FavoriteBorderIcon
          sx={{ fontSize: 64, color: "text.disabled" }}
        />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          {t("Your wishlist is empty")}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          {t("Start adding products you love")} 🤍
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        {t("My Wishlist")}
      </Typography>

      <Grid container spacing={3}>
        {wishlist.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Product product={product}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ fontWeight: 600 }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemove(product.id);
                }}
              >
                {t("Remove")}
              </Button>
            </Product>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
