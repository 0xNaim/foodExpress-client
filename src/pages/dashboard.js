import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

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

      <Typography>Dashboard</Typography>
    </>
  );
};

export default Dashboard;
