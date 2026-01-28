import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



export default function Cart() {
    const { t, i18n } = useTranslation();
  
  const { data, isError, isLoading } = useCart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateItem, isPending: IsUpdatingItem } = useUpdateCartItem();
  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (isError) return <Typography>{t("Error loading Cart Items")}</Typography>;

  const handleUpdate = (productId, action) => {
    const item = data.items.find(i => i.productId === productId);
    if (!item) return;

    if (action === "-") {
      if (item.count === 1) {
        Swal.fire({
          title: "Remove item?",
          text: "This item quantity is 1. Do you want to remove it from the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove it",
          cancelButtonText: "No, keep it",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            removeItem(productId);
          }
        });

        return;
      }

      updateItem({
        productId,
        count: item.count - 1,
      });
    }

    if (action === "+") {
      updateItem({
        productId,
        count: item.count + 1,
      });
    }
  };

  const cartItems = data?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", py: 5, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1f2d5e" }}>
            {t("Shopping Cart")}
          </Typography>
          <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
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
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
            }}
          >
            {isEmpty ? (
              <Box sx={{ px: 3, py: 6, textAlign: "center" }}>
                <Typography sx={{ fontWeight: 700, color: "#1f2d5e", mb: 1 }}>
                  {t("Your cart is empty")}
                </Typography>
                <Typography sx={{ color: "#6b7280", mb: 3 }}>
                  {t("Add items to your cart and they'll appear here.")}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    backgroundColor: "#445b8f",
                    fontWeight: 700,
                    px: 3,
                    "&:hover": { backgroundColor: "#364a78" },
                  }}
                >
                  {t("Continue shopping")}
                </Button>
              </Box>
            ) : (
              <>
                {/* ===== CART TABLE ===== */}
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>{t("Product")}</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          {t("Quantity")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                         {t("Unit Price")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          {t("Total")}
                        </TableCell>
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <Typography sx={{ fontWeight: 600, color: "#1f2d5e" }}>
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
                                onClick={() => handleUpdate(item.productId, "-")}
                                sx={{
                                  border: "1px solid #cbd5e1",
                                  borderRadius: 1,
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  minWidth: 30,
                                  textAlign: "center",
                                }}
                              >
                                {item.count}
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() => handleUpdate(item.productId, "+")}
                                sx={{
                                  border: "1px solid #cbd5e1",
                                  borderRadius: 1,
                                  width: 32,
                                  height: 32,
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
                            <IconButton size="small" sx={{ color: "#ef4444" }} onClick={() => removeItem(item.productId)} disabled={isPending}>
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
                    sx={{
                      borderColor: "#cbd5e1",
                      color: "#1f2d5e",
                      fontWeight: 700,
                    }}
                  >
                    {t("Continue shopping")}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<AutorenewIcon />}
                    sx={{
                      backgroundColor: "#445b8f",
                      fontWeight: 700,
                      "&:hover": { backgroundColor: "#364a78" },
                    }}
                  >
                    {t("Update cart")}
                  </Button>
                </Box>
              </>
            )}
          </Paper>

          {/* ===== CART TOTALS (زي ما هو) ===== */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              position: { md: "sticky" },
              top: { md: 90 },
            }}
          >
            <Box sx={{ p: 2.5, borderBottom: "1px solid #e5e7eb" }}>
              <Typography sx={{ fontWeight: 900, color: "#1f2d5e" }}>
                {t("Cart Totals")}
              </Typography>
            </Box>

            <Box sx={{ p: 2.5 }}>
              <Stack spacing={1.5}>
                <Row label={t("Subtotal")} value={`$${data?.cartTotal ?? 0}`} />
                <Row label={t("Shipping")} value="—" />
                <Divider />
                <Row label={t("Total")} value={`$${data?.cartTotal ?? 0}`} bold />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                disabled={isEmpty}
                sx={{
                  mt: 3,
                  backgroundColor: "#445b8f",
                  fontWeight: 900,
                  py: 1.4,
                  "&:hover": { backgroundColor: "#364a78" },
                }}
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
      <Typography sx={{ fontWeight: bold ? 800 : 600 }}>{label}</Typography>
      <Typography sx={{ fontWeight: bold ? 900 : 700 }}>{value}</Typography>
    </Box>
  );
}
