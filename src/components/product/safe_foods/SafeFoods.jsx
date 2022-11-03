import React, { useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Product from '../Product';
import { useGetFeatureProductsQuery } from '../../../services/categoriesApi';
import Slider from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SafeFoods = () => {
    const { data, isLoading, isSuccess } = useGetFeatureProductsQuery("daily");
    let products = data && data.data;
    const ref = useRef(null);


    const handleNextSlide = () => {
        ref.current.slickNext();
    };

    const handlePrevSlide = () => {
        ref.current.slickPrev();
    };

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    // products = data && data.data.length > 0 && data.data[0].attributes.products.data;

    const buttonSX = {
        color: "white",
        background: "black",
        "&:hover": {
            background: "black",
        },
    };
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                    <Typography sx={{ fontSize: "2rem" }}>Safe Foods </Typography>
                    <Box>
                        <Button onClick={handlePrevSlide}>
                            <ArrowBackIosIcon />
                        </Button>
                        <Button onClick={handleNextSlide}>
                            <ArrowForwardIosIcon />
                        </Button>
                    </Box>
                </Box>

                <Slider ref={ref} style={{}} {...settings}>
                    {products && products.map((product, index) => (
                        <Product product={product.attributes} />
                    ))}
                </Slider>

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                    <Button sx={buttonSX}>
                        View All
                    </Button>
                </Box>

            </Box>
        </>
    );
};

export default SafeFoods;
