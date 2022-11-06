import {
  Box,
  Grid,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../public/assets/empty.png';
import CartItems from '../components/cart-items/CartItems';
import CustomButton from '../components/ui/Button/CustomButton';
import Notify from '../components/ui/notify/Notify';
import { removeFromCart } from '../redux/features/cart/cartSlice';
import styles from '../styles/Cart.module.scss';

const Cart = () => {
  const { cart, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Item remove from the cart
  const handleRemoveFromCart = (payload) => {
    dispatch(removeFromCart(payload));
    handleOpenSnackbar();
  };

  const shipping = 30;

  let totalPrice = 0;
  totalPrice = cart.reduce(
    (accu, curr) => accu + curr.price * curr.quantity,
    0
  );

  return (
    <>
      <Head>
        <title>Cart || FoodExpress</title>
      </Head>

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

              {cart?.length == 0 && (
                <Box className={styles.empty__cart} component='div'>
                  <Image
                    src={EmptyCart}
                    width={250}
                    height={200}
                    alt='Empty Cart'
                  />
                  <Typography variant='body1'>Your cart is empty!</Typography>
                </Box>
              )}

              {cart?.length > 0 && (
                <CartItems
                  showQuantity
                  showTotal
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            {cart?.length > 0 && (
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
                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Total Items:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {cart?.length}
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
                      <Link href='/checkout' passHref>
                        <a className={styles.link}>
                          <CustomButton label='Checkout' fullWidth />
                        </a>
                      </Link>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Notify
        openSnackbar={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
        message={message}
        severity='error'
      />
    </>
  );
};

export default Cart;
