import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Product({ product }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-6px)",
        },
      }}
    >
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

      <CardContent>
        <Typography fontWeight={600} mb={0.5}>
          {product.name}
        </Typography>

        <Typography fontWeight={700} color="secondary.main" mb={2}>
          ${product.price}
        </Typography>

        
      </CardContent>
    </Card>
  );
}

export default Product;
