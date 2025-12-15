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
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function Navbar() {
  const pages = ["Home", "Shop", "Blog", "Contact Us"];
  const [category, setCategory] = React.useState("");

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#1f2d5e",
        boxShadow: "none",
        borderBottom: "1px solid #eee",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 4 }}>

          {/* LOGO */}
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#1f2d5e",
              textDecoration: "none",
            }}
          >
            Kashop
          </Typography>

          {/* SEARCH + CATEGORY */}
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

          {/* SPACER */}
          <Box sx={{ flexGrow: 1 }} />

          {/* NAVIGATION LINKS */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  textTransform: "none",
                  color: page === "Contact Us" ? "#ff8a00" : "#1f2d5e",
                  fontSize: "0.95rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ICONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton component={Link} to="/login">
              <PersonIcon sx={{ color: "#1f2d5e" }} />
            </IconButton>

            <IconButton>

              <FavoriteIcon sx={{ color: "#1f2d5e" }} />

            </IconButton>

            <IconButton>

              <ShoppingCartIcon sx={{ color: "#1f2d5e" }} />

            </IconButton>

            <IconButton>
              <CompareArrowsIcon sx={{ color: "#1f2d5e" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
