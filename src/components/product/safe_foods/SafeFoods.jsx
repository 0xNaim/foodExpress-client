import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Product from '../Product';

// Import css files
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useGetFeatureProductsQuery } from '../../../services/products/productsApi';
import ProductSkeleton from '../../ui/loading/ProductSkeleton';
import Notify from '../../ui/notify/Notify';

const SafeFoods = () => {
  const { data, isLoading, isSuccess } = useGetFeatureProductsQuery('safeFood');
  const { message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Product add to cart
  const handleAddToCart = (payload) => {
    dispatch(addToCart(payload));
    handleOpenSnackbar();
  };

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
            }}
          >
            <Typography sx={{ fontSize: '2rem' }}>Safe Foods </Typography>
            <Box>
              <Button onClick={handlePrevSlide} disableRipple>
                <ArrowBackIosIcon />
              </Button>
              <Button onClick={handleNextSlide} disableRipple>
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 1.5 }} />

          <Slider ref={ref} style={{}} {...settings}>
            {products &&
              products.map((product, index) => (
                <Product
                  key={index}
                  product={product.attributes}
                  handleAddToCart={handleAddToCart}
                />
              ))}
          </Slider>

          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button sx={buttonSX}>View All</Button>
          </Box> */}
        </Box>
      )}

      <Notify
        openSnackbar={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
        message={message}
        severity={'success'}
      />
    </>
  );
};

export default SafeFoods;
