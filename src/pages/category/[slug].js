import { Box, Grid, Pagination, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Product from '../../components/product/Product';
import ProductSkeleton from '../../components/ui/loading/ProductSkeleton';
import { useGetProductsQuery } from '../../services/products/productsApi';
import styles from '../../styles/CategoryProduct.module.scss';

const Category = () => {
  const [page, setPage] = useState(1);
  const { query } = useRouter();
  const { slug } = query;
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useGetProductsQuery({ slug, page });

  const { pagination } = products?.meta || {};

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
            md={3}
          >
            <Product product={singleProduct?.attributes} />
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
    </>
  );
};

export default Category;
