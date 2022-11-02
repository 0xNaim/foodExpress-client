import { Typography } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/layout';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard || FoodExpress</title>
      </Head>

      <Layout>
        <Typography>Dashboard</Typography>
      </Layout>
    </>
  );
};

export default Dashboard;
