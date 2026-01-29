import React from "react";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ProfileOrders() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useProfile();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography color="error.main">
          {t("Error loading orders")}
        </Typography>
      </Box>
    );
  }

  const orders = data?.orders || [];

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          {t("No orders yet")}
        </Typography>
        <Typography color="text.secondary">
          {t("You haven't placed any orders yet.")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Title */}
      <Typography variant="h5" fontWeight={800} mb={1}>
        {t("My Orders")}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {t("Here is a list of all your orders")}
      </Typography>

      {/* Orders Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 1px 3px rgba(0,0,0,0.05)"
              : "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.04)",
            }}
          >
            <TableRow>
              <TableCell fontWeight={700}>#</TableCell>
              <TableCell fontWeight={700}>{t("Date")}</TableCell>
              <TableCell fontWeight={700}>{t("Amount")}</TableCell>
              <TableCell fontWeight={700}>{t("Payment")}</TableCell>
              <TableCell fontWeight={700}>{t("Status")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell fontWeight={700}>
                  {order.id}
                </TableCell>

                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  ${order.amountPaid}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.paymentStatus || "unpaid"}
                    color={
                      order.paymentStatus === "paid"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                    variant={
                      theme.palette.mode === "light"
                        ? "filled"
                        : "outlined"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color="primary"
                    size="small"
                    variant={
                      theme.palette.mode === "light"
                        ? "outlined"
                        : "filled"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
