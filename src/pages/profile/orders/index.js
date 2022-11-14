import {
  Box,
  Button,
  Divider,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useGetOrdersQuery } from '../../../services/order/orderApi';
import styles from '../../../styles/Order.module.scss';

const Orders = () => {
  // Authentication check
  const isLoggedIn = useAuth();
  const router = useRouter();

  if (!isLoggedIn) router.push('/');

  const [page, setPage] = useState(1);

  const { user } = useSelector((state) => state.auth || {});
  const email = user && user?.email;
  const { data, isLoading, isError, isSuccess, error } = useGetOrdersQuery({
    email,
    page,
  });

  const orders = (data && data?.data?.map((order) => order?.attributes)) || [];
  const { pagination } = (data && data?.meta) || {};

  return (
    <>
      <Head>
        <title>Orders || FoodExpress</title>
      </Head>

      {isLoading && <Typography variant='body2'>Loading...</Typography>}

      {!isLoading && orders?.length === 0 && <Typography>There are no orders</Typography>}

      {isSuccess && orders?.length > 0 && (
        <Box className={styles.order__wrapper} component='section'>
          <Typography className={styles.heading} variant='h4' gutterBottom>
            My Orders
          </Typography>
          <Divider className={styles.divider} />

          <Paper className={styles.table__wrapper}>
            <Table className={styles.table}>
              <TableHead className={styles.table__head}>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.order_id} className={styles.table__row}>
                    <TableCell component='td'>{order.order_id}</TableCell>
                    <TableCell component='td'>{order.amount} Tk</TableCell>
                    <TableCell component='td'>
                      <Box
                        className={
                          order.status === 'pending'
                            ? `${styles['status--pending']}`
                            : `${styles['status--delivered']}`
                        }
                        component='span'
                      >
                        {order.status}
                      </Box>
                    </TableCell>
                    <TableCell component='td'>
                      <Link
                        href={`/profile/orders/${order.order_id}`}
                        legacyBehavior
                      >
                        <a className={styles.link}>
                          <Button
                            className={styles.view__btn}
                            variant='contained'
                            color='primary'
                            size='small'
                            disableRipple
                          >
                            View
                          </Button>
                        </a>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Box className={styles.pagination__wrapper}>
            <Pagination
              onChange={(e, value) => setPage(value)}
              count={pagination?.pageCount}
              color='primary'
              shape='rounded'
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Orders;
