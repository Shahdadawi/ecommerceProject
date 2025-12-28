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
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function Cart() {
  return (
    <Box sx={{ backgroundColor: "#f5f7fb", py: 5, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1f2d5e" }}>
            Shopping Cart
          </Typography>
          <Typography sx={{ color: "#6b7280", mt: 0.5 }}>
            Review your items and proceed to checkout.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "grid",
                gridTemplateColumns: "36px 1.6fr 0.6fr 0.6fr 0.6fr 56px",
                gap: 2,
                alignItems: "center",
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
                color: "#475569",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              <Box />
              <Box>Product</Box>
              <Box>Unit Price</Box>
              <Box sx={{ textAlign: "center" }}>Quantity</Box>
              <Box sx={{ textAlign: "right" }}>Subtotal</Box>
              <Box sx={{ textAlign: "right" }}>Remove</Box>
            </Box>

            <Box sx={{ px: 3, py: 6, textAlign: "center" }}>
              <Typography sx={{ fontWeight: 700, color: "#1f2d5e", mb: 1 }}>
                Your cart is empty
              </Typography>
              <Typography sx={{ color: "#6b7280", mb: 3 }}>
                Add items to your cart and they’ll appear here.
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
                Continue shopping
              </Button>
            </Box>

            <Divider />
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderColor: "#cbd5e1",
                  color: "#1f2d5e",
                  fontWeight: 700,
                  "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" },
                }}
              >
                Continue shopping
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
                Update cart
              </Button>
            </Box>

            <Box
              sx={{
                p: 3,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                backgroundColor: "#fff",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  p: 2.5,
                }}
              >
                <Typography sx={{ fontWeight: 800, color: "#1f2d5e", mb: 0.5 }}>
                  Calculate Shipping
                </Typography>
                <Typography sx={{ color: "#6b7280", fontSize: 13, mb: 2 }}>
                  Flat rate: <b>5%</b>
                </Typography>

                <Stack spacing={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Country</InputLabel>
                    <Select label="Country" defaultValue="">
                      <MenuItem value="">Select country</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <TextField size="small" label="State / Country" fullWidth />
                    <TextField size="small" label="PostCode / ZIP" fullWidth />
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "flex-start",
                      backgroundColor: "#445b8f",
                      fontWeight: 700,
                      px: 3,
                      "&:hover": { backgroundColor: "#364a78" },
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  p: 2.5,
                }}
              >
                <Typography sx={{ fontWeight: 800, color: "#1f2d5e", mb: 0.5 }}>
                  Apply Coupon
                </Typography>
                <Typography sx={{ color: "#6b7280", fontSize: 13, mb: 2 }}>
                  Using a promo code?
                </Typography>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <TextField size="small" label="Enter your coupon" fullWidth />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#445b8f",
                      fontWeight: 800,
                      px: 3,
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#364a78" },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              position: { md: "sticky" },
              top: { md: 90 },
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 2.5, borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
              <Typography sx={{ fontWeight: 900, color: "#1f2d5e" }}>
                Cart Totals
              </Typography>
            </Box>

            <Box sx={{ p: 2.5 }}>
              <Stack spacing={1.5}>
                <Row label="Subtotal" value="—" />
                <Row label="Shipping" value="—" />
                <Row label="Estimate for" value="—" />
                <Divider sx={{ my: 1 }} />
                <Row label="Total" value="—" bold />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#445b8f",
                  fontWeight: 900,
                  py: 1.4,
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#364a78" },
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography sx={{ mt: 2, color: "#94a3b8", fontSize: 12, textAlign: "center" }}>
                Taxes and shipping calculated at checkout.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

function Row({ label, value, bold }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{ color: "#475569", fontSize: 14, fontWeight: bold ? 800 : 600 }}>
        {label}
      </Typography>
      <Typography sx={{ color: "#1f2d5e", fontSize: 14, fontWeight: bold ? 900 : 800 }}>
        {value}
      </Typography>
    </Box>
  );
}
