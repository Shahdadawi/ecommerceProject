import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: 8,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* ===== CONTACT ===== */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={800} mb={2} color="text.primary">
              Contact
            </Typography>

            <Stack spacing={1.2}>
              <Typography fontSize="0.9rem" color="text.secondary">
                Address: 502 New Design Str, Melbourne, San Francisco, CA 94110,
                United States
              </Typography>

              <Typography fontSize="0.9rem" color="text.secondary">
                Phone: (+01) 123 456 789
              </Typography>

              <Typography fontSize="0.9rem" color="text.secondary">
                E-mail: contact@ecom-market.com
              </Typography>

              <Typography fontSize="0.9rem" color="text.secondary">
                Hours: 8:00 - 17:00, Mon - Sat
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} mt={2}>
              {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                )
              )}
            </Stack>
          </Grid>

          {/* ===== MAKE MONEY ===== */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={800} mb={2} color="text.primary">
              Make Money with Us
            </Typography>

            <Stack spacing={1}>
              {[
                "Mission & Vision",
                "Our Team",
                "Careers",
                "Press & Media",
                "Advertising",
                "Testimonials",
              ].map((item) => (
                <Link
                  key={item}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  › {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* ===== COMPANY ===== */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={800} mb={2} color="text.primary">
              Company
            </Typography>

            <Stack spacing={1}>
              {[
                "Our Blog",
                "Plans & Pricing",
                "Knowledge Base",
                "Cookie Policy",
                "Office Center",
                "News & Events",
              ].map((item) => (
                <Link
                  key={item}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  › {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* ===== ACCOUNT & APPS ===== */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={800} mb={2} color="text.primary">
              My Account
            </Typography>

            <Stack spacing={1} mb={3}>
              {[
                "FAQs",
                "Editor Help",
                "Community",
                "Live Chatting",
                "Contact Us",
                "Support Center",
              ].map((item) => (
                <Link
                  key={item}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  › {item}
                </Link>
              ))}
            </Stack>

            <Typography fontWeight={800} mb={1} color="text.primary">
              App & Payment
            </Typography>

            <Typography fontSize="0.85rem" color="text.secondary" mb={2}>
              Download our Apps and get extra 15% Discount on your first Order!
            </Typography>

            <Stack direction="row" spacing={1}>
              <Box component="img" src="/appstore.png" alt="App Store" sx={{ height: 36 }} />
              <Box component="img" src="/google-play.png" alt="Google Play" sx={{ height: 36 }} />
            </Stack>

            <Typography fontSize="0.85rem" mt={2} color="text.secondary">
              Secured Payment Gateways
            </Typography>

            <Stack direction="row" spacing={1} mt={1}>
              <Box component="img" src="/payment-method.png" sx={{ height: 24 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
