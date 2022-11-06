import { Box, Grid, Pagination, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/product/Product';
import ProductSkeleton from '../../components/ui/loading/ProductSkeleton';
import Notify from '../../components/ui/notify/Notify';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useGetProductsQuery } from '../../services/products/productsApi';
import styles from '../../styles/CategoryProduct.module.scss';

const Category = () => {
  const { message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { slug } = query;
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    isSuccess,
  } = useGetProductsQuery({ slug, page });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { pagination } = products?.meta || {};

  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Product add to cart
  const handleAddToCart = (payload) => {
    dispatch(addToCart(payload));
    handleOpenSnackbar();
  };

  return (
    <>
      <Head>
        <title>Product || FoodExpress</title>
      </Head>

      {isLoading && (
        <Box className={styles.skeleton__wrapper} component='div'>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </Box>
      )}

      {products?.data?.length === 0 && (
        <Box className={styles['product__not-found']} component='div'>
          <Typography variant='h6'>There are no products</Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {products?.data?.map((singleProduct) => (
          <Grid
            key={singleProduct?.attributes?.slug}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Product
              product={singleProduct?.attributes}
              handleAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

      {!isLoading && isSuccess && products?.data?.length > 0 && (
        <Box className={styles.pagination__wrapper} component='div'>
          <Pagination
            count={pagination?.pageCount}
            onChange={(e, value) => setPage(value)}
            shape='rounded'
            color='primary'
          />
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

export default Category;
