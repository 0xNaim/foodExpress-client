import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
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
