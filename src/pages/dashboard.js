import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../components/layout';

const Dashboard = () => {
  const { accessToken } = useSelector((state) => state.auth || {});

  const router = useRouter();

  if (!accessToken) {
    router.push('/');
  }

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
