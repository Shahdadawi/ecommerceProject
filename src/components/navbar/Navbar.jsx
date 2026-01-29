import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const pages = [
    { label: t("Home"), path: "/" },
    { label: t("Shop"), path: "/shop" },
    { label: t("Blog"), path: "/blog" },
    { label: t("Contact Us"), path: "/contact" },
  ];

  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  // Mobile Drawer Content
  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: "#ffffff",
      }}
      role="presentation"
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#445b8f",
          }}
        >
          Kashop
        </Typography>
        <IconButton onClick={toggleMobileDrawer} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Info in Drawer */}
      {token && user && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Avatar
            sx={{
              width: 45,
              height: 45,
              bgcolor: "#445b8f",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {user?.name?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography fontWeight={600} sx={{ color: "#1e293b" }}>
              {user?.name || "User"}
            </Typography>
            <Typography fontSize="0.85rem" color="#64748b">
              {user?.email || ""}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Navigation Links */}
      <List sx={{ px: 1, py: 2 }}>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={page.path}
              onClick={toggleMobileDrawer}
              sx={{
                borderRadius: 2,
                py: 1.5,
                "&.active": {
                  backgroundColor: "#eef2ff",
                  color: "#445b8f",
                  fontWeight: 600,
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                },
                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              <ListItemText
                primary={page.label}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  color: "#475569",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* User Actions in Drawer */}
      {token ? (
        <List sx={{ px: 1 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                toggleMobileDrawer();
                navigate("/profile");
              }}
              sx={{
                borderRadius: 2,
                py: 1.5,
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <AccountCircleIcon sx={{ mr: 2, color: "#64748b" }} />
              <ListItemText
                primary={t("Profile")}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  color: "#475569",
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                toggleMobileDrawer();
                handleLogout();
              }}
              sx={{
                borderRadius: 2,
                py: 1.5,
                "&:hover": { backgroundColor: "#fef2f2" },
              }}
            >
              <LogoutIcon sx={{ mr: 2, color: "#ef4444" }} />
              <ListItemText
                primary={t("Logout")}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  color: "#ef4444",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <Box sx={{ px: 2, py: 2 }}>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/login"
            onClick={toggleMobileDrawer}
            sx={{
              backgroundColor: "#445b8f",
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#364a78",
              },
            }}
          >
            {t("Login")}
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          zIndex: 1300,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              gap: { xs: 1, md: 3 },
            }}
          >
            {/* Mobile Menu Button */}
            <IconButton
              onClick={toggleMobileDrawer}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#445b8f",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* LOGO */}
            <Typography
              component={RouterLink}
              to="/"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                fontWeight: 700,
                color: "#445b8f",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#364a78",
                },
              }}
            >
              Kashop
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={NavLink}
                  to={page.path}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.95rem",
                    color: "#475569",
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      color: "#445b8f",
                    },
                    "&.active": {
                      backgroundColor: "#eef2ff",
                      color: "#445b8f",
                      fontWeight: 600,
                    },
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 }, alignItems: "center" }}>
              {/* Desktop User Menu */}
              {!token ? (
                <IconButton
                  component={RouterLink}
                  to="/login"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    color: "#475569",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                      color: "#445b8f",
                    },
                  }}
                >
                  <PersonIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Button
                    onClick={handleUserMenuOpen}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#475569",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      px: 1.5,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 1,
                        bgcolor: "#445b8f",
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {user?.name?.[0] || "U"}
                    </Avatar>
                    {user?.name || "User"}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        mt: 1,
                        minWidth: 180,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/profile");
                      }}
                      sx={{
                        py: 1.5,
                        fontSize: "0.95rem",
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      <AccountCircleIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                      {t("Profile")}
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        handleLogout();
                      }}
                      sx={{
                        py: 1.5,
                        fontSize: "0.95rem",
                        color: "#ef4444",
                        "&:hover": {
                          backgroundColor: "#fef2f2",
                        },
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                      {t("Logout")}
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              {/* Wishlist Icon */}
              <IconButton
                onClick={() => navigate("/wishlist")}
                sx={{
                  color: "#475569",
                  "&:hover": {
                    backgroundColor: "#fef2f2",
                    color: "#ef4444",
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>

              {/* Cart Icon */}
              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{
                  color: "#475569",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    color: "#445b8f",
                  },
                }}
              >
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Language Toggle */}
              <IconButton
                onClick={changeLanguage}
                sx={{
                  color: "#475569",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    color: "#445b8f",
                  },
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}