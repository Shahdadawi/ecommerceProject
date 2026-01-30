import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import Product from "../product/Product";
import { useTranslation } from "react-i18next";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

export default function ProductsSection({ categoryId }) {
    const { t } = useTranslation();

    const { data, isLoading } = useProducts({
        categoryId: categoryId || null,
    });

    const products = data?.data ?? [];

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 6 }}>

            {/* 🔹 Section Title (دايمًا ظاهر) */}
            <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    {t("Our Products")}
                </Typography>

                <Typography color="text.secondary">
                    {t("Explore products available in this section")}
                </Typography>
            </Box>

            {/* 🔹 Empty State */}
            {products.length === 0 ? (
                <Box
                    sx={{
                        py: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        color: "text.secondary",
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        sx={{ fontSize: 64, mb: 2, color: "grey.400" }}
                    />

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        {t("No products here yet")}
                    </Typography>

                    <Typography sx={{ maxWidth: 420 }}>
                        {t(
                            "This category does not have any products at the moment. Try choosing a different category or check back later."
                        )}
                    </Typography>
                </Box>
            ) : (
                <Swiper
                    modules={[Pagination, Navigation]}
                    slidesPerView={1}
                    spaceBetween={24}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Box sx={{ maxWidth: 360, mx: "auto" }}>
                                <Product product={product} />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>


            )}
        </Box>
    );
}
