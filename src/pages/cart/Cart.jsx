import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useClearCart from "../../hooks/useClearCart";

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useCart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: clearCart, isPending: clearingCart } = useClearCart();

  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (isError) return <Typography>{t("Error loading Cart Items")}</Typography>;




  const handleUpdate = (productId, action) => {
    const item = data.items.find((i) => i.productId === productId);
    if (!item) return;

    if (action === "-") {
      if (item.count === 1) {
        Swal.fire({
          title: t("Remove item?"),
          text: t("This item quantity is 1. Do you want to remove it from the cart?"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: t("Yes, remove it"),
          cancelButtonText: t("No, keep it"),
        }).then((result) => {
          if (result.isConfirmed) removeItem(productId);
        });

        return;
      }

      updateItem({ productId, count: item.count - 1 });
    }

    if (action === "+") {
      updateItem({ productId, count: item.count + 1 });
    }
  };



  const handleClearCart = () => {
    Swal.fire({
      title: t("Clear cart?"),
      text: t("This will remove all items from your cart."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, clear cart"),
      cancelButtonText: t("Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });

  };


  const cartItems = data?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        py: 5,
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>
            {t("Shopping Cart")}
          </Typography>
          <Typography color="text.secondary" mt={0.5}>
            {t("Review your items and proceed to checkout.")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
            gap: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            {isEmpty ? (
              <Box sx={{ px: 3, py: 6, textAlign: "center" }}>
                <Typography fontWeight={700} mb={1}>
                  {t("Your cart is empty")}
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  {t("Add items to your cart and they'll appear here")}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/shop")}
                >
                  {t("Continue shopping")}
                </Button>
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: "action.hover" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          {t("Product")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {t("Quantity")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          {t("Unit Price")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          {t("Total")}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <Typography fontWeight={600}>
                              {item.productName}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleUpdate(item.productId, "-")
                                }
                                sx={{
                                  border: "1px solid",
                                  borderColor: "divider",
                                  borderRadius: 1,
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography fontWeight={700}>
                                {item.count}
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleUpdate(item.productId, "+")
                                }
                                sx={{
                                  border: "1px solid",
                                  borderColor: "divider",
                                  borderRadius: 1,
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            ${item.price?.toFixed(2) ?? "0.00"}
                          </TableCell>

                          <TableCell align="right">
                            ${item.totalPrice?.toFixed(2) ?? "0.00"}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeItem(item.productId)}
                              disabled={isPending}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider />

                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/shop")}
                  >
                    {t("Continue shopping")}
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                    disabled={clearingCart || isEmpty}
                  >
                    {clearingCart ? <CircularProgress size={20} /> : t("Clear cart")}
                  </Button>
                </Box>
              </>
            )}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              position: { md: "sticky" },
              top: { md: 90 },
            }}
          >
            <Box
              sx={{
                p: 2.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography fontWeight={900}>
                {t("Cart Totals")}
              </Typography>
            </Box>

            <Box sx={{ p: 2.5 }}>
              <Stack spacing={1.5}>
                <Row label={t("Subtotal")} value={`$${data?.cartTotal ?? 0}`} />
                <Row label={t("Shipping")} value="—" />
                <Divider />
                <Row
                  label={t("Total")}
                  value={`$${data?.cartTotal ?? 0}`}
                  bold
                />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                disabled={isEmpty}
                sx={{ mt: 3 }}
                onClick={() => navigate("/checkout")}
              >
                {t("Proceed to Checkout")}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

function Row({ label, value, bold }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography fontWeight={bold ? 800 : 600}>{label}</Typography>
      <Typography fontWeight={bold ? 900 : 700}>{value}</Typography>
    </Box>
  );
}
