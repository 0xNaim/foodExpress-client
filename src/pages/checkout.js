import { Typography } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/layout';

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Checkout || FoodExpress</title>
      </Head>

      <Layout>
        <Typography variant='h4'>Checkout Page</Typography>
      </Layout>
    </>
  );
};

export default Checkout;
