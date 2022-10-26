import { Typography } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/layout';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home || FoodExpress</title>
      </Head>

      <Layout>
        <Typography variant='h4'>Home Page</Typography>
      </Layout>
    </>
  );
};

export default Home;
