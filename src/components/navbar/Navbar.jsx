import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import useAuthStore from "../../store/authStore";
import useThemeStore from "../../store/useThemeStore";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { token, logout, user } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
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

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const changeLanguage = () =>
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");

  const drawerContent = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography fontWeight={700} color="primary.main">
          Kashop
        </Typography>
        <IconButton onClick={toggleMobileDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1, py: 2 }}>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={page.path}
              onClick={toggleMobileDrawer}
              sx={{
                borderRadius: 2,
                "&.active": {
                  bgcolor: "action.selected",
                  color: "primary.main",
                  fontWeight: 600,
                },
              }}
            >
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {token && (
        <List>
          <ListItemButton onClick={() => navigate("/profile")}>
            <AccountCircleIcon sx={{ mr: 2 }} />
            {t("Profile")}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              logout();
              navigate("/login");
            }}
            sx={{ color: "error.main" }}
          >
            <LogoutIcon sx={{ mr: 2 }} />
            {t("Logout")}
          </ListItemButton>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              onClick={toggleMobileDrawer}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component={RouterLink}
              to="/"
              sx={{
                ml: 1,
                fontWeight: 700,
                fontSize: "1.6rem",
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              Kashop
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={NavLink}
                  to={page.path}
                  sx={{
                    textTransform: "none",
                    "&.active": {
                      bgcolor: "action.selected",
                      color: "primary.main",
                    },
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton onClick={() => navigate("/wishlist")}>
                <FavoriteIcon />
              </IconButton>

              <IconButton component={RouterLink} to="/cart">
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={changeLanguage}>
                <LanguageIcon />
              </IconButton>

              <IconButton onClick={toggleTheme}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              {!token ? (
                <IconButton component={RouterLink} to="/login">
                  <PersonIcon />
                </IconButton>
              ) : (
                <>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    endIcon={<ExpandMoreIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
                      {user?.name?.[0] || "U"}
                    </Avatar>
                    {user?.name}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => navigate("/profile")}>
                      {t("Profile")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      sx={{ color: "error.main" }}
                    >
                      {t("Logout")}
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
