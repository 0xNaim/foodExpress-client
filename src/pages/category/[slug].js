import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const Category = () => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <>
      <Head>
        <title>Product || FoodExpress</title>
      </Head>

      <Layout>
        <Typography>{slug}</Typography>
      </Layout>
    </>
  );
};

export default Category;
