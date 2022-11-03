import {
  Box,
  Grid,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
// <<<<<<< HEAD
// import CartItems from '../components/cart-items/CartItems';
// =======
import Link from 'next/link';
import CartItem from '../components/cart-item/CartItem';
// >>>>>>> a9ed3e939e7c0ed235984935f744729434fbac4d
import Layout from '../components/layout';
import CustomButton from '../components/ui/Button/CustomButton';
import { cartData } from '../data/cartData';
import styles from '../styles/Cart.module.scss';

const cartDetailsData = [
  {
    title: 'Total Items',
    amount: 5,
  },
  {
    title: 'Total Price',
    amount: '5 tk',
  },
  {
    title: 'Shipping Price',
    amount: '50 tk',
  },
];

const Cart = () => {
  const shipping = 30;

  let totalPrice = 0;
  totalPrice = cartData.reduce(
    (accu, curr) => accu + curr.price.split(' ')[0] * curr.quantity,
    0
  );

  return (
    <>
      <Head>
        <title>Cart || FoodExpress</title>
      </Head>

      <Layout>
        <Box component='div' className={styles.cart_wrapper}>
          <Grid container>
            <Grid item xs={12} sm={12} md={8}>
              <Box component='div' className={styles.left_part}>
                <Typography
                  variant={'h5'}
                  fontWeight={'700'}
                  marginBottom={'1rem'}
                >
                  Shopping Cart
                </Typography>
{/* <<<<<<< HEAD */}
{/* <<<<<<< HEAD
                <CartItems showQuantity /> */}
{/* ======= */}
                {/* <CartItem showQuantity /> */}
{/* >>>>>>> a9ed3e939e7c0ed235984935f744729434fbac4d */}
{/* ======= */}
                <CartItem showQuantity showTotal />
{/* >>>>>>> 1b56157d9a75f2dc0547535476251fe0504ccd02 */}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Box component='div' className={styles.right_part}>
                <Typography
                  variant={'h5'}
                  fontWeight={'700'}
                  marginBottom={'1rem'}
                >
                  Cart Details
                </Typography>

                <Table>
                  <TableBody>
                    {/* {cartDetailsData?.map((d) => (
                      <TableRow key={d.title} className={styles.table_row}>
                        <Typography variant='body1' fontWeight={'500'}>
                          {d.title}:
                        </Typography>

                        <Typography variant='body1' fontWeight={'500'}>
                          {d.amount}
                        </Typography>
                      </TableRow>
                    ))} */}

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Total Items:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {cartData?.length}
                      </Typography>
                    </TableRow>

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Total Price:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {totalPrice} Tk
                      </Typography>
                    </TableRow>

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Shipping Cost:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {shipping} Tk
                      </Typography>
                    </TableRow>

                    <hr />

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Subtotal:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {totalPrice + shipping} Tk
                      </Typography>
                    </TableRow>

                    <TableRow className={''}>
{/* <<<<<<< HEAD
                      <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        disableRipple
                        sx={{ borderRadius: '10px' }}
                      >
                        Submit
                      </Button>
======= */}
                      <Link href='/checkout' passHref>
                        <a className={styles.link}>
                          <CustomButton label='Checkout' fullWidth />
                        </a>
                      </Link>
{/* >>>>>>> a9ed3e939e7c0ed235984935f744729434fbac4d */}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Cart;
