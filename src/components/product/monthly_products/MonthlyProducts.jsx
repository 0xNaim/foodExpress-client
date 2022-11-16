import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Product from '../Product';
import styles from '../FeatureProducts.module.scss'

// Import css files
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useGetFeatureProductsQuery } from '../../../services/products/productsApi';
import ProductSkeleton from '../../ui/loading/ProductSkeleton';
import Notify from '../../ui/notify/Notify';

const MonthlyProducts = () => {
  const { data, isLoading, isSuccess } = useGetFeatureProductsQuery('monthly');
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isLoading && (
        <Box className={styles.skeleton__wrapper}>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </Box>
      )}

      {!isLoading && isSuccess && (
        <Box className={styles.content__wrapper}>
          <Box className={styles.header}>
            <Typography className={styles.title}>Monthly Foods </Typography>
            <Box className={styles.btn__group}>
              <ArrowBackIosIcon
                className={styles.icon}
                onClick={handlePrevSlide}
                color='primary'
                title='Prev'
              />
              <ArrowForwardIosIcon
                className={styles.icon}
                onClick={handleNextSlide}
                color='primary'
                title='Next'
              />
            </Box>
          </Box>
          <Divider className={styles.divider} />

          <Slider ref={ref} {...settings}>
            {products &&
              products.map((product, index) => (
                <Product
                  key={index}
                  product={product.attributes}
                  handleAddToCart={handleAddToCart}
                />
              ))}
          </Slider>
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

export default MonthlyProducts;
