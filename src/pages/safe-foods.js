import { Box, Divider, Grid, Pagination, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterSection from '../components/filter/FilterSection';
import Product from '../components/product/Product';
import ProductSkeleton from '../components/ui/loading/ProductSkeleton';
import Notify from '../components/ui/notify/Notify';
import { addToCart } from '../redux/features/cart/cartSlice';
import { useGetFeatureProductsQuery } from '../services/products/productsApi';
import styles from '../styles/FeaturesProducts.module.scss';

const SafeFoods = () => {
  const { message } = useSelector((state) => state.cart);
  const { searchTerm } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [variant] = useState('safeFood');

  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // filter prices
  const allFilterPrices = [5000, 200, 500, 1000];
  const filterPrice = allFilterPrices[filterIndex];

  // sort values
  const sortValues = ['asc', 'asc', 'desc'];
  const sortOrder = sortValues[sortIndex];

  const filterOptions = [
    'Filter by price',
    'Price < 200',
    'Price < 500',
    'Price < 1000',
  ];

  const sortOptions = ['Short', 'Price (Low > High)', 'Price (High > Low)'];

  useEffect(() => {
    setFilterIndex(0);
    setSortIndex(0);
  }, []);

  // Product add to cart
  const handleAddToCart = (payload) => {
    dispatch(addToCart(payload));
    handleOpenSnackbar();
  };

  const {
    data: dailyFoods,
    isLoading,
    isSuccess,
  } = useGetFeatureProductsQuery({
    variant,
    page,
    filterPrice,
    sortOrder,
    searchTerm,
  });

  const products = dailyFoods?.data?.map((product) => product.attributes);
  const { pagination } = dailyFoods?.meta || {};

  return (
    <>
      <Head>
        <title>Daily Foods || Food Express</title>
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

      <Box className={styles.filter__wrapper}>
        <FilterSection options={filterOptions} setIndex={setFilterIndex} />
        <FilterSection options={sortOptions} setIndex={setSortIndex} />
      </Box>
      <Divider className={styles.divider} />

      {products?.length === 0 && (
        <Box className={styles['product__not-found']} component='div'>
          <Typography variant='h6'>There are no products</Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid key={product?.slug} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {!isLoading && isSuccess && products?.length > 0 && (
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

export default SafeFoods;
