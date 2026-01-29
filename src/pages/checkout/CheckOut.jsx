import React, { useState } from "react";
import useCart from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useCheckOut from "../../hooks/useCheckOut";

function CheckOut() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCart();

  const cartItems = data?.items || [];
  const isEmpty = cartItems.length === 0;

  const { mutate: checkout, isPending: isCheckOut } = useCheckOut();
  const [PaymentMethod, setPaymentMethod] = useState("");

  const handlePlaceOrder = () => {
    if (!PaymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Payment method required",
        text: "Please select a payment method to continue.",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, place order",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        checkout(
          { PaymentMethod },
          {
            onSuccess: () => {
              if (PaymentMethod === "Cash") {
                Swal.fire({
                  icon: "success",
                  title: "Order placed successfully",
                  text: "Your payment has been completed successfully.",
                  confirmButtonText: "OK",
                });
              } else {
                Swal.fire({
                  icon: "info",
                  title: "Redirecting to payment",
                  text: "You will be redirected to complete your payment securely.",
                  timer: 2000,
                  showConfirmButton: false,
                });
              }
            },
            onError: () => {
              Swal.fire({
                icon: "error",
                title: "Payment failed",
                text: "Something went wrong. Please try again.",
              });
            },
          }
        );
      }
    });
  };

  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (isError) return <Typography>Error loading checkout</Typography>;

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        py: 5,
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800}>
          {t("Your Order")}
        </Typography>
        <Typography color="text.secondary" mb={3}>
          {t("Review your order before payment")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
            gap: 3,
          }}
        >
          {/* ===== ORDER ITEMS ===== */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "action.hover" }}>
                  <TableRow>
                    <TableCell fontWeight={700}>{t("Product")}</TableCell>
                    <TableCell align="center" fontWeight={700}>
                      {t("Quantity")}
                    </TableCell>
                    <TableCell align="right" fontWeight={700}>
                      {t("Unit Price")}
                    </TableCell>
                    <TableCell align="right" fontWeight={700}>
                      {t("Total")}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell align="center">x{item.count}</TableCell>
                      <TableCell align="right">
                        ${item.price?.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${item.totalPrice?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/cart")}
            >
              {t("Return To Cart")}
            </Button>
          </Paper>

          {/* ===== PAYMENT SUMMARY ===== */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Typography fontWeight={800} mb={1.5}>
              {t("Payment Method")}
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="payment-method-label">
                {t("Select Payment Method")}
              </InputLabel>
              <Select
                labelId="payment-method-label"
                value={PaymentMethod}
                label={t("Select Payment Method")}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="Cash">
                  {t("Cash on Delivery")}
                </MenuItem>
                <MenuItem value="Visa">
                  {t("Credit Card")}
                </MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1}>
              <Row label={t("Subtotal")} value={`$${data.cartTotal}`} />
              <Row label={t("Shipping")} value="—" />
              <Row label={t("Total")} value={`$${data.cartTotal}`} bold />
            </Stack>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={isEmpty || !PaymentMethod || isCheckOut}
              onClick={handlePlaceOrder}
            >
              {isCheckOut ? t("Processing...") : t("Place Order")}
            </Button>
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

export default CheckOut;
