import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Product from '../../components/product/Product';
import { useGetProductsQuery } from '../../services/products/productsApi';
import MuiPagination from './pagination/MuiPagination';

const Category = () => {
  const { query } = useRouter();
  const { slug } = query;
  const { data, isLoading, isSuccess } = useGetProductsQuery(slug);
  let products = [];

  products =
    data && data?.data?.length > 0 && data?.data[0]?.attributes?.products?.data;

  console.log('Products', data, slug);

  const pageNumbers = [];

  // let products = [];
  // if (data) {
  //   products = data && data.data[0].attributes.products.data;
  // }

  const [postsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    products && products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <Head>
        <title>Product || FoodExpress</title>
      </Head>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {currentPosts &&
          currentPosts.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Product product={item} />
            </Grid>
          ))}
      </Grid>
      <Box
        sx={{
          width: '100%',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MuiPagination
          products={products}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleChange={handleChange}
        />
      </Box>
    </>
  );
};

export default Category;
