import { Typography, Box, Button, IconButton } from "@mui/material";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import {
  countDecrement,
  countIncrement,
} from "../redux/features/counter/counterSlice";
import { useUsersQuery } from "../services/users/usersApi";

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
        <Box
          component='div'
          sx={{ display: 'flex', alignItems: 'center', paddingY: 5 }}
        >
          <Button variant='outlined' onClick={handleDecrement}>
            Decrement
          </Button>
          <Typography sx={{ paddingX: 1 }}>{count}</Typography>
          <Button variant='contained' onClick={handleIncrement}>
            Increment
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
