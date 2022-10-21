import { Typography } from '@mui/material';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import {
  countDecrement,
  countIncrement,
} from '../redux/features/counter/counterSlice';
import { useUsersQuery } from '../services/users/usersApi';

const Home = () => {
  const { count } = useSelector((state) => state.counter);
  const { data: todos } = useUsersQuery();
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(countIncrement());
  };

  const handleDecrement = () => {
    dispatch(countDecrement());
  };

  return (
    <>
      <Head>
        <title>FoodExpress || Home</title>
      </Head>

      <Layout>
        <Typography variant='h4'>Home Page</Typography>
      </Layout>
    </>
  );
};

export default Home;
