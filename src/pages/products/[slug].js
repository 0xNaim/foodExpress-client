import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetProductQuery } from '../../services/products/productApi';
import styles from '../../styles/ProductDetails.module.scss';

const ProductDetails = () => {
  const { query } = useRouter();
  const { slug } = query;

  const { data, isLoading, isSuccess, isError, error } =
    useGetProductQuery(slug);

  const product = data?.data[0]?.attributes;
  const { image } = product || {};

  return (
    <>
      <Head>
        <title>Product Details || FoodExpress</title>
      </Head>

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
                    <Button variant='contained' disableRipple>
                      <Remove />
                    </Button>
                    <Typography className={styles.quantity} variant='h4'>
                      5
                    </Typography>
                    <Button variant='contained' disableRipple>
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
    </>
  );
};

export default ProductDetails;
