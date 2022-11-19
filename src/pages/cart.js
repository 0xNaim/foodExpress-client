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
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import CartItems from '../components/cart-items/CartItems';
import Modal from '../components/modal/Modal';
import CustomButton from '../components/ui/button/CustomButton';
import Notify from '../components/ui/notify/Notify';
import useAuth from '../hooks/useAuth';
import {
  addToCart,
  decreaseProductQuantity,
  removeFromCart,
} from '../redux/features/cart/cartSlice';
import styles from '../styles/Cart.module.scss';
import getTotalPrice from '../utils/getTotalPrice';

const Cart = () => {
  const { cart, message } = useSelector((state) => state.cart);
  const { shippingCost } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  // Authentication checking
  const isLoggedIn = useAuth();

  const [authAlert, setAuthAlert] = useState(null);
  const [openAuthAlert, setOpenAuthAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [signUp, setSignUp] = useState(false);

  // Remove item from the cart
  const handleRemoveFromCart = (payload) => {
    dispatch(removeFromCart(payload));
    setSeverity('error');
    handleOpenSnackbar();
  };

  // Increase cart item quantity
  const handleIncreaseItemQuantity = (payload) => {
    dispatch(addToCart(payload));
    setSeverity('success');
    handleOpenSnackbar();
  };

  // Decrease cart item quantity
  const handleDecreaseItemQuantity = (payload) => {
    dispatch(decreaseProductQuantity(payload));
    setSeverity('error');
    handleOpenSnackbar();
  };

  // Notify handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Auth alert handler
  const handleOpenAuthAlert = () => setOpenAuthAlert(true);
  const handleCloseAuthAlert = () => setOpenAuthAlert(false);

  // modal handler
  const handleOpen = () => {
    setOpenModel(true);
    setAuthAlert('Please Login Before Checkout');
    handleOpenAuthAlert();
  };
  const handleClose = () => setOpenModel(false);

  // handle signup
  const handleSignUp = () => {
    setSignUp(!signUp);
  };

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
                  handleIncreaseItemQuantity={handleIncreaseItemQuantity}
                  handleDecreaseItemQuantity={handleDecreaseItemQuantity}
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
                        {getTotalPrice(cart)} Tk
                      </Typography>
                    </TableRow>

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Shipping Cost:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {shippingCost} Tk
                      </Typography>
                    </TableRow>

                    <hr />

                    <TableRow className={styles.table_row}>
                      <Typography variant='body1' fontWeight={'500'}>
                        Subtotal:
                      </Typography>

                      <Typography variant='body1' fontWeight={'500'}>
                        {getTotalPrice(cart) + shippingCost} Tk
                      </Typography>
                    </TableRow>

                    {isLoggedIn ? (
                      <TableRow className={''}>
                        <Link href='/checkout' passHref>
                          <a className={styles.link}>
                            <CustomButton label='Checkout' fullWidth />
                          </a>
                        </Link>
                      </TableRow>
                    ) : (
                      <CustomButton
                        label='Checkout'
                        handleClick={handleOpen}
                        fullWidth
                      />
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Modal openModel={openModel} handleClose={handleClose}>
        {signUp ? (
          <SignUp handleSignUp={handleSignUp} />
        ) : (
          <SignIn handleClose={handleClose} handleSignUp={handleSignUp} />
        )}
      </Modal>

      {authAlert && (
        <Notify
          openSnackbar={openAuthAlert}
          closeSnackbar={handleCloseAuthAlert}
          message={authAlert}
          severity='error'
        />
      )}

      <Notify
        openSnackbar={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
        message={message}
        severity={severity}
      />
    </>
  );
};

export default Cart;
