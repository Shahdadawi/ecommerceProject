import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Divider,
    CardMedia,
} from "@mui/material";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";

function Products() {
    const { data: products = [], isLoading: loadingProducts } = useProducts();
    const { data: categories, isLoading: loadingCategories } = useCategories();

    const navigate = useNavigate();


    if (loadingProducts || loadingCategories)
        return <CircularProgress sx={{ m: 4 }} />;

    return (
        <Box sx={{ display: "flex", px: 4, py: 4, gap: 4 }}>
            <Box
                sx={{
                    width: 260,
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid #e5e7eb",
                    height: "fit-content",
                }}
            >
                <Typography fontWeight={600} mb={2}>
                    Product Categories
                </Typography>

                {categories.map((cat) => (
                    <Typography
                        key={cat.id}
                        sx={{
                            fontSize: "0.9rem",
                            color: "#475569",
                            cursor: "pointer",
                            mb: 1,
                            "&:hover": { color: "#445b8f" },
                        }}
                    >
                        {cat.name}
                    </Typography>
                ))}

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight={600} mb={1}>
                    Price
                </Typography>

                <Typography fontSize="0.85rem" color="text.secondary">
                    (Filtering later)
                </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card
                                onClick={() => navigate(`/products/${product.id}`)}
                                sx={{
                                    borderRadius: 2,
                                    border: "1px solid #e5e7eb",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                                        transform: "translateY(-4px)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ height: 160, objectFit: "contain", p: 2 }}
                                />

                                <CardContent>
                                    <Typography fontWeight={600} color="#1f3a8a">
                                        {product.name}
                                    </Typography>

                                    <Typography fontWeight={700} color="#ff8a00" mb={2}>
                                        ${product.price}
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: "#445b8f",
                                            color: "#445b8f",
                                            fontWeight: 600,
                                            "&:hover": {
                                                backgroundColor: "#445b8f",
                                                color: "#fff",
                                            },
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Products;
