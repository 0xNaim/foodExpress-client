import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Product from '../../components/product/Product';
import ProductSkeleton from '../../components/ui/loading/ProductSkeleton';
import { useGetProductsQuery } from '../../services/products/productsApi';
import styles from '../../styles/CategoryProduct.module.scss';

const Category = () => {
  const { query } = useRouter();
  const { slug } = query;
  const { data: products, isLoading, isSuccess } = useGetProductsQuery(slug);

  // let products = [];

  // products =
  //   data && data?.data?.length > 0 && data?.data[0]?.attributes?.products?.data;

  const pageNumbers = [];

  // let products = [];
  // if (data) {
  //   products = data && data.data[0].attributes.products.data;
  // }

  // const [postsPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);

  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts =
  //   products && products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleChange = (e, p) => {
  //   setCurrentPage(p);
  // };

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

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {products?.data?.map((singleProduct) => (
          <Grid
            key={singleProduct?.attributes?.slug}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Product product={singleProduct?.attributes} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Category;
