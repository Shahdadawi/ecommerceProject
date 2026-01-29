import React from "react";
import useProfile from "../../hooks/useProfile";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

export default function Profile() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useProfile();
  const theme = useTheme();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography color="error.main">
          {t("Error loading profile")}
        </Typography>
      </Box>
    );

  const menuItems = [
    {
      label: t("Profile Info"),
      path: "",
      icon: <PersonIcon />,
    },
    {
      label: t("My Orders"),
      path: "orders",
      icon: <ShoppingBagIcon />,
    },

  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "sticky",
          top: 64,
          zIndex: 100,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 3,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ p: 2, minWidth: "max-content" }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === ""}
              startIcon={item.icon}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                whiteSpace: "nowrap",
                color: "text.primary",
                px: 2,
                "&.active": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "& .MuiButton-startIcon": {
                    color: "#fff",
                  },
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Main Container */}
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "background.default",
          position: "relative",
        }}
      >

        {/* ===== SIDEBAR - Full Height ===== */}
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",

            position: "fixed",
            top: "64px",   // 👈 نفس ارتفاع الـ Navbar الحقيقي
            left: 0,

            height: "calc(100vh - 64px)",
            overflowY: "auto",
            zIndex: 1200,
          }}
        >

          {/* User Info Card */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              bgcolor:
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "rgba(68, 91, 143, 0.15)",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor:
                  theme.palette.mode === "light"
                    ? "primary.dark"
                    : "primary.main",
                fontSize: "2rem",
                fontWeight: 700,
                border: "4px solid",
                borderColor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {data?.fullName?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  color:
                    theme.palette.mode === "light" ? "#fff" : "text.primary",
                }}
              >
                {data?.fullName || "User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.9)"
                      : "text.secondary",
                  mt: 0.5,
                  wordBreak: "break-word",
                  px: 1,
                }}
              >
                {data?.email || ""}
              </Typography>
            </Box>
          </Box>

          {/* Navigation Menu */}
          <List sx={{ flex: 1, py: 2, px: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end={item.path === ""}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    transition: "all 0.2s ease",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "light"
                          ? "rgba(68, 91, 143, 0.08)"
                          : "rgba(68, 91, 143, 0.15)",
                    },
                    "&.active": {
                      bgcolor: "primary.main",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(68, 91, 143, 0.3)",
                      "& .MuiListItemIcon-root": {
                        color: "#fff",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>


        </Box>

        {/* ===== CONTENT AREA ===== */}
        <Box
          sx={{
            flex: 1,
            ml: { md: "280px" }, // 👈 نفس عرض السايد بار
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >

          <Box
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                p: { xs: 2, sm: 3, md: 4 },
                border: 1,
                borderColor: "divider",
                minHeight: 500,
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 1px 3px rgba(0,0,0,0.05)"
                    : "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}