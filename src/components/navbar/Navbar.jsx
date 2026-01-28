import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LanguageIcon from "@mui/icons-material/Language";
import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";



export default function Navbar() {
  const [category, setCategory] = React.useState("");

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const { t, i18n } = useTranslation();

  const pages = [
    { label: t("Home"), path: "/" },
    { label: t("Shop"), path: "/shop" },
    { label: t("Blog"), path: "/blog" },
    { label: t("Contact Us"), path: "/contact" },
  ];


  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = () => {
    const newLang = i18n.language == 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  }


  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#1f2d5e",
        boxShadow: "none",
        borderBottom: "1px solid #eee",
        py: 1,
        zIndex: 1300,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 4 }}>

          {/* LOGO */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#1f2d5e",
              textDecoration: "none",
            }}
          >
            Kashop
          </Typography>

          {/* SEARCH */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              width: "35%",
              gap: 2,
            }}
          >


            <InputBase
              placeholder="Search for items"
              sx={{ flex: 1, fontSize: "0.9rem" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* NAV LINKS */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={NavLink}
                to={page.path}
                sx={{
                  textTransform: "none",
                  fontSize: "0.95rem",
                  color: "#1f2d5e",
                  px: 2,
                  "&.active": {
                    backgroundColor: "#f1f5ff",
                    color: "#445b8f",
                    fontWeight: 600,
                    borderRadius: "8px",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* ICONS + AUTH LOGIC */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

            {/* USER */}
            {!token ? (
              <IconButton component={RouterLink} to="/login">
                <PersonIcon />
              </IconButton>
            ) : (
              <Box>
                <Button
                  onClick={handleMenuOpen}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    textTransform: "none",
                    color: "#1f2d5e",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    px: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      mr: 1,
                      bgcolor: "#f1f5ff",
                      color: "#1f2d5e",
                      fontSize: "0.9rem",
                    }}
                  >
                    {user?.name?.[0] || "U"}
                  </Avatar>
                  {user?.name || "User"}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: "10px",
                      mt: 1,
                      minWidth: 150,
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/profile"); }}>
                    {t("Profile")}
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    {t("Logout")}
                  </MenuItem>
                </Menu>
              </Box>

            )}

            <IconButton>
              <FavoriteIcon />
            </IconButton>

            <IconButton component={RouterLink} to="/cart">
              <ShoppingCartIcon />
            </IconButton>

            <IconButton onClick={changeLanguage}>
              <LanguageIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
