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
import { NavLink, Link } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const pages = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

export default function Navbar() {

  const [category, setCategory] = React.useState("");

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
            component={Link}
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
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{ fontSize: "0.9rem", color: "#555" }}
            >
              <MenuItem value="">All categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </Select>

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

          {/* ICONS */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton component={Link} to="/login">
              <PersonIcon />
            </IconButton>

            <IconButton>
              <FavoriteIcon />
            </IconButton>

            <IconButton>
              <ShoppingCartIcon />
            </IconButton>

            <IconButton>
              <CompareArrowsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
