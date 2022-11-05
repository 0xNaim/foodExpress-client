import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography } from '@mui/material';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import Product from '../Product';

// Import css files
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetFeatureProductsQuery } from '../../../services/products/productsApi';
import ProductSkeleton from '../../ui/loading/ProductSkeleton';

const MonthlyProducts = () => {
  const { data, isLoading, isSuccess } = useGetFeatureProductsQuery('monthly');
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const buttonSX = {
    color: 'white',
    background: 'black',
    '&:hover': {
      background: 'black',
    },
  };
  return (
    <>
      {isLoading && (
        <Box
          component='div'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </Box>
      )}

      {!isLoading && isSuccess && (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
            }}
          >
            <Typography sx={{ fontSize: '2rem' }}>Monthly Food </Typography>
            <Box>
              <Button onClick={handlePrevSlide} disableRipple>
                <ArrowBackIosIcon />
              </Button>
              <Button onClick={handleNextSlide} disableRipple>
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Box>

          <Slider ref={ref} style={{}} {...settings}>
            {products &&
              products.map((product, index) => (
                <Product key={index} product={product.attributes} />
              ))}
          </Slider>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button sx={buttonSX}>View All</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MonthlyProducts;
