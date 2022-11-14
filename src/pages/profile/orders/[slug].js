import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useGetOrderByOrderIdQuery } from '../../../services/order/orderApi';
import styles from '../../../styles/OrderDetails.module.scss';
import getTotalPrice from '../../../utils/getTotalPrice';

const OrderDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { shippingCost } = useSelector((state) => state.checkout);

  // Authentication check
  const isLoggedIn = useAuth();
  if (!isLoggedIn) router.push('/');

  const { data, isLoading, isError, isSuccess } =
    useGetOrderByOrderIdQuery(slug);

  const order = data && data?.data[0]?.attributes;

  const goBack = () => router.back();

  return (
    <>
      <Head>
        <title>Order Details || FoodExpress</title>
      </Head>

      {isLoading && <Typography variant='body2'>Loading...</Typography>}

      {isError && !isSuccess && (
        <Typography>Order details not found!</Typography>
      )}

      {!isError && isSuccess && (
        <Box className={styles['order-details__wrapper']}>
          <Typography className={styles.heading} variant='h4' gutterBottom>
            Order Details
          </Typography>
          <Divider className={styles.divider} />

          <Button
            className={styles.button}
            onClick={goBack}
            variant='contained'
            size='small'
            disableRipple
          >
            <ArrowRightAltIcon className={styles.icon} /> Go Back
          </Button>
          <Paper>
            <Table className={styles.table}>
              <TableHead className={styles.table__head}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.items?.map((item) => (
                  <>
                    <TableRow key={item.slug} className={styles.table__row}>
                      <TableCell component='td'>
                        <Image
                          src={item.image}
                          width={120}
                          height={60}
                          alt={item.title}
                        />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.price} Tk</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price * item.quantity} Tk</TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
              <TableHead className={styles.total__price}>
                <TableRow>
                  <TableCell>Total + Shipping Cost: </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {getTotalPrice(order?.items) + shippingCost} Tk
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;
