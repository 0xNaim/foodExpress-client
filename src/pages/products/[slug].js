import { Add, Remove } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notify from '../../components/ui/notify/Notify';
import {
  addToCart,
  decreaseProductQuantity,
} from '../../redux/features/cart/cartSlice';
import { useGetProductQuery } from '../../redux/features/products/productsApi';
import styles from '../../styles/ProductDetails.module.scss';

const ProductDetails = () => {
  const { query, back } = useRouter();
  const { slug } = query;

  const { cart, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductQuery(slug);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('');

  const product = data?.data[0]?.attributes;
  const { image } = product || {};

  // Notify handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Find product if already exist in cart
  const cartProduct = cart?.find((item) => item.slug === slug);

  // Product add to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        slug: product?.slug,
        title: product?.title,
        image: product?.image?.data?.attributes?.url,
        price: product?.sellPrice,
        quantity: 1,
      })
    );
    setSeverity('success');
    handleOpenSnackbar();
  };

  // Decrease cart item quantity
  const handleDecreaseItemQuantity = () => {
    dispatch(decreaseProductQuantity({ slug: product?.slug }));
    setSeverity('error');
    handleOpenSnackbar();
  };

  // Go back
  const goBack = () => back();

  return (
    <>
      <Head>
        <title>Product Details || FoodExpress</title>
      </Head>

      <Button
        className={styles.button}
        onClick={goBack}
        variant='contained'
        size='small'
        disableRipple
      >
        <ArrowRightAltIcon className={styles.icon} /> Go Back
      </Button>

      <Grid container spacing={2} className={styles.product__details__wrapper}>
        <Grid item xs={12} md={6}>
          <Box className={styles.image__wrapper} component='div'>
            {isLoading && (
              <Skeleton
                variant='rectangular'
                animation='wave'
                width={300}
                height={300}
              />
            )}
            {!isError && isSuccess && (
              <Image
                src={image?.data?.attributes?.url}
                width={300}
                height={300}
                alt={product?.title}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.details__wrapper} component={'div'}>
            <Typography className={styles.product__title} variant='h5'>
              {isLoading && <Skeleton animation='wave' />}
              {!isError && isSuccess && product?.title}
            </Typography>
            <Typography className={styles.product__weight} variant='body1'>
              {isLoading && <Skeleton animation='wave' width='20%' />}
              {!isError && isSuccess && product?.weight}
            </Typography>

            <Box className={styles.price__wrapper} component={'div'}>
              <Typography
                className={styles.sell__price}
                variant='h4'
                fontWeight={500}
              >
                {isLoading && <Skeleton animation='wave' />}
                {!isError && isSuccess && `${product?.sellPrice} tk`}
              </Typography>

              {product?.regularPrice && (
                <Typography className={styles.regularPrice} variant='body1'>
                  {`${product.regularPrice} tk`}
                </Typography>
              )}
            </Box>

            {isLoading ? (
              <Skeleton
                animation='wave'
                variant='rectangular'
                width='40%'
                height='30px'
              />
            ) : (
              <>
                {isSuccess && (
                  <Box className={styles.quantity__wrapper}>
                    <Button
                      onClick={handleDecreaseItemQuantity}
                      variant='contained'
                      disableRipple
                      disabled={cartProduct ? false : true}
                    >
                      <Remove />
                    </Button>
                    <Typography className={styles.quantity} variant='h4'>
                      {cartProduct ? cartProduct?.quantity : 1}
                    </Typography>
                    <Button
                      onClick={handleAddToCart}
                      variant='contained'
                      disableRipple
                    >
                      <Add />
                    </Button>
                  </Box>
                )}
              </>
            )}

            {product?.description && (
              <Box className={styles.descriptions__wrapper} component='div'>
                {product?.description}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={handleCloseSnackbar}
          message={message}
          severity={severity}
        />
      }
    </>
  );
};

export default ProductDetails;
